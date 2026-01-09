import { useLocalStorage } from '@vueuse/core'

import type { Person } from '~/types/presence'

// État global partagé avec localStorage direct
const people = useLocalStorage<Person[]>('presence-people', [], {
  serializer: {
    read: (v: string) => {
      try {
        return JSON.parse(v).map(
          (p: {
            registeredAt: string
            firstName: string
            id: string
            lastName: string
            grade?: string
            section: string
            hasServiceBooklet?: boolean
          }) => ({
            ...p,
            grade: p.grade ?? '',
            hasServiceBooklet: p.hasServiceBooklet ?? false,
            registeredAt: new Date(p.registeredAt)
          })
        )
      } catch {
        return []
      }
    },
    write: (v: Person[]) => JSON.stringify(v)
  }
})

export const usePresenceController = () => {
  // Dériver les sections automatiquement depuis les personnes présentes
  const sections = computed(() => {
    const sectionsSet = new Set<string>()
    people.value.forEach((person) => {
      if (person.section?.trim()) {
        sectionsSet.add(person.section.trim())
      }
    })
    return Array.from(sectionsSet).sort()
  })

  const sectionNames = computed(() => sections.value)

  const addPerson = (
    firstName: string,
    lastName: string,
    grade: string,
    section: string,
    hasServiceBooklet = false
  ) => {
    if (firstName.trim() && lastName.trim() && grade.trim() && section) {
      const person: Person = {
        firstName: firstName.trim(),
        grade: grade.trim(),
        hasServiceBooklet,
        id: Date.now().toString(),
        lastName: lastName.trim(),
        registeredAt: new Date(),
        section
      }
      people.value.push(person)
      return person
    }
    return null
  }

  const removePerson = (id: string) => {
    // Réassignation complète pour forcer la synchronisation avec localStorage
    people.value = people.value.filter((p) => p.id !== id)
  }

  const updatePerson = (
    id: string,
    firstName: string,
    lastName: string,
    grade: string,
    hasServiceBooklet: boolean,
    section: string
  ) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index === -1) return false

    if (!firstName.trim() || !lastName.trim() || !grade.trim() || !section.trim()) {
      return false
    }

    // Réassignation complète pour forcer la synchronisation avec localStorage
    people.value = people.value.map((p, i) =>
      i === index
        ? {
            ...p,
            firstName: firstName.trim(),
            grade: grade.trim(),
            hasServiceBooklet,
            lastName: lastName.trim(),
            section: section.trim()
          }
        : p
    )
    return true
  }

  const clearPeople = () => {
    people.value = []
  }

  const getPeopleBySection = (sectionName: string) => {
    return people.value.filter((p) => p.section === sectionName)
  }

  const getPresenceStats = () => {
    const stats: Record<string, number> = {}
    sections.value.forEach((section) => {
      stats[section] = getPeopleBySection(section).length
    })
    return stats
  }

  return {
    addPerson,
    clearPeople,
    getPeopleBySection,
    getPresenceStats,
    people: readonly(people),
    removePerson,
    sectionNames,
    sections,
    updatePerson
  }
}

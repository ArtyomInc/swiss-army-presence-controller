import { useLocalStorage } from '@vueuse/core'

import type { Person, Section } from '~/types/presence'

// État global partagé avec localStorage direct
const sections = useLocalStorage<Section[]>('presence-sections', [], {
  serializer: {
    read: (v: string) => {
      try {
        return JSON.parse(v).map((s: { createdAt: string; name: string }) => ({
          ...s,
          createdAt: new Date(s.createdAt)
        }))
      } catch {
        return []
      }
    },
    write: (v: Section[]) => JSON.stringify(v)
  }
})

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
  // Wrapper réactif pour les noms de sections
  // Utilise watch pour synchroniser les mutations directes du tableau
  const sectionNames = ref<string[]>(sections.value.map((s) => s.name))

  // Synchroniser sectionNames -> sections
  watch(
    sectionNames,
    (newNames) => {
      const validNames = newNames.filter((name) => name.trim())
      sections.value = validNames.map((name) => ({
        createdAt: sections.value.find((s) => s.name === name.trim())?.createdAt || new Date(),
        name: name.trim()
      }))
    },
    { deep: true }
  )

  // Synchroniser sections -> sectionNames
  watch(
    sections,
    (newSections) => {
      const newNames = newSections.map((s) => s.name)
      if (JSON.stringify(sectionNames.value) !== JSON.stringify(newNames)) {
        sectionNames.value = newNames
      }
    },
    { deep: true }
  )

  const addSection = (name: string) => {
    if (name.trim() && !sections.value.find((s) => s.name === name.trim())) {
      // Réassignation complète pour forcer la synchronisation avec localStorage
      sections.value = [
        ...sections.value,
        {
          createdAt: new Date(),
          name: name.trim()
        }
      ]
    }
  }

  const removeSection = (name: string) => {
    // Réassignation complète pour forcer la synchronisation avec localStorage
    sections.value = sections.value.filter((s) => s.name !== name)
  }

  const setSections = (newSections: string[]) => {
    const validSections = newSections.filter((name) => name.trim())
    sections.value = validSections.map((name) => ({
      createdAt: new Date(),
      name: name.trim()
    }))
  }

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

  const updatePerson = (id: string, firstName: string, lastName: string, grade: string, hasServiceBooklet: boolean) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index === -1) return false

    if (!firstName.trim() || !lastName.trim() || !grade.trim()) {
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
            lastName: lastName.trim()
          }
        : p
    )
    return true
  }

  const clearSections = () => {
    sections.value = []
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
      stats[section.name] = getPeopleBySection(section.name).length
    })
    return stats
  }

  return {
    addPerson,
    addSection,
    clearPeople,
    clearSections,
    getPeopleBySection,
    getPresenceStats,
    people: readonly(people),
    removePerson,
    removeSection,
    sectionNames,
    sections: readonly(sections),
    setSections,
    updatePerson
  }
}

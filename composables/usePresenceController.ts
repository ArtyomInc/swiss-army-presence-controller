import type { Person, Section } from '~/types/presence'

export const usePresenceController = () => {
  const sections = ref<Section[]>([])
  const sectionNames = computed(() => sections.value.map((s) => s.name))

  const people = ref<Person[]>([])

  const initializeData = () => {
    if (import.meta.client) {
      const storedSections = localStorage.getItem('presence-sections')
      const storedPeople = localStorage.getItem('presence-people')

      if (storedSections) {
        sections.value = JSON.parse(storedSections).map((s: { createdAt: string; name: string }) => ({
          ...s,
          createdAt: new Date(s.createdAt)
        }))
      }

      if (storedPeople) {
        people.value = JSON.parse(storedPeople).map(
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
      }
    }
  }

  const saveSections = () => {
    if (import.meta.client) {
      localStorage.setItem('presence-sections', JSON.stringify(sections.value))
    }
  }

  const savePeople = () => {
    if (import.meta.client) {
      localStorage.setItem('presence-people', JSON.stringify(people.value))
    }
  }

  const addSection = (name: string) => {
    if (name.trim() && !sections.value.find((s) => s.name === name.trim())) {
      sections.value.push({
        createdAt: new Date(),
        name: name.trim()
      })
      saveSections()
    }
  }

  const removeSection = (name: string) => {
    const index = sections.value.findIndex((s) => s.name === name)
    if (index > -1) {
      sections.value.splice(index, 1)
      saveSections()
    }
  }

  const setSections = (newSections: string[]) => {
    const validSections = newSections.filter((name) => name.trim())
    sections.value = validSections.map((name) => ({
      createdAt: new Date(),
      name: name.trim()
    }))
    saveSections()
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
      savePeople()
      return person
    }
    return null
  }

  const removePerson = (id: string) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index > -1) {
      people.value.splice(index, 1)
      savePeople()
    }
  }

  const clearSections = () => {
    sections.value = []
    if (import.meta.client) {
      localStorage.removeItem('presence-sections')
    }
  }

  const clearPeople = () => {
    people.value = []
    if (import.meta.client) {
      localStorage.removeItem('presence-people')
    }
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

  onMounted(() => {
    initializeData()
  })

  return {
    addPerson,
    addSection,
    clearPeople,
    clearSections,
    getPeopleBySection,

    getPresenceStats,
    initializeData,
    people: readonly(people),

    removePerson,
    removeSection,

    sectionNames,
    sections: readonly(sections),
    setSections
  }
}

interface Person {
  id: string
  firstName: string
  lastName: string
  section: string
  registeredAt: Date
  hasServiceBooklet: boolean
}

interface Section {
  name: string
  createdAt: Date
}

export const usePresenceController = () => {
  // Gestion des sections
  const sections = ref<Section[]>([])
  const sectionNames = computed(() => sections.value.map(s => s.name))

  // Gestion des personnes
  const people = ref<Person[]>([])

  // Initialiser depuis localStorage
  const initializeData = () => {
    if (import.meta.client) {
      const storedSections = localStorage.getItem('presence-sections')
      const storedPeople = localStorage.getItem('presence-people')
      
      if (storedSections) {
        sections.value = JSON.parse(storedSections).map((s: { createdAt: string, name: string }) => ({
          ...s,
          createdAt: new Date(s.createdAt)
        }))
      }
      // Pas de sections par défaut - commence vide

      if (storedPeople) {
        people.value = JSON.parse(storedPeople).map((p: { registeredAt: string, firstName: string, id: string, lastName: string, section: string, hasServiceBooklet?: boolean }) => ({
          ...p,
          hasServiceBooklet: p.hasServiceBooklet ?? false, // Par défaut false pour la rétrocompatibilité
          registeredAt: new Date(p.registeredAt)
        }))
      }
    }
  }

  // Sauvegarder dans localStorage
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

  // Actions pour les sections
  const addSection = (name: string) => {
    if (name.trim() && !sections.value.find(s => s.name === name.trim())) {
      sections.value.push({
        createdAt: new Date(),
        name: name.trim()
      })
      saveSections()
    }
  }

  const removeSection = (name: string) => {
    const index = sections.value.findIndex(s => s.name === name)
    if (index > -1) {
      sections.value.splice(index, 1)
      saveSections()
    }
  }

  const setSections = (newSections: string[]) => {
    // Filtrer les sections vides
    const validSections = newSections.filter(name => name.trim())
    sections.value = validSections.map(name => ({
      createdAt: new Date(),
      name: name.trim()
    }))
    saveSections()
  }

  // Actions pour les personnes
  const addPerson = (firstName: string, lastName: string, section: string, hasServiceBooklet = false) => {
    if (firstName.trim() && lastName.trim() && section) {
      const person: Person = {
        firstName: firstName.trim(),
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
    const index = people.value.findIndex(p => p.id === id)
    if (index > -1) {
      people.value.splice(index, 1)
      savePeople()
    }
  }

  // Utilitaires
  const getPeopleBySection = (sectionName: string) => {
    return people.value.filter(p => p.section === sectionName)
  }

  const getPresenceStats = () => {
    const stats: Record<string, number> = {}
    sections.value.forEach(section => {
      stats[section.name] = getPeopleBySection(section.name).length
    })
    return stats
  }

  // Initialiser au chargement
  onMounted(() => {
    initializeData()
  })

  return {
    // Actions personnes
    addPerson,
    // Actions sections
    addSection,
    // Utilitaires
    getPeopleBySection,
    
    getPresenceStats,
    initializeData,
    people: readonly(people),
    
    removePerson,
    removeSection,
    
    sectionNames,
    // État
    sections: readonly(sections),
    setSections
  }
}

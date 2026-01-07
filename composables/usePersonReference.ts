import type { PersonReference } from '~/types/presence'

export const usePersonReference = () => {
  const people = ref<PersonReference[]>([])

  const initializeData = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('person-references')
      if (stored) {
        people.value = JSON.parse(stored).map((p: { createdAt: string }) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }))
      }
    }
  }

  const saveData = () => {
    if (import.meta.client) {
      localStorage.setItem('person-references', JSON.stringify(people.value))
    }
  }

  const addPerson = (firstName: string, lastName: string, grade: string, importedFrom?: string) => {
    if (!firstName.trim() || !lastName.trim() || !grade.trim()) {
      return null
    }

    // Vérifier les duplicatas (grade + prénom + nom)
    const isDuplicate = people.value.some(
      (p) =>
        p.firstName.toLowerCase() === firstName.trim().toLowerCase() &&
        p.lastName.toLowerCase() === lastName.trim().toLowerCase() &&
        p.grade.toLowerCase() === grade.trim().toLowerCase()
    )

    if (isDuplicate) {
      return null
    }

    const person: PersonReference = {
      createdAt: new Date(),
      firstName: firstName.trim(),
      grade: grade.trim(),
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      importedFrom,
      lastName: lastName.trim()
    }

    people.value.push(person)
    saveData()
    return person
  }

  const updatePerson = (id: string, firstName: string, lastName: string, grade: string) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index === -1) return false

    // Vérifier les duplicatas (sauf pour la personne en cours de modification)
    const isDuplicate = people.value.some(
      (p, idx) =>
        idx !== index &&
        p.firstName.toLowerCase() === firstName.trim().toLowerCase() &&
        p.lastName.toLowerCase() === lastName.trim().toLowerCase() &&
        p.grade.toLowerCase() === grade.trim().toLowerCase()
    )

    if (isDuplicate) {
      return false
    }

    people.value[index] = {
      ...people.value[index],
      firstName: firstName.trim(),
      grade: grade.trim(),
      lastName: lastName.trim()
    }

    saveData()
    return true
  }

  const removePerson = (id: string) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index > -1) {
      people.value.splice(index, 1)
      saveData()
      return true
    }
    return false
  }

  const clearAll = () => {
    people.value = []
    if (import.meta.client) {
      localStorage.removeItem('person-references')
    }
  }

  const importFromFile = async (file: File): Promise<{ success: number; duplicates: number; errors: string[] }> => {
    const result = { duplicates: 0, errors: [] as string[], success: 0 }

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()

      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Import XLSX
        const XLSX = await import('xlsx')
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json<{ Grade?: string; 'Nom, prénom'?: string }>(firstSheet, { header: 1 })

        // Ignorer la première ligne (en-tête)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i] as unknown[]
          if (!row || row.length < 2) continue

          const grade = String(row[0] || '').trim()
          const fullName = String(row[1] || '').trim()

          if (!grade || !fullName) {
            result.errors.push(`Ligne ${i + 1}: Format invalide`)
            continue
          }

          const { firstName, lastName } = parseFullName(fullName)
          if (!firstName || !lastName) {
            result.errors.push(`Ligne ${i + 1}: Impossible de séparer nom et prénom`)
            continue
          }

          const added = addPerson(firstName, lastName, grade, file.name)
          if (added) {
            result.success++
          } else {
            result.duplicates++
          }
        }
      } else {
        result.errors.push('Format de fichier non supporté. Utilisez .xlsx ou .xls')
      }
    } catch (error) {
      result.errors.push(
        `Erreur lors de la lecture du fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      )
    }

    return result
  }

  // Fonction pour séparer "Nom, Prénom" en firstName et lastName
  const parseFullName = (fullName: string): { firstName: string; lastName: string } => {
    // Essayer plusieurs formats: "Nom, Prénom", "Prénom Nom", "NOM Prénom"
    const parts = fullName.split(/[,\s]+/).filter(Boolean)

    if (parts.length === 0) {
      return { firstName: '', lastName: '' }
    }

    if (parts.length === 1) {
      return { firstName: '', lastName: parts[0] }
    }

    // Si format "Nom, Prénom" avec virgule
    if (fullName.includes(',')) {
      const [lastName, ...firstNameParts] = fullName.split(',').map((s) => s.trim())
      return {
        firstName: firstNameParts.join(' '),
        lastName
      }
    }

    // Sinon, on suppose "Prénom Nom" (dernier mot = nom de famille)
    const lastName = parts[parts.length - 1]
    const firstName = parts.slice(0, -1).join(' ')

    return { firstName, lastName }
  }

  onMounted(() => {
    initializeData()
  })

  return {
    addPerson,
    clearAll,
    importFromFile,
    initializeData,
    people: readonly(people),
    removePerson,
    updatePerson
  }
}

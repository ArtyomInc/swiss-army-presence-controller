import { useLocalStorage } from '@vueuse/core'

import type { PersonReference } from '~/types/presence'

// État global partagé avec localStorage direct
const people = useLocalStorage<PersonReference[]>('person-references', [], {
  serializer: {
    read: (v: string) => {
      try {
        return JSON.parse(v).map((p: { createdAt: string }) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }))
      } catch {
        return []
      }
    },
    write: (v: PersonReference[]) => JSON.stringify(v)
  }
})

export const usePersonReference = () => {
  const addPerson = (firstName: string, lastName: string, grade: string, importedFrom?: string, section?: string) => {
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
      lastName: lastName.trim(),
      section: section?.trim()
    }

    people.value.push(person)
    return person
  }

  const updatePerson = (id: string, firstName: string, lastName: string, grade: string, section?: string) => {
    const index = people.value.findIndex((p) => p.id === id)
    if (index === -1) return false

    // Vérifier les duplicata (sauf pour la personne en cours de modification)
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

    // Réassignation complète pour forcer la synchronisation avec localStorage
    people.value = people.value.map((p, i) =>
      i === index
        ? {
            ...p,
            firstName: firstName.trim(),
            grade: grade.trim(),
            lastName: lastName.trim(),
            section: section?.trim()
          }
        : p
    )

    return true
  }

  const removePerson = (id: string) => {
    // Réassignation complète pour forcer la synchronisation avec localStorage
    const newPeople = people.value.filter((p) => p.id !== id)
    if (newPeople.length === people.value.length) return false
    people.value = newPeople
    return true
  }

  const clearAll = () => {
    people.value = []
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
        const rows = XLSX.utils.sheet_to_json<unknown[]>(firstSheet, { header: 1 })

        // Ignorer la première ligne (en-tête)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i] as unknown[]
          if (!row || row.length < 3) continue

          // Format: Colonne A (0) = Grade, Colonne B (1) = Nom/Prénom, Colonne C (2) = Section
          const grade = String(row[0] || '').trim()
          const fullName = String(row[1] || '').trim()
          const section = String(row[2] || '').trim()

          if (!grade || !fullName || !section) {
            result.errors.push(`Ligne ${i + 1}: Grade, nom ou section manquant`)
            continue
          }

          const { firstName, lastName } = parseFullName(fullName)
          if (!firstName || !lastName) {
            result.errors.push(`Ligne ${i + 1}: Impossible de séparer nom et prénom`)
            continue
          }

          const added = addPerson(firstName, lastName, grade, file.name, section)
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

  return {
    addPerson,
    clearAll,
    importFromFile,
    people: readonly(people),
    removePerson,
    updatePerson
  }
}

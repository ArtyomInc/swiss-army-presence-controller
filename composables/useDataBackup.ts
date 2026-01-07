// Fonction de hash simple pour checksum
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export function useDataBackup() {
  const { people, sections } = usePresenceController()

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      metadata: {
        checksum: '',
        totalPeople: people.value.length,
        totalSections: sections.value.length,
        userAgent: import.meta.client ? navigator.userAgent : 'unknown'
      },
      people: people.value,
      sections: sections.value,
      version: '1.0'
    }

    // Générer checksum
    const dataString = JSON.stringify({ people: data.people, sections: data.sections })
    data.metadata.checksum = simpleHash(dataString)

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    link.download = `presence-backup-${timestamp}.json`
    link.href = url
    link.click()

    URL.revokeObjectURL(url)
  }

  const importData = (file: File): Promise<{ error?: string; success: boolean }> => {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const data = JSON.parse(content)

          // Validation améliorée
          if (!data.people || !Array.isArray(data.people)) {
            throw new Error('Format de fichier invalide: propriété "people" manquante ou invalide')
          }
          if (!data.sections || !Array.isArray(data.sections)) {
            throw new Error('Format de fichier invalide: propriété "sections" manquante ou invalide')
          }

          // Valider checksum si présent
          if (data.metadata?.checksum) {
            const dataString = JSON.stringify({ people: data.people, sections: data.sections })
            const computedChecksum = simpleHash(dataString)
            if (computedChecksum !== data.metadata.checksum) {
              console.warn('Checksum mismatch - backup may be corrupted')
            }
          }

          // Valider la structure de chaque personne
          const invalidPeople = data.people.filter(
            (p: unknown) => {
              const person = p as Record<string, unknown>
              return !person.id || !person.firstName || !person.lastName || !person.section || !person.registeredAt
            }
          )
          if (invalidPeople.length > 0) {
            throw new Error(`${invalidPeople.length} entrée(s) de personnes invalide(s) trouvée(s)`)
          }

          // Valider la structure de chaque section
          const invalidSections = data.sections.filter((s: unknown) => {
            const section = s as Record<string, unknown>
            return !section.name || !section.createdAt
          })
          if (invalidSections.length > 0) {
            throw new Error(`${invalidSections.length} section(s) invalide(s) trouvée(s)`)
          }

          // Restaurer via localStorage directement
          const restoredPeople = data.people.map((p: { registeredAt: string; [key: string]: unknown }) => ({
            ...p,
            hasServiceBooklet: p.hasServiceBooklet ?? false,
            registeredAt: new Date(p.registeredAt)
          }))

          const restoredSections = data.sections.map((s: { createdAt: string; [key: string]: unknown }) => ({
            ...s,
            createdAt: new Date(s.createdAt)
          }))

          // Écrire directement dans localStorage
          if (import.meta.client) {
            localStorage.setItem('presence-people', JSON.stringify(restoredPeople))
            localStorage.setItem('presence-sections', JSON.stringify(restoredSections))

            // Recharger la page pour appliquer les changements
            window.location.reload()
          }

          resolve({ success: true })
        } catch (error) {
          console.error('Import error:', error)
          resolve({
            error: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'import',
            success: false
          })
        }
      }

      reader.onerror = () => {
        resolve({ error: 'Impossible de lire le fichier', success: false })
      }

      reader.readAsText(file)
    })
  }

  return {
    exportData,
    importData
  }
}

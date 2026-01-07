export function useDataBackup() {
  const { people, sections } = usePresenceController()

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      people: people.value,
      sections: sections.value,
      version: '1.0'
    }

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

          // Validation basique
          if (!data.people || !data.sections) {
            throw new Error('Format de fichier invalide')
          }

          // Restaurer via localStorage directement
          const restoredPeople = data.people.map((p: { registeredAt: string; [key: string]: unknown }) => ({
            ...p,
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
          resolve({
            error: error instanceof Error ? error.message : 'Erreur inconnue',
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

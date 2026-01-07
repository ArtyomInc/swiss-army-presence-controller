<template>
  <Card>
    <CardHeader>
      <CardTitle>Sauvegarde des données</CardTitle>
      <CardDescription>Exportez et importez vos données</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Export -->
      <div class="space-y-2">
        <Label>Exporter les données</Label>
        <Button class="w-full" variant="outline" @click="handleExport">
          <Icon name="lucide:download" class="h-4 mr-2 w-4" />
          Télécharger backup (.json)
        </Button>
        <p class="text-muted-foreground text-xs">Sauvegarde toutes les sections et personnes</p>
      </div>

      <!-- Import -->
      <div class="space-y-2">
        <Label>Importer des données</Label>
        <div class="flex gap-2">
          <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleFileSelect" />
          <Button class="w-full" variant="outline" @click="() => fileInput?.click()">
            <Icon name="lucide:upload" class="h-4 mr-2 w-4" />
            Restaurer backup
          </Button>
        </div>
        <p class="text-muted-foreground text-xs">⚠️ Remplacera toutes les données actuelles</p>
      </div>

      <!-- Statistiques -->
      <div class="border-t pt-2">
        <p class="text-muted-foreground text-xs">{{ people.length }} personne(s) · {{ sections.length }} section(s)</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const { people, sections } = usePresenceController()
const { exportData, importData } = useDataBackup()

const fileInput = ref<HTMLInputElement>()

const handleExport = () => {
  exportData()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const result = await importData(file)

  if (!result.success) {
    alert(`Erreur d'import: ${result.error || "Le fichier n'a pas pu être importé"}`)
  }

  // Reset input
  target.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Sections</CardTitle>
        <CardDescription>Ajoutez les sections/groupes avant d'enregistrer les présences</CardDescription>
      </CardHeader>
      <CardContent>
        <MultiField v-model="sectionsModel" block-empty placeholder="Kdo, Rep, Mun, etc." />
        <div class="mt-2 text-sm text-muted-foreground">
          Debug: {{ sectionsModel.length }} sections dans le modèle, {{ sectionNames.length }} sections dans le store
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <div class="text-sm text-muted-foreground">
          {{ sectionsModel.length }} section{{ sectionsModel.length > 1 ? 's' : '' }} configurée{{ sectionsModel.length > 1 ? 's' : '' }}
        </div>
        <Link href="/controller/register" :class="{ 'pointer-events-none opacity-50': sectionsModel.length === 0 }"> 
          Suivant <Icon name="lucide:arrow-right" size="20" /> 
        </Link>
      </CardFooter>
    </Card>

    <!-- Aperçu des présences si des personnes sont enregistrées -->
    <Card v-if="totalPeople > 0">
      <CardHeader>
        <CardTitle>Aperçu des Présences</CardTitle>
        <CardDescription>Nombre de personnes enregistrées par section</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-2">
          <div v-for="section in sectionsModel" :key="section" class="flex justify-between items-center p-2 rounded border">
            <span class="font-medium">{{ section }}</span>
            <span class="text-sm text-muted-foreground">
              {{ getPeopleBySection(section).length }} personne{{ getPeopleBySection(section).length > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/controller/presences" class="w-full">
          <Button class="w-full">
            Voir toutes les présences <Icon name="lucide:users" size="20" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'
import MultiField from '~/components/MultiField.vue'

const { getPeopleBySection, people, sectionNames, setSections } = usePresenceController()

// Model local pour MultiField
const sectionsModel = ref<string[]>([])

// Nombre total de personnes
const totalPeople = computed(() => people.value.length)

// Synchronisation unidirectionnelle : store -> modèle local
onMounted(() => {
  sectionsModel.value = [...sectionNames.value]
})

// Synchronisation modèle local -> store quand ça change
watch(sectionsModel, (newSections) => {
  setSections(newSections)
}, { deep: true })

// Écouter les changements du store pour mettre à jour le modèle local
watch(sectionNames, (newSections) => {
  // Ne mettre à jour que si c'est différent pour éviter les boucles
  if (JSON.stringify(sectionsModel.value) !== JSON.stringify(newSections)) {
    sectionsModel.value = [...newSections]
  }
}, { immediate: true })
</script>

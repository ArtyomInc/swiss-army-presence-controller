<template>
  <div class="flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Sections</CardTitle>
        <CardDescription>Ajoutez les sections/groupes avant d'enregistrer les présences</CardDescription>
      </CardHeader>
      <CardContent>
        <MultiField v-model="sectionsModel" block-empty placeholder="Kdo, Rep, Mun, etc." />
      </CardContent>
      <CardFooter class="flex justify-between">
        <div class="text-sm text-muted-foreground">
          Debug: {{ sectionsModel.length }} sections dans le modèle, {{ sectionNames.length }} sections dans le store
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
      <CardFooter class="flex gap-2">
        <Link href="/controller/presences" class="flex-1">
          <Button class="w-full">
            Voir toutes les présences <Icon name="lucide:users" size="20" />
          </Button>
        </Link>
        
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Gestion des enregistrements</CardTitle>
        <CardDescription>Supprimez toutes les données stockées localement</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-if="totalPeople > 0" class="flex items-center justify-between">
          <span>Supprimer toutes les personnes enregistrées.</span>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icon name="lucide:trash-2" size="16" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer toutes les personnes</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer tous les enregistrements de personnes ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="flex justify-end gap-2">
                <DialogClose as-child>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button variant="destructive" @click="handleClearPeople">Supprimer</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div v-if="sectionsModel.length > 0" class="flex items-center justify-between">
          <span>Supprimer toutes les sections configurées.</span>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icon name="lucide:trash-2" size="16" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer toutes les sections</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer toutes les sections ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="flex justify-end gap-2">
                <DialogClose as-child>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button variant="destructive" @click="handleClearSections">Supprimer</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Link } from '@/ui/link'
import MultiField from '~/components/MultiField.vue'

const { clearPeople, clearSections, getPeopleBySection, people, sectionNames, setSections } = usePresenceController()

// Model local pour MultiField
const sectionsModel = ref<string[]>([])

// Nombre total de personnes
const totalPeople = computed(() => people.value.length)

// Fonctions de confirmation
const handleClearSections = () => {
  clearSections()
}

const handleClearPeople = () => {
  clearPeople()
}

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

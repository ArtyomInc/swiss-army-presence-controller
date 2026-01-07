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
    </Card>

    <Card v-if="totalPeople > 0">
      <CardHeader>
        <CardTitle>Aperçu des Présences</CardTitle>
        <CardDescription>Nombre de personnes enregistrées par section</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="gap-2 grid">
          <div
            v-for="section in sectionsModel"
            :key="section"
            class="border flex items-center justify-between p-2 rounded"
          >
            <span class="font-medium">{{ section }}</span>
            <span class="text-muted-foreground text-sm">
              {{ getPeopleBySection(section).length }} personne{{ getPeopleBySection(section).length > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Link href="/controller/presences" class="flex-1">
          <Button class="w-full"> Voir toutes les présences <Icon name="lucide:users" size="20" /> </Button>
        </Link>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Gestion des données stockées</CardTitle>
        <CardDescription>Supprimez toutes les données stockées localement</CardDescription>
      </CardHeader>
      <CardContent v-if="totalPeople === 0 && sectionsModel.length === 0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="lucide:database" />
            </EmptyMedia>
            <EmptyDescription>Aucune donnée à gérer pour le moment</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
      <CardContent v-else class="space-y-4">
        <div v-if="totalPeople > 0" class="flex items-center justify-between">
          <span>Supprimer toutes les personnes enregistrées.</span>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                variant="outline"
                size="sm"
                class="hover:bg-destructive hover:text-destructive-foreground text-destructive"
              >
                <Icon name="lucide:trash-2" size="16" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer toutes les personnes</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer tous les enregistrements de personnes ? Cette action est
                  irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="flex gap-2 justify-end">
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
                class="hover:bg-destructive hover:text-destructive-foreground text-destructive"
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
              <DialogFooter class="flex gap-2 justify-end">
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from '@/ui/empty'
import { Link } from '@/ui/link'
import MultiField from '~/components/MultiField.vue'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'App - Presence Controller'
})

const { clearPeople, clearSections, getPeopleBySection, people, sectionNames, setSections } = usePresenceController()

const sectionsModel = ref<string[]>([])

const totalPeople = computed(() => people.value.length)

const handleClearSections = () => {
  clearSections()
}

const handleClearPeople = () => {
  clearPeople()
}

onMounted(() => {
  sectionsModel.value = [...sectionNames.value]
})

watch(
  sectionsModel,
  (newSections) => {
    setSections(newSections)
  },
  { deep: true }
)

watch(
  sectionNames,
  (newSections) => {
    if (JSON.stringify(sectionsModel.value) !== JSON.stringify(newSections)) {
      sectionsModel.value = [...newSections]
    }
  },
  { immediate: true }
)
</script>

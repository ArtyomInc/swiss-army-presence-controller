<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Vue d'ensemble des Présences</CardTitle>
            <CardDescription>
              {{ totalPeople }} personne{{ totalPeople > 1 ? 's' : '' }} enregistrée{{
                totalPeople > 1 ? 's' : ''
              }}
              dans {{ sections.length }} section{{ sections.length > 1 ? 's' : '' }}
            </CardDescription>
          </div>
          <div v-if="totalPeople > 0" class="flex gap-2">
            <Button variant="outline" @click="exportToExcel">
              <Icon name="lucide:download" size="20" class="mr-2" />
              Exporter XLSX
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent v-if="totalPeople === 0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="lucide:users" />
            </EmptyMedia>
            <EmptyTitle>Aucune présence enregistrée</EmptyTitle>
            <EmptyDescription>Commencez par ajouter des personnes à vos sections</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/ajouter-presence">
              <Icon name="lucide:user-plus" size="20" class="mr-2" />
              Ajouter des présences
            </Link>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>

    <div v-if="totalPeople > 0" class="gap-6 grid">
      <Card v-for="section in sections" :key="section.name">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="flex gap-2 items-center">
                <Icon name="lucide:users" size="20" />
                {{ section.name }}
              </CardTitle>
              <CardDescription>
                {{ getPeopleBySection(section.name).length }} personne{{
                  getPeopleBySection(section.name).length > 1 ? 's' : ''
                }}
                présente{{ getPeopleBySection(section.name).length > 1 ? 's' : '' }}
              </CardDescription>
            </div>
            <div class="text-right">
              <div class="font-bold text-2xl text-primary">
                {{ getPeopleBySection(section.name).length }}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent v-if="getSortedPeopleBySection(section.name).length > 0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('grade', section.name)">
                  <div class="flex gap-2 items-center">
                    Grade
                    <Icon
                      v-if="getSortConfig(section.name).field === 'grade'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('firstName', section.name)">
                  <div class="flex gap-2 items-center">
                    Prénom
                    <Icon
                      v-if="getSortConfig(section.name).field === 'firstName'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('lastName', section.name)">
                  <div class="flex gap-2 items-center">
                    Nom
                    <Icon
                      v-if="getSortConfig(section.name).field === 'lastName'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead
                  class="cursor-pointer hover:bg-muted/50"
                  @click="toggleSort('hasServiceBooklet', section.name)"
                >
                  <div class="flex gap-2 items-center">
                    Livret
                    <Icon
                      v-if="getSortConfig(section.name).field === 'hasServiceBooklet'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('registeredAt', section.name)">
                  <div class="flex gap-2 items-center">
                    Enregistré à
                    <Icon
                      v-if="getSortConfig(section.name).field === 'registeredAt'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="person in getSortedPeopleBySection(section.name)"
                :key="person.id"
                class="hover:bg-muted/50"
              >
                <TableCell class="font-medium">{{ person.grade }}</TableCell>
                <TableCell class="font-medium">{{ person.firstName }}</TableCell>
                <TableCell class="font-medium">{{ person.lastName }}</TableCell>
                <TableCell>
                  <span
                    v-if="person.hasServiceBooklet"
                    class="bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2 py-1 rounded-full text-blue-700 text-xs"
                  >
                    <Icon name="lucide:book-open" size="12" class="mr-1" />
                    Oui
                  </span>
                  <span v-else class="text-muted-foreground text-xs">Non</span>
                </TableCell>
                <TableCell class="text-muted-foreground text-sm">
                  {{ formatDateTime(person.registeredAt) }}
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex gap-1 justify-end">
                    <Button variant="ghost" size="sm" @click="editPerson(person)">
                      <Icon name="lucide:pencil" size="14" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="hover:bg-destructive/10 hover:text-destructive text-destructive"
                      @click="confirmRemovePerson(person)"
                    >
                      <Icon name="lucide:trash-2" size="14" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardContent v-else>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon name="lucide:user-x" />
              </EmptyMedia>
              <EmptyDescription>Aucune personne dans cette section</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    </div>

    <!-- Dialog d'édition -->
    <Dialog :open="!!personToEdit" @update:open="(open) => !open && cancelEdit()">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la présence</DialogTitle>
          <DialogDescription>
            Modifiez les informations de {{ personToEdit?.grade }} {{ personToEdit?.firstName }}
            {{ personToEdit?.lastName }}
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <div class="gap-1.5 grid items-center w-full">
            <Label for="edit-grade">Grade :</Label>
            <Input id="edit-grade" v-model="editFormGrade" placeholder="Sdt" />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="edit-firstname">Prénom :</Label>
            <Input id="edit-firstname" v-model="editFormFirstName" placeholder="Jean" />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="edit-lastname">Nom :</Label>
            <Input id="edit-lastname" v-model="editFormLastName" placeholder="Du Jardin" />
          </div>
          <div class="flex gap-2 items-center">
            <Checkbox id="edit-booklet" v-model="editFormHasServiceBooklet" />
            <Label for="edit-booklet" class="cursor-pointer">Livret de service</Label>
          </div>
        </div>
        <DialogFooter class="flex gap-2 justify-end">
          <Button variant="outline" @click="cancelEdit">Annuler</Button>
          <Button :disabled="!canSaveEdit" @click="saveEdit">Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Dialog de suppression -->
    <Dialog :open="!!personToRemove" @update:open="(open) => !open && cancelRemove()">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer {{ personToRemove?.grade }} {{ personToRemove?.firstName }}
            {{ personToRemove?.lastName }} de la section {{ personToRemove?.section }} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="flex gap-2 justify-end">
          <Button variant="outline" @click="cancelRemove">Annuler</Button>
          <Button variant="destructive" @click="confirmRemove">Supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { Person } from '~/types/presence'

import { Checkbox } from '@/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty'
import { Label } from '@/ui/label'
import { Link } from '@/ui/link'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'Présences - Presence Controller'
})

const { getPeopleBySection, people, removePerson, sections, updatePerson } = usePresenceController()

const totalPeople = computed(() => people.value.length)

const personToEdit = ref<Person | null>(null)
const editFormGrade = ref('')
const editFormFirstName = ref('')
const editFormLastName = ref('')
const editFormHasServiceBooklet = ref(false)

const canSaveEdit = computed(() => {
  return editFormGrade.value.trim() && editFormFirstName.value.trim() && editFormLastName.value.trim()
})

const sortConfigs = ref<Record<string, { field: string; order: 'asc' | 'desc' }>>({})

watch(
  sections,
  (newSections) => {
    newSections.forEach((section) => {
      if (!sortConfigs.value[section.name]) {
        sortConfigs.value[section.name] = { field: 'lastName', order: 'asc' }
      }
    })
  },
  { immediate: true }
)

const getSortConfig = (sectionName: string) => {
  return sortConfigs.value[sectionName] || { field: 'lastName', order: 'asc' }
}

const toggleSort = (field: string, sectionName: string) => {
  const currentConfig = getSortConfig(sectionName)
  if (currentConfig.field === field) {
    sortConfigs.value[sectionName] = {
      field,
      order: currentConfig.order === 'asc' ? 'desc' : 'asc'
    }
  } else {
    sortConfigs.value[sectionName] = { field, order: 'asc' }
  }
}

const getSortedPeopleBySection = (sectionName: string) => {
  const sectionPeople = getPeopleBySection(sectionName)
  const config = getSortConfig(sectionName)

  return [...sectionPeople].sort((a, b) => {
    let aValue: string | number | boolean | Date = a[config.field as keyof typeof a]
    let bValue: string | number | boolean | Date = b[config.field as keyof typeof b]

    if (config.field === 'registeredAt') {
      aValue = new Date(aValue as Date).getTime()
      bValue = new Date(bValue as Date).getTime()
    }

    if (config.field === 'hasServiceBooklet') {
      aValue = (aValue as boolean) ? 1 : 0
      bValue = (bValue as boolean) ? 1 : 0
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (config.order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })
}

const personToRemove = ref<Person | null>(null)

const editPerson = (person: Person) => {
  personToEdit.value = person
  editFormGrade.value = person.grade
  editFormFirstName.value = person.firstName
  editFormLastName.value = person.lastName
  // Force conversion en boolean pour éviter les problèmes avec undefined
  editFormHasServiceBooklet.value = Boolean(person.hasServiceBooklet)
}

const cancelEdit = () => {
  personToEdit.value = null
  editFormGrade.value = ''
  editFormFirstName.value = ''
  editFormLastName.value = ''
  editFormHasServiceBooklet.value = false
}

const saveEdit = () => {
  if (!canSaveEdit.value || !personToEdit.value) return

  const success = updatePerson(
    personToEdit.value.id,
    editFormFirstName.value,
    editFormLastName.value,
    editFormGrade.value,
    editFormHasServiceBooklet.value
  )

  if (success) {
    cancelEdit()
  }
}

const confirmRemovePerson = (person: Person) => {
  personToRemove.value = person
}

const cancelRemove = () => {
  personToRemove.value = null
}

const confirmRemove = () => {
  if (personToRemove.value) {
    removePerson(personToRemove.value.id)
    personToRemove.value = null
  }
}

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

const exportToExcel = async () => {
  try {
    const XLSX = await import('xlsx')

    // Préparer les données pour l'export
    const exportData: Array<{ Grade: string; Nom: string; Prénom: string; Section: string }> = []

    // Trier les personnes par section
    sections.value.forEach((section) => {
      const sectionPeople = getPeopleBySection(section.name)
      sectionPeople.forEach((person) => {
        exportData.push({
          Grade: person.grade,
          Nom: person.lastName,
          Prénom: person.firstName,
          Section: person.section
        })
      })
    })

    // Créer un nouveau workbook
    const wb = XLSX.utils.book_new()

    // Convertir les données en feuille
    const ws = XLSX.utils.json_to_sheet(exportData)

    // Définir la largeur des colonnes
    ws['!cols'] = [
      { wch: 10 }, // Grade
      { wch: 20 }, // Nom
      { wch: 20 }, // Prénom
      { wch: 15 } // Section
    ]

    // Ajouter un tableau avec filtres automatiques
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
    ws['!autofilter'] = { ref: XLSX.utils.encode_range(range) }

    // Ajouter la feuille au workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Présences')

    // Générer le nom de fichier avec la date
    const date = new Date()
    const dateStr = date.toISOString().split('T')[0]
    const fileName = `presences_${dateStr}.xlsx`

    // Télécharger le fichier
    XLSX.writeFile(wb, fileName)
  } catch (error) {
    console.error("Erreur lors de l'export:", error)
  }
}
</script>

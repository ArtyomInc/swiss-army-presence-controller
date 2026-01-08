<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Liste du Personnel</CardTitle>
            <CardDescription>
              {{ people.length }} personne{{ people.length > 1 ? 's' : '' }} dans la liste de référence
            </CardDescription>
          </div>
          <div v-if="people.length > 0" class="flex gap-2">
            <Dialog v-model:open="dialogImportOpen">
              <form>
                <DialogTrigger as-child>
                  <Button variant="outline">
                    <Icon name="lucide:upload" size="20" class="mr-2" />
                    Importer
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Import un fichier</DialogTitle>
                    <DialogDescription>Format de fichier accepté : .xlsx, .xls </DialogDescription>
                  </DialogHeader>
                  Le format suivant doit être respecté pour que l'import fonctionne correctement :
                  <ul class="list-disc list-inside mt-2">
                    <li>Colonne A : Grade</li>
                    <li>Colonne B : Nom, Prénom (séparés par une virgule)</li>
                    <li>Colonne C : Section</li>
                  </ul>
                  <p class="mt-2 text-muted-foreground text-sm">
                    Note: Les 3 colonnes sont obligatoires. La colonne Section sera utilisée pour la validation lors de
                    l'ajout de présences.
                  </p>

                  <DialogFooter>
                    <DialogClose as-child>
                      <Button variant="outline"> Cancel </Button>
                    </DialogClose>
                    <input
                      ref="fileInputRef"
                      type="file"
                      accept=".xlsx,.xls"
                      class="hidden"
                      @change="handleFileSelect"
                    />
                    <Button @click="triggerFileInput">
                      <Icon name="lucide:upload" size="20" class="mr-2" />
                      Importer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <Button variant="outline" @click="showAddDialog = true">
              <Icon name="lucide:user-plus" size="20" class="mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent v-if="people.length === 0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="lucide:users" />
            </EmptyMedia>
            <EmptyTitle>Aucune personne dans la liste</EmptyTitle>
            <EmptyDescription>Importez un fichier XLSX pour commencer</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Dialog v-model:open="dialogImportOpen">
              <form>
                <DialogTrigger as-child>
                  <Button>
                    <Icon name="lucide:upload" size="20" class="mr-2" />
                    Importer
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Import un fichier</DialogTitle>
                    <DialogDescription>Format de fichier accepté : .xlsx, .xls </DialogDescription>
                  </DialogHeader>
                  Le format suivant doit être respecté pour que l'import fonctionne correctement :
                  <ul class="list-disc list-inside mt-2">
                    <li>Colonne A : Grade</li>
                    <li>Colonne B : Nom, Prénom (séparés par une virgule)</li>
                    <li>Colonne C : Section</li>
                  </ul>
                  <p class="mt-2 text-muted-foreground text-sm">
                    Note: Les 3 colonnes sont obligatoires. La colonne Section sera utilisée pour la validation lors de
                    l'ajout de présences.
                  </p>

                  <DialogFooter>
                    <DialogClose as-child>
                      <Button variant="outline"> Cancel </Button>
                    </DialogClose>
                    <input
                      ref="fileInputRef"
                      type="file"
                      accept=".xlsx,.xls"
                      class="hidden"
                      @change="handleFileSelect"
                    />
                    <Button @click="triggerFileInput">
                      <Icon name="lucide:upload" size="20" class="mr-2" />
                      Importer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </EmptyContent>
        </Empty>
      </CardContent>

      <CardContent v-else>
        <div class="mb-4">
          <Input v-model="searchQuery" placeholder="Rechercher par grade, nom ou prénom..." class="max-w-md">
            <template #prefix>
              <Icon name="lucide:search" size="16" class="text-muted-foreground" />
            </template>
          </Input>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('grade')">
                <div class="flex gap-2 items-center">
                  Grade
                  <Icon
                    v-if="sortField === 'grade'"
                    :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    size="14"
                  />
                  <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                </div>
              </TableHead>
              <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('firstName')">
                <div class="flex gap-2 items-center">
                  Prénom
                  <Icon
                    v-if="sortField === 'firstName'"
                    :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    size="14"
                  />
                  <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                </div>
              </TableHead>
              <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('lastName')">
                <div class="flex gap-2 items-center">
                  Nom
                  <Icon
                    v-if="sortField === 'lastName'"
                    :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    size="14"
                  />
                  <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                </div>
              </TableHead>
              <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('section')">
                <div class="flex gap-2 items-center">
                  Section
                  <Icon
                    v-if="sortField === 'section'"
                    :name="sortOrder === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    size="14"
                  />
                  <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                </div>
              </TableHead>
              <TableHead>Importé depuis</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="person in filteredAndSortedPeople" :key="person.id" class="hover:bg-muted/50">
              <TableCell class="font-medium">{{ person.grade }}</TableCell>
              <TableCell class="font-medium">{{ person.firstName }}</TableCell>
              <TableCell class="font-medium">{{ person.lastName }}</TableCell>
              <TableCell class="font-medium">{{ person.section || '-' }}</TableCell>
              <TableCell class="text-muted-foreground text-sm">
                {{ person.importedFrom || 'Ajout manuel' }}
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
                    @click="confirmDelete(person)"
                  >
                    <Icon name="lucide:trash-2" size="14" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter v-if="people.length > 0" class="flex justify-between">
        <Button
          variant="ghost"
          class="hover:bg-destructive/10 hover:text-destructive text-destructive"
          @click="showClearDialog = true"
        >
          <Icon name="lucide:trash-2" size="20" class="mr-2" />
          Tout supprimer
        </Button>
        <div class="text-muted-foreground text-sm">
          {{ filteredAndSortedPeople.length }} / {{ people.length }} personne{{
            filteredAndSortedPeople.length > 1 ? 's' : ''
          }}
        </div>
      </CardFooter>
    </Card>

    <!-- Dialog d'ajout/modification -->
    <Dialog :open="showAddDialog || !!personToEdit" @update:open="handleDialogClose">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ personToEdit ? 'Modifier' : 'Ajouter' }} une personne</DialogTitle>
          <DialogDescription>
            {{ personToEdit ? 'Modifiez les informations' : 'Ajoutez une nouvelle personne à la liste' }}
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <div class="gap-1.5 grid items-center w-full">
            <Label for="dialog-grade">Grade :</Label>
            <Input id="dialog-grade" v-model="editForm.grade" placeholder="Sdt" />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="dialog-firstname">Prénom :</Label>
            <Input id="dialog-firstname" v-model="editForm.firstName" placeholder="Jean" />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="dialog-lastname">Nom :</Label>
            <Input id="dialog-lastname" v-model="editForm.lastName" placeholder="Du Jardin" />
          </div>
          <div
            v-if="editError"
            class="bg-destructive/10 border border-destructive p-3 rounded-lg text-destructive text-sm"
          >
            {{ editError }}
          </div>
        </div>
        <DialogFooter class="flex gap-2 justify-end">
          <Button variant="outline" @click="handleDialogClose">Annuler</Button>
          <Button :disabled="!canSaveEdit" @click="saveEdit">
            {{ personToEdit ? 'Modifier' : 'Ajouter' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Dialog de confirmation de suppression -->
    <Dialog :open="!!personToDelete" @update:open="(open) => !open && (personToDelete = null)">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer {{ personToDelete?.grade }} {{ personToDelete?.firstName }}
            {{ personToDelete?.lastName }} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="flex gap-2 justify-end">
          <Button variant="outline" @click="personToDelete = null">Annuler</Button>
          <Button variant="destructive" @click="deletePerson">Supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Dialog de confirmation de suppression totale -->
    <Dialog :open="showClearDialog" @update:open="(open) => !open && (showClearDialog = false)">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression totale</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer toutes les {{ people.length }} personnes de la liste ? Cette action est
            irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="flex gap-2 justify-end">
          <Button variant="outline" @click="showClearDialog = false">Annuler</Button>
          <Button variant="destructive" @click="clearAll">Tout supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Toast de résultat d'import -->
    <div
      v-if="importResult"
      class="animate-in bg-card border bottom-4 fade-in fixed p-4 right-4 rounded-lg shadow-lg slide-in-from-bottom-5 z-50"
    >
      <div class="flex gap-3 items-start">
        <Icon
          :name="importResult.errors.length > 0 ? 'lucide:alert-circle' : 'lucide:check-circle'"
          :class="importResult.errors.length > 0 ? 'text-orange-500' : 'text-green-500'"
          size="20"
        />
        <div class="flex-1">
          <p class="font-semibold">Import terminé</p>
          <div class="text-muted-foreground text-sm">
            <p>{{ importResult.success }} ajouté{{ importResult.success > 1 ? 's' : '' }}</p>
            <p v-if="importResult.duplicates > 0">{{ importResult.duplicates }} duplicata(s) ignoré(s)</p>
            <p v-if="importResult.errors.length > 0" class="text-orange-500">
              {{ importResult.errors.length }} erreur(s)
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" @click="importResult = null">
          <Icon name="lucide:x" size="16" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonReference } from '~/types/presence'

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
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty'
import { usePersonReference } from '~/composables/usePersonReference'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'Personnel - Presence Controller'
})

const { addPerson, clearAll: clearAllPeople, importFromFile, people, removePerson, updatePerson } = usePersonReference()

const fileInputRef = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const sortField = ref<'grade' | 'firstName' | 'lastName' | 'section'>('lastName')
const sortOrder = ref<'asc' | 'desc'>('asc')
const dialogImportOpen = ref(false)

const showAddDialog = ref(false)
const personToEdit = ref<PersonReference | null>(null)
const personToDelete = ref<PersonReference | null>(null)
const showClearDialog = ref(false)
const importResult = ref<{ success: number; duplicates: number; errors: string[] } | null>(null)

const editForm = reactive({
  firstName: '',
  grade: '',
  lastName: ''
})

const editError = ref('')

const canSaveEdit = computed(() => {
  return editForm.grade.trim() && editForm.firstName.trim() && editForm.lastName.trim()
})

const filteredAndSortedPeople = computed(() => {
  let filtered = [...people.value]

  // Filtrer par recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.grade.toLowerCase().includes(query) ||
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query)
    )
  }

  // Trier
  filtered.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // Gérer les valeurs undefined (pour section optionnelle)
    if (aValue === undefined) aValue = ''
    if (bValue === undefined) bValue = ''

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const toggleSort = (field: 'grade' | 'firstName' | 'lastName' | 'section') => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = async (event: Event) => {
  dialogImportOpen.value = false
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const result = await importFromFile(file)
  importResult.value = result

  // Réinitialiser l'input pour permettre de réimporter le même fichier
  target.value = ''

  // Auto-fermer le toast après 5 secondes
  setTimeout(() => {
    importResult.value = null
  }, 5000)
}

const editPerson = (person: PersonReference) => {
  personToEdit.value = person
  editForm.grade = person.grade
  editForm.firstName = person.firstName
  editForm.lastName = person.lastName
  editError.value = ''
}

const handleDialogClose = () => {
  showAddDialog.value = false
  personToEdit.value = null
  editForm.grade = ''
  editForm.firstName = ''
  editForm.lastName = ''
  editError.value = ''
}

const saveEdit = () => {
  if (!canSaveEdit.value) return

  if (personToEdit.value) {
    // Modification
    const success = updatePerson(personToEdit.value.id, editForm.firstName, editForm.lastName, editForm.grade)
    if (success) {
      handleDialogClose()
    } else {
      editError.value = 'Cette personne existe déjà dans la liste'
    }
  } else {
    // Ajout
    const added = addPerson(editForm.firstName, editForm.lastName, editForm.grade)
    if (added) {
      handleDialogClose()
    } else {
      editError.value = 'Cette personne existe déjà dans la liste'
    }
  }
}

const confirmDelete = (person: PersonReference) => {
  personToDelete.value = person
}

const deletePerson = () => {
  if (personToDelete.value) {
    removePerson(personToDelete.value.id)
    personToDelete.value = null
  }
}

const clearAll = () => {
  clearAllPeople()
  showClearDialog.value = false
}
</script>

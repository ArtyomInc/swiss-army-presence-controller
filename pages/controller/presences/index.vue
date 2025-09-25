<template>
  <div class="flex flex-col gap-6">
    <!-- Header avec statistiques -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Vue d'ensemble des Présences</CardTitle>
            <CardDescription>
              {{ totalPeople }} personne{{ totalPeople > 1 ? 's' : '' }} enregistrée{{ totalPeople > 1 ? 's' : '' }} 
              dans {{ sections.length }} section{{ sections.length > 1 ? 's' : '' }}
            </CardDescription>
          </div>
          <div class="flex gap-2">
            <Link href="/controller/register">
                <Icon name="lucide:user-plus" size="20" class="mr-2" />
                Ajouter
            </Link>
            <Link href="/controller">
                <Icon name="lucide:settings" size="20" class="mr-2" />
                Sections
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>

    <!-- État vide -->
    <Card v-if="totalPeople === 0">
      <CardContent class="text-center py-12">
        <Icon name="lucide:users" size="48" class="mx-auto text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium mb-2">Aucune présence enregistrée</h3>
        <p class="text-muted-foreground mb-6">Commencez par ajouter des personnes à vos sections</p>
        <Link href="/controller/register">
            <Icon name="lucide:user-plus" size="20" class="mr-2" />
            Enregistrer la première présence
        </Link>
      </CardContent>
    </Card>

    <!-- Vue par section -->
    <div v-else class="grid gap-6">
      <Card v-for="section in sections" :key="section.name">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="flex items-center gap-2">
                <Icon name="lucide:users" size="20" />
                {{ section.name }}
              </CardTitle>
              <CardDescription>
                {{ getPeopleBySection(section.name).length }} personne{{ getPeopleBySection(section.name).length > 1 ? 's' : '' }} présente{{ getPeopleBySection(section.name).length > 1 ? 's' : '' }}
              </CardDescription>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-primary">
                {{ getPeopleBySection(section.name).length }}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent v-if="getSortedPeopleBySection(section.name).length > 0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('firstName', section.name)">
                  <div class="flex items-center gap-2">
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
                  <div class="flex items-center gap-2">
                    Nom
                    <Icon
                      v-if="getSortConfig(section.name).field === 'lastName'"
                      :name="getSortConfig(section.name).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('hasServiceBooklet', section.name)">
                  <div class="flex items-center gap-2">
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
                  <div class="flex items-center gap-2">
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
                <TableCell class="font-medium">{{ person.firstName }}</TableCell>
                <TableCell class="font-medium">{{ person.lastName }}</TableCell>
                <TableCell>
                  <span v-if="person.hasServiceBooklet" class="inline-flex items-center text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    <Icon name="lucide:book-open" size="12" class="mr-1" />
                    Oui
                  </span>
                  <span v-else class="text-xs text-muted-foreground">Non</span>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatDateTime(person.registeredAt) }}
                </TableCell>
                <TableCell class="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-destructive hover:text-destructive hover:bg-destructive/10"
                    @click="confirmRemovePerson(person)"
                  >
                    <Icon name="lucide:trash-2" size="14" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        
        <CardContent v-else class="text-center py-8">
          <Icon name="lucide:user-x" size="32" class="mx-auto text-muted-foreground mb-2" />
          <p class="text-muted-foreground">Aucune personne dans cette section</p>
        </CardContent>
      </Card>
    </div>

    <!-- Modal de confirmation pour la suppression -->
    <div v-if="personToRemove" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="cancelRemove">
      <Card class="w-full max-w-md mx-4" @click.stop>
        <CardHeader>
          <CardTitle>Confirmer la suppression</CardTitle>
          <CardDescription>
            Êtes-vous sûr de vouloir supprimer {{ personToRemove.firstName }} {{ personToRemove.lastName }} 
            de la section {{ personToRemove.section }} ?
          </CardDescription>
        </CardHeader>
        <CardFooter class="flex justify-end gap-2">
          <Button variant="outline" @click="cancelRemove">Annuler</Button>
          <Button variant="destructive" @click="confirmRemove">Supprimer</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'

const { getPeopleBySection, people, removePerson, sections } = usePresenceController()

const totalPeople = computed(() => people.value.length)

// Configuration de tri par section
const sortConfigs = ref<Record<string, { field: string; order: 'asc' | 'desc' }>>({})

// Initialiser la configuration de tri par défaut pour chaque section
watch(sections, (newSections) => {
  newSections.forEach(section => {
    if (!sortConfigs.value[section.name]) {
      sortConfigs.value[section.name] = { field: 'lastName', order: 'asc' }
    }
  })
}, { immediate: true })

// Obtenir la configuration de tri pour une section
const getSortConfig = (sectionName: string) => {
  return sortConfigs.value[sectionName] || { field: 'lastName', order: 'asc' }
}

// Basculer le tri
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

// Obtenir les personnes triées pour une section
const getSortedPeopleBySection = (sectionName: string) => {
  const sectionPeople = getPeopleBySection(sectionName)
  const config = getSortConfig(sectionName)

  return [...sectionPeople].sort((a, b) => {
    let aValue = a[config.field]
    let bValue = b[config.field]

    // Traitement spécial pour les dates
    if (config.field === 'registeredAt') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    // Traitement spécial pour les booléens
    if (config.field === 'hasServiceBooklet') {
      aValue = aValue ? 1 : 0
      bValue = bValue ? 1 : 0
    }

    // Traitement spécial pour les chaînes de caractères
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

// Gestion de la suppression
const personToRemove = ref<any>(null)

const confirmRemovePerson = (person: any) => {
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

// Formatage des dates
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

// Navigation si aucune section
watchEffect(() => {
  if (import.meta.client && sections.value.length === 0) {
    setTimeout(() => {
      if (sections.value.length === 0) {
        navigateTo('/controller')
      }
    }, 1000)
  }
})
</script>

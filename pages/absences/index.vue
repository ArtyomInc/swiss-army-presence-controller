<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Vue d'ensemble des Absences</CardTitle>
            <CardDescription>
              {{ totalAbsences }} personne{{ totalAbsences > 1 ? 's' : '' }} absente{{
                totalAbsences > 1 ? 's' : ''
              }}
              dans {{ absencesSections.length }} section{{ absencesSections.length > 1 ? 's' : '' }}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent v-if="totalAbsences === 0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="lucide:user-check" />
            </EmptyMedia>
            <EmptyTitle>Aucune absence détectée</EmptyTitle>
            <EmptyDescription>Toutes les personnes de la liste du personnel sont présentes</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/personnel">
              <Icon name="lucide:users" size="20" class="mr-2" />
              Voir le personnel
            </Link>
          </EmptyContent>
        </Empty>
      </CardContent>
      <CardContent v-else-if="personnelList.length === 0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="lucide:users" />
            </EmptyMedia>
            <EmptyTitle>Aucune personne dans la liste du personnel</EmptyTitle>
            <EmptyDescription>Importez d'abord une liste de personnel pour détecter les absences</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/personnel">
              <Icon name="lucide:upload" size="20" class="mr-2" />
              Importer le personnel
            </Link>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>

    <div v-if="totalAbsences > 0" class="gap-6 grid">
      <Card v-for="sectionName in absencesSections" :key="sectionName">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="flex gap-2 items-center">
                <Icon name="lucide:user-x" size="20" />
                {{ sectionName }}
              </CardTitle>
              <CardDescription>
                {{ getAbsencesBySection(sectionName).length }} personne{{
                  getAbsencesBySection(sectionName).length > 1 ? 's' : ''
                }}
                absente{{ getAbsencesBySection(sectionName).length > 1 ? 's' : '' }}
              </CardDescription>
            </div>
            <div class="text-right">
              <div class="font-bold text-2xl text-destructive">
                {{ getAbsencesBySection(sectionName).length }}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent v-if="getSortedAbsencesBySection(sectionName).length > 0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('grade', sectionName)">
                  <div class="flex gap-2 items-center">
                    Grade
                    <Icon
                      v-if="getSortConfig(sectionName).field === 'grade'"
                      :name="getSortConfig(sectionName).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('firstName', sectionName)">
                  <div class="flex gap-2 items-center">
                    Prénom
                    <Icon
                      v-if="getSortConfig(sectionName).field === 'firstName'"
                      :name="getSortConfig(sectionName).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead class="cursor-pointer hover:bg-muted/50" @click="toggleSort('lastName', sectionName)">
                  <div class="flex gap-2 items-center">
                    Nom
                    <Icon
                      v-if="getSortConfig(sectionName).field === 'lastName'"
                      :name="getSortConfig(sectionName).order === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                      size="14"
                    />
                    <Icon v-else name="lucide:chevrons-up-down" size="14" class="opacity-50" />
                  </div>
                </TableHead>
                <TableHead>Section</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="person in getSortedAbsencesBySection(sectionName)"
                :key="person.id"
                class="hover:bg-muted/50"
              >
                <TableCell class="font-medium">{{ person.grade }}</TableCell>
                <TableCell class="font-medium">{{ person.firstName }}</TableCell>
                <TableCell class="font-medium">{{ person.lastName }}</TableCell>
                <TableCell class="text-muted-foreground">{{ person.section || '-' }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty'
import { Link } from '@/ui/link'
import { usePersonReference } from '~/composables/usePersonReference'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'Absences - Presence Controller'
})

const { people: personnelList } = usePersonReference()
const { people: presences } = usePresenceController()

// Calculer les absences en comparant la liste du personnel avec les présences
const absences = computed(() => {
  return personnelList.value.filter((personRef) => {
    // Vérifier si cette personne n'est PAS présente
    return !presences.value.some(
      (presence) =>
        presence.grade.toLowerCase() === personRef.grade.toLowerCase() &&
        presence.firstName.toLowerCase() === personRef.firstName.toLowerCase() &&
        presence.lastName.toLowerCase() === personRef.lastName.toLowerCase()
    )
  })
})

const totalAbsences = computed(() => absences.value.length)

// Obtenir la liste des sections avec des absences
const absencesSections = computed(() => {
  const sectionsSet = new Set<string>()
  absences.value.forEach((person) => {
    const sectionName = person.section || 'Section non définie'
    sectionsSet.add(sectionName)
  })
  return Array.from(sectionsSet).sort()
})

// Obtenir les absences par section
const getAbsencesBySection = (sectionName: string) => {
  return absences.value.filter((person) => {
    const personSection = person.section || 'Section non définie'
    return personSection === sectionName
  })
}

// Configuration du tri par section
const sortConfigs = ref<Record<string, { field: string; order: 'asc' | 'desc' }>>({})

watch(
  absencesSections,
  (newSections) => {
    newSections.forEach((section) => {
      if (!sortConfigs.value[section]) {
        sortConfigs.value[section] = { field: 'lastName', order: 'asc' }
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

const getSortedAbsencesBySection = (sectionName: string) => {
  const sectionAbsences = getAbsencesBySection(sectionName)
  const config = getSortConfig(sectionName)

  return [...sectionAbsences].sort((a, b) => {
    let aValue: string | number | boolean | Date | undefined = a[config.field as keyof typeof a]
    let bValue: string | number | boolean | Date | undefined = b[config.field as keyof typeof b]

    // Gérer les valeurs undefined
    if (aValue === undefined) aValue = ''
    if (bValue === undefined) bValue = ''

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
</script>

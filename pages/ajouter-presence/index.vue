<template>
  <div class="flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Enregistrement des Présences</CardTitle>
        <CardDescription>Ajoutez une personne à une section pour enregistrer sa présence</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="gap-1.5 grid items-center w-full">
          <Label for="grade">Grade :</Label>
          <Input id="grade" v-model="userForm.grade" placeholder="ex: Sdt" @keyup.enter="handleSubmit" />
        </div>

        <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div class="gap-1.5 grid items-center w-full">
            <Label for="firstname">Prénom :</Label>
            <PersonAutocompleteInput
              id="firstname"
              v-model="userForm.firstName"
              placeholder="ex: Jean"
              :people="personnelList"
              search-field="firstName"
              @person-selected="handlePersonSelected"
              @enter="handleSubmit"
            />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="lastname">Nom :</Label>
            <PersonAutocompleteInput
              id="lastname"
              v-model="userForm.lastName"
              placeholder="ex: Du Jardin"
              :people="personnelList"
              search-field="lastName"
              @person-selected="handlePersonSelected"
              @enter="handleSubmit"
            />
          </div>
        </div>

        <div class="gap-1.5 grid items-center w-full">
          <Label for="section">Section :</Label>
          <SectionInput
            id="section"
            v-model="userForm.section"
            :sections="availableSections"
            placeholder="ex: Kdo"
            @enter="handleSubmit"
          />
        </div>

        <div class="flex gap-1.5 items-center w-full">
          <Checkbox id="hasServiceBooklet" v-model="userForm.hasServiceBooklet" />
          <Label for="hasServiceBooklet">Livret de service</Label>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button :disabled="!canSubmit" class="min-w-[120px]" @click="handleSubmit">
          <template v-if="isSubmitting">
            <Spinner class="mr-2" />
            Ajout...
          </template>
          <template v-else>
            Ajouter
            <Icon name="lucide:plus" size="20" />
          </template>
        </Button>
      </CardFooter>
    </Card>

    <Card v-if="recentPeople.length > 0">
      <CardHeader>
        <CardTitle>Personnes Récemment Ajoutées</CardTitle>
        <CardDescription>Les 5 dernières personnes enregistrées</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div
            v-for="person in recentPeople"
            :key="person.id"
            class="bg-green-50 dark:bg-green-900/20 flex items-center justify-between p-3 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <Icon name="lucide:user-check" size="16" class="dark:text-green-400 text-green-600" />
              <div class="flex-1">
                <p class="font-medium">{{ person.grade }} {{ person.firstName }} {{ person.lastName }}</p>
                <div class="flex gap-2 items-center">
                  <p class="text-muted-foreground text-sm">{{ person.section }}</p>
                  <span
                    v-if="person.hasServiceBooklet"
                    class="bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full text-blue-700 text-xs"
                  >
                    📖 Livret
                  </span>
                </div>
              </div>
            </div>
            <div class="text-muted-foreground text-sm">
              {{ formatTime(person.registeredAt) }}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/presences" class="w-full"> Voir toutes les présences <Icon name="lucide:users" size="20" /> </Link>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { PersonReference } from '~/types/presence'

import { Checkbox } from '@/ui/checkbox'
import { Link } from '@/ui/link'
import { Spinner } from '@/ui/spinner'
import PersonAutocompleteInput from '~/components/PersonAutocompleteInput.vue'
import SectionInput from '~/components/SectionInput.vue'
import { usePersonReference } from '~/composables/usePersonReference'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'Enregistrement - Presence Controller'
})

const { addPerson, people, sectionNames } = usePresenceController()
const { people: personnelList } = usePersonReference()

const userForm = reactive<{
  firstName?: string
  lastName?: string
  grade?: string
  section?: string
  hasServiceBooklet?: boolean
}>({
  hasServiceBooklet: false
})

const isSubmitting = ref(false)

// Combiner les sections configurées et les sections des références du personnel
const availableSections = computed(() => {
  const sections = new Set<string>()

  // Ajouter les sections configurées
  sectionNames.value.forEach((section) => sections.add(section))

  // Ajouter les sections uniques du personnel
  personnelList.value.forEach((person) => {
    if (person.section) {
      sections.add(person.section)
    }
  })

  return Array.from(sections).sort()
})

// Gérer la sélection d'une personne depuis l'autocomplétion
const handlePersonSelected = (person: PersonReference) => {
  userForm.grade = person.grade
  userForm.firstName = person.firstName
  userForm.lastName = person.lastName
  // Pré-remplir aussi la section si disponible
  if (person.section) {
    userForm.section = person.section
  }
}

const canSubmit = computed(() => {
  return (
    userForm.firstName?.trim() &&
    userForm.lastName?.trim() &&
    userForm.grade?.trim() &&
    userForm.section?.trim() &&
    !isSubmitting.value
  )
})

const recentPeople = computed(() => {
  return [...people.value]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, 5)
})

const handleSubmit = async () => {
  if (!canSubmit.value) return

  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const person = addPerson(
      userForm.firstName!,
      userForm.lastName!,
      userForm.grade!,
      userForm.section!,
      userForm.hasServiceBooklet || false
    )

    if (person) {
      userForm.firstName = ''
      userForm.lastName = ''
      userForm.grade = ''
      userForm.hasServiceBooklet = false
    }
  } finally {
    isSubmitting.value = false
  }
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}
</script>

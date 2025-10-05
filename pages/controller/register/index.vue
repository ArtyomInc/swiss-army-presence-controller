<template>
  <div class="flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Enregistrement des Présences</CardTitle>
        <CardDescription>Ajoutez une personne à une section pour enregistrer sa présence</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div class="gap-1.5 grid items-center w-full">
            <Label for="firstname">Prénom :</Label>
            <Input id="firstname" v-model="userForm.firstName" placeholder="Jean" @keyup.enter="handleSubmit" />
          </div>
          <div class="gap-1.5 grid items-center w-full">
            <Label for="lastname">Nom :</Label>
            <Input id="lastname" v-model="userForm.lastName" placeholder="Du Jardin" @keyup.enter="handleSubmit" />
          </div>
        </div>

        <div class="gap-1.5 grid items-center w-full">
          <Label for="section">Section :</Label>
          <Select v-model="userForm.section" >
            <SelectTrigger id="section" class="w-full">
              <SelectValue placeholder="Sélectionner une section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <template v-for="section in sectionNames" :key="section">
                  <SelectItem :value="section">{{ section }}</SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="flex gap-1.5 items-center w-full">
          <Checkbox id="hasServiceBooklet" v-model="userForm.hasServiceBooklet" />
          <Label for="hasServiceBooklet">Livret de service</Label>
        </div>
        <div v-if="sectionNames.length === 0" class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <p class="dark:text-yellow-200 text-sm text-yellow-800">
            <Icon name="lucide:alert-triangle" size="16" class="inline mr-1" />
            Aucune section configurée.
            <Link href="/controller" class="font-medium underline">Retourner à la configuration</Link>
          </p>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Link href="/controller" variant="outline"> <Icon name="lucide:arrow-left" size="20" /> Retour </Link>
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
                <p class="font-medium">{{ person.firstName }} {{ person.lastName }}</p>
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
        <Link href="/controller/presences" class="w-full">
          Voir toutes les présences <Icon name="lucide:users" size="20" />
        </Link>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from '@/ui/checkbox'
import { Link } from '@/ui/link'
import { Spinner } from '@/ui/spinner'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'Enregistrement - Presence Controller'
})

const { addPerson, people, sectionNames } = usePresenceController()

const userForm = reactive<{
  firstName?: string
  lastName?: string
  section?: string
  hasServiceBooklet?: boolean
}>({
  hasServiceBooklet: false
})

const isSubmitting = ref(false)

const canSubmit = computed(() => {
  return (
    userForm.firstName?.trim() &&
    userForm.lastName?.trim() &&
    userForm.section &&
    sectionNames.value.length > 0 &&
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
      userForm.section!,
      userForm.hasServiceBooklet || false
    )

    if (person) {
      userForm.firstName = ''
      userForm.lastName = ''
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

watchEffect(() => {
  if (import.meta.client && sectionNames.value.length === 0) {
    setTimeout(() => {
      if (sectionNames.value.length === 0) {
        navigateTo('/controller')
      }
    }, 1000)
  }
})
</script>

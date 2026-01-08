<template>
  <div class="flex flex-col gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Sections</CardTitle>
        <CardDescription>Ajoutez les sections/groupes avant d'enregistrer les présences</CardDescription>
      </CardHeader>
      <CardContent>
        <MultiField v-model="sectionNames" block-empty placeholder="Kdo, Rep, Mun, etc." />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import MultiField from '~/components/MultiField.vue'
import { usePresenceController } from '~/composables/usePresenceController'

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'App - Presence Controller'
})

const { sectionNames } = usePresenceController()
</script>

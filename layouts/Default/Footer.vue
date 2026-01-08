<template>
  <div class="max-w-screen-xl md:px-10 mt-6 mx-auto px-5 w-full">
    <Card v-if="hasData">
      <CardHeader>
        <CardTitle>Gestion des données stockées</CardTitle>
        <CardDescription>Supprimez toutes les données stockées localement</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-if="totalPeople > 0" class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-medium">Présences enregistrées</span>
            <span class="text-muted-foreground text-sm"
              >{{ totalPeople }} personne{{ totalPeople > 1 ? 's' : '' }}</span
            >
          </div>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="ghost" size="sm" class="hover:bg-destructive/10 hover:text-destructive text-destructive">
                <Icon name="lucide:trash-2" size="16" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer toutes les présences</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer toutes les présences enregistrées ? Cette action est irréversible.
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

        <div v-if="totalReferences > 0" class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-medium">Références de personnel</span>
            <span class="text-muted-foreground text-sm"
              >{{ totalReferences }} personne{{ totalReferences > 1 ? 's' : '' }}</span
            >
          </div>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="ghost" size="sm" class="hover:bg-destructive/90 hover:text-destructive text-destructive">
                <Icon name="lucide:trash-2" size="16" />
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Supprimer toutes les références</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer toutes les références de personnel ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="flex gap-2 justify-end">
                <DialogClose as-child>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <DialogClose as-child>
                  <Button variant="destructive" @click="handleClearReferences">Supprimer</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
    <div class="flex flex-col gap-3 items-center justify-center md:py-20 opacity-50 py-10">
      <span> Built & design by ArtyomInc </span>
      <span> Copyright © {{ new Date().getFullYear() }} ArtyomInc </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { clearPeople, people } = usePresenceController()
const { clearAll: clearReferences, people: references } = usePersonReference()

const totalPeople = computed(() => people.value.length)
const totalReferences = computed(() => references.value.length)

const hasData = computed(() => totalPeople.value > 0 || totalReferences.value > 0)

const handleClearPeople = () => {
  clearPeople()
}

const handleClearReferences = () => {
  clearReferences()
}
</script>

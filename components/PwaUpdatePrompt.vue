<script setup lang="ts">
const pwa = usePWA()

const needRefresh = computed(() => pwa?.needRefresh?.value ?? false)

const updateServiceWorker = async () => {
  await pwa?.updateServiceWorker()
}

const close = () => {
  pwa?.cancelPrompt()
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="needRefresh"
      class="bg-background border bottom-4 fixed left-4 max-w-md mx-auto p-4 right-4 rounded-lg shadow-lg sm:left-auto sm:right-4 z-50"
    >
      <div class="flex gap-4 items-start">
        <div class="flex-1">
          <h3 class="font-semibold">Nouvelle version disponible</h3>
          <p class="mt-1 text-muted-foreground text-sm">
            Une nouvelle version de l'application est disponible. Rechargez pour mettre à jour.
          </p>
        </div>
        <Button variant="ghost" size="icon" @click="close">
          <Icon name="lucide:x" class="size-4" />
        </Button>
      </div>
      <div class="flex gap-2 mt-4">
        <Button class="flex-1" @click="updateServiceWorker"> Mettre à jour </Button>
        <Button variant="outline" @click="close"> Plus tard </Button>
      </div>
    </div>
  </Transition>
</template>

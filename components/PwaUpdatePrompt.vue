<script setup lang="ts">
const pwa = usePWA()
const updating = ref(false)

const needRefresh = computed(() => {
  const refresh = pwa?.needRefresh as unknown as { value: boolean } | boolean | undefined
  if (typeof refresh === 'boolean') {
    return refresh
  }
  if (refresh && typeof refresh === 'object' && 'value' in refresh) {
    return refresh.value
  }
  return false
})

const updateServiceWorker = async () => {
  updating.value = true
  await pwa?.updateServiceWorker()
  // Recharger la page après la mise à jour du SW
  setTimeout(() => {
    window.location.reload()
  }, 500)
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
        <Icon name="lucide:download-cloud" class="flex-shrink-0 h-5 mt-0.5 text-primary w-5" />
        <div class="flex-1">
          <h3 class="font-semibold">Nouvelle version disponible</h3>
          <p class="mt-1 text-muted-foreground text-sm">
            Une mise à jour est disponible. Vos données locales sont préservées.
          </p>
        </div>
        <Button variant="ghost" size="icon" :disabled="updating" @click="close">
          <Icon name="lucide:x" class="size-4" />
        </Button>
      </div>
      <div class="flex gap-2 mt-4">
        <Button class="flex-1" :disabled="updating" @click="updateServiceWorker">
          <Icon v-if="updating" name="lucide:loader-2" class="animate-spin h-4 mr-2 w-4" />
          {{ updating ? 'Installation...' : 'Mettre à jour' }}
        </Button>
        <Button variant="outline" :disabled="updating" @click="close"> Plus tard </Button>
      </div>
    </div>
  </Transition>
</template>

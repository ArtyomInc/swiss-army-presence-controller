<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isInstallable && !dismissed"
      class="bg-gradient-to-r border-green-500 border-t bottom-0 fixed from-green-600 left-0 p-4 right-0 shadow-2xl to-green-700 z-50"
    >
      <div class="flex gap-4 items-center justify-between max-w-7xl mx-auto">
        <div class="flex flex-1 gap-3 items-center">
          <Icon name="lucide:download" class="flex-shrink-0 h-6 text-white w-6" />
          <div class="text-white">
            <p class="font-semibold sm:text-base text-sm">Installer l'application</p>
            <p class="sm:text-sm text-green-100 text-xs">Accès rapide et fonctionnement hors ligne</p>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <Button size="sm" class="bg-white font-semibold hover:bg-green-50 text-green-700" @click="handleInstall">
            Installer
          </Button>
          <Button size="sm" variant="ghost" class="hover:bg-green-600/50 text-white" @click="handleDismiss">
            Plus tard
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const pwa = usePWA()
const dismissed = ref(false)

// Vérifier si l'utilisateur a déjà refusé
if (import.meta.client) {
  const wasDismissed = localStorage.getItem('pwa-install-dismissed')
  if (wasDismissed === 'true') {
    dismissed.value = true
  }
}

const isInstallable = computed(() => {
  return pwa?.showInstallPrompt && !dismissed.value
})

const handleInstall = async () => {
  await pwa?.install()
  dismissed.value = true
}

const handleDismiss = () => {
  if (import.meta.client) {
    localStorage.setItem('pwa-install-dismissed', 'true')
  }
  dismissed.value = true
}
</script>

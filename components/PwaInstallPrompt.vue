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
          <Icon name="lucide:download" class="animate-bounce flex-shrink-0 h-6 text-white w-6" />
          <div class="text-white">
            <p class="font-semibold sm:text-base text-sm">
              {{ isIOS ? "Ajouter à l'écran d'accueil" : "Installer l'application" }}
            </p>
            <p class="sm:text-sm text-green-100 text-xs">Accès instantané • Fonctionne hors ligne • 0 Mo de données</p>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <Button size="sm" class="bg-white font-semibold hover:bg-green-50 text-green-700" @click="handleInstall">
            <Icon name="lucide:check" class="h-4 mr-1 w-4" />
            Installer
          </Button>
          <Button size="sm" variant="ghost" class="hover:bg-green-600/50 text-white" @click="handleDismiss">
            {{ (dismissalData?.count ?? 0) >= 2 ? 'Ne plus afficher' : 'Plus tard' }}
          </Button>
        </div>
      </div>

      <!-- Instructions iOS si nécessaire -->
      <div v-if="isIOS && showIOSInstructions" class="max-w-7xl mt-3 mx-auto text-green-100 text-xs">
        Appuyez sur <Icon name="lucide:share" class="h-3 inline w-3" /> puis "Sur l'écran d'accueil"
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

interface DismissalData {
  timestamp: number
  count: number
  permanent: boolean
}

const REPROMPT_DAYS = 7
const MAX_DISMISSALS = 3

const pwa = usePWA()
const dismissalData = useLocalStorage<DismissalData | null>('pwa-install-dismissal', null)
const showIOSInstructions = ref(false)
const dismissed = ref(false)

const isIOS = computed(() => {
  if (!import.meta.client) return false
  return /iPhone|iPad|iPod/.test(navigator.userAgent)
})

// Vérifier l'expiration au chargement
onMounted(() => {
  if (!dismissalData.value) {
    dismissed.value = false
    return
  }

  const daysSince = (Date.now() - dismissalData.value.timestamp) / (1000 * 60 * 60 * 24)
  dismissed.value = dismissalData.value.permanent || daysSince < REPROMPT_DAYS
})

const isInstallable = computed(() => {
  return pwa?.showInstallPrompt && !dismissed.value
})

const handleInstall = async () => {
  if (isIOS.value) {
    // iOS ne supporte pas beforeinstallprompt
    showIOSInstructions.value = true
    setTimeout(() => {
      showIOSInstructions.value = false
      dismissed.value = true
    }, 5000)
  } else {
    await pwa?.install()
    dismissed.value = true
    // Nettoyer les données de dismissal lors de l'installation
    dismissalData.value = null
  }
}

const handleDismiss = () => {
  const currentCount = dismissalData.value?.count || 0
  const newCount = currentCount + 1

  const data: DismissalData = {
    count: newCount,
    permanent: newCount >= MAX_DISMISSALS,
    timestamp: Date.now()
  }

  dismissalData.value = data
  dismissed.value = true
}
</script>

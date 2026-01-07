<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="!isOnline"
      class="backdrop-blur-sm bg-yellow-500/90 fixed font-medium left-0 px-4 py-2 right-0 text-center text-sm text-yellow-950 top-0 z-50"
    >
      <Icon name="lucide:wifi-off" class="h-4 inline mr-2 w-4" />
      Mode hors ligne - Vos données locales restent accessibles
    </div>
  </Transition>

  <!-- Toast notification when coming back online -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="showReconnectedToast"
      class="bg-green-600 bottom-20 fixed left-4 max-w-sm mx-auto p-4 right-4 rounded-lg shadow-lg sm:left-auto sm:right-4 text-white z-50"
    >
      <div class="flex gap-3 items-center">
        <Icon name="lucide:wifi" class="flex-shrink-0 h-5 w-5" />
        <p class="font-medium">Connexion rétablie</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'

const isOnline = useOnline()
const showReconnectedToast = ref(false)
const wasOffline = ref(false)

watch(isOnline, (online, wasOnlineBefore) => {
  if (!wasOnlineBefore) {
    wasOffline.value = true
  }

  if (online && wasOffline.value) {
    showReconnectedToast.value = true
    wasOffline.value = false

    setTimeout(() => {
      showReconnectedToast.value = false
    }, 3000)
  }
})
</script>

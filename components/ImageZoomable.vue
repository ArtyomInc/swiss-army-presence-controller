<template>
  <div>
    <NuxtImg :src="src" :alt="alt" :class="computedClass" v-bind="$attrs" @click="openLightbox" />

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="isOpen"
          class="backdrop-blur-sm bg-black/90 fixed flex inset-0 items-center justify-center z-50"
          @click="closeLightbox"
        >
          <button
            class="absolute hover:bg-white/10 p-2 right-4 rounded-full text-white top-4 transition-colors"
            aria-label="Fermer"
            @click="closeLightbox"
          >
            <Icon name="lucide:x" size="32" />
          </button>

          <div class="flex h-full items-center justify-center max-h-screen max-w-7xl p-4 relative w-full">
            <img :src="src" :alt="alt" class="max-h-full max-w-full object-contain rounded-xl" @click.stop />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  class: ''
})

const isOpen = ref(false)

const computedClass = computed(() => {
  const baseClass = 'cursor-zoom-in'
  return props.class ? `${props.class} ${baseClass}` : baseClass
})

const openLightbox = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeLightbox()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>

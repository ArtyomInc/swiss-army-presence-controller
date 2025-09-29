<template>
  <div class="fixed flex flex-col gap-5 h-screen items-center justify-center w-screen">
    <h1 class="font-semibold">{{ props.error?.statusCode }}</h1>
    <a class="hover:underline" href="/">Go back home</a>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    default: () => ({ statusCode: 404, statusMessage: 'Page not found' }),
    type: Object as () => NuxtError
  }
})
</script>

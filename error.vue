<template>
  <div class="fixed flex h-screen w-screen flex-col items-center justify-center gap-5">
    <h1 class="font-semibold">{{ error?.statusCode }}</h1>
    <a class="hover:underline" href="/">Go back home</a>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

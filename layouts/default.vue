<template>
  <div>
    <Header />
    <div class="mx-auto pt-5 max-w-screen-xl px-5 md:px-10">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Default/Footer.vue'
import Header from './Default/Header.vue'
</script>

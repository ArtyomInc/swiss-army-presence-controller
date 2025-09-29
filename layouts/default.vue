<template>
  <div>
    <Header />
    <div class="max-w-screen-xl md:px-10 mx-auto pt-5 px-5">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Default/Footer.vue'
import Header from './Default/Header.vue'
</script>

<script setup lang="ts">
import '@/assets/css/main.css'

useHead({
  link: [{ href: '/apple-touch-icon.png', rel: 'apple-touch-icon' }],
  meta: [
    { content: '#0a0a0a', name: 'theme-color' },
    { content: 'yes', name: 'apple-mobile-web-app-capable' },
    { content: 'black-translucent', name: 'apple-mobile-web-app-status-bar-style' },
    { content: 'yes', name: 'mobile-web-app-capable' }
  ]
})
</script>

<template>
  <div>
    <NetworkStatus />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <PwaInstallPrompt />
      <PwaUpdatePrompt />
    </NuxtLayout>
  </div>
</template>

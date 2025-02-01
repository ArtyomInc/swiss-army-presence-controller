<template>
  <div class="h-16 border-b border-border">
    <div class="h-full flex items-center justify-between mx-auto max-w-screen-xl px-5 md:px-10">
      <div class="h-full flex items-center">
        <NuxtImg class="h-full py-3 pr-3" src="/logo.svg" />
        <span class="text-lg font-semibold">Presence Controller</span>
      </div>
      <div class="flex items-center gap-4 font-semibold">
        <a href="/">Home</a>
        <a href="/controller">Controller</a>
        <a href="/about">About</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply hover:text-primary;
}
</style>

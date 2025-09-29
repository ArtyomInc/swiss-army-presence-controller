<template>
  <header
    class="backdrop-blur bg-background/95 border-b sticky supports-[backdrop-filter]:bg-background/60 top-0 w-full z-50"
  >
    <div class="container flex h-16 items-center justify-between max-w-screen-xl mx-auto px-4">
      <!-- Logo & Brand -->
      <NuxtLink to="/" class="flex gap-3 hover:opacity-80 items-center transition-opacity">
        <div class="bg-primary flex h-8 items-center justify-center rounded-lg w-8">
          <NuxtImg class="h-6 w-6" src="/logo.svg" alt="Swiss Army Presence Controller" />
        </div>
        <div class="hidden sm:block">
          <span
            class="bg-clip-text bg-gradient-to-r font-bold from-foreground text-lg text-transparent to-foreground/80"
          >
            Swiss Army
          </span>
          <div class="-mt-1 font-medium text-muted-foreground text-sm">Presence Controller</div>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="gap-1 hidden items-center md:flex">
        <NuxtLink
          to="/"
          class="font-medium hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }"
        >
          Accueil
        </NuxtLink>
        <NuxtLink
          to="/controller"
          class="font-medium hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path.startsWith('/controller') }"
        >
          Application
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="font-medium hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }"
        >
          À propos
        </NuxtLink>
      </nav>

      <!-- CTA Button -->
      <div class="flex gap-3 items-center">
        <NuxtLink to="/controller" class="hidden sm:block">
          <Button size="sm" class="bg-primary hover:bg-primary/90">
            <Icon name="lucide:play-circle" size="16" class="mr-2" />
            Commencer
          </Button>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <Button variant="ghost" size="sm" class="md:hidden" @click="toggleMobileMenu">
          <Icon name="lucide:menu" size="20" />
        </Button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="mobileMenuOpen" class="bg-background border-t md:hidden">
      <nav class="container max-w-screen-xl mx-auto px-4 py-4 space-y-2">
        <NuxtLink
          to="/"
          class="block font-medium hover:bg-accent px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }"
          @click="mobileMenuOpen = false"
        >
          Accueil
        </NuxtLink>
        <NuxtLink
          to="/controller"
          class="block font-medium hover:bg-accent px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path.startsWith('/controller') }"
          @click="mobileMenuOpen = false"
        >
          Application
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="block font-medium hover:bg-accent px-3 py-2 rounded-md text-sm transition-all"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }"
          @click="mobileMenuOpen = false"
        >
          À propos
        </NuxtLink>
        <div class="border-t pt-2">
          <NuxtLink to="/controller" @click="mobileMenuOpen = false">
            <Button size="sm" class="bg-primary hover:bg-primary/90 w-full">
              <Icon name="lucide:play-circle" size="16" class="mr-2" />
              Commencer l'application
            </Button>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between max-w-screen-xl">
      <!-- Logo & Brand -->
      <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <NuxtImg class="w-6 h-6" src="/logo.svg" alt="Swiss Army Presence Controller" />
        </div>
        <div class="hidden sm:block">
          <span class="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Swiss Army
          </span>
          <div class="text-sm text-muted-foreground font-medium -mt-1">
            Presence Controller
          </div>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          to="/"
          class="px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent hover:text-accent-foreground"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }"
        >
          Accueil
        </NuxtLink>
        <NuxtLink
          to="/controller"
          class="px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent hover:text-accent-foreground"
          :class="{ 'bg-accent text-accent-foreground': $route.path.startsWith('/controller') }"
        >
          Application
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent hover:text-accent-foreground"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }"
        >
          À propos
        </NuxtLink>
      </nav>

      <!-- CTA Button -->
      <div class="flex items-center gap-3">
        <NuxtLink to="/controller" class="hidden sm:block">
          <Button size="sm" class="bg-primary hover:bg-primary/90">
            <Icon name="lucide:play-circle" size="16" class="mr-2" />
            Commencer
          </Button>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <Button
          variant="ghost"
          size="sm"
          class="md:hidden"
          @click="toggleMobileMenu"
        >
          <Icon name="lucide:menu" size="20" />
        </Button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="mobileMenuOpen" class="md:hidden border-t bg-background">
      <nav class="container mx-auto px-4 py-4 space-y-2 max-w-screen-xl">
        <NuxtLink
          to="/"
          class="block px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }"
          @click="mobileMenuOpen = false"
        >
          Accueil
        </NuxtLink>
        <NuxtLink
          to="/controller"
          class="block px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent"
          :class="{ 'bg-accent text-accent-foreground': $route.path.startsWith('/controller') }"
          @click="mobileMenuOpen = false"
        >
          Application
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="block px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-accent"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }"
          @click="mobileMenuOpen = false"
        >
          À propos
        </NuxtLink>
        <div class="pt-2 border-t">
          <NuxtLink to="/controller" @click="mobileMenuOpen = false">
            <Button size="sm" class="w-full bg-primary hover:bg-primary/90">
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
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>

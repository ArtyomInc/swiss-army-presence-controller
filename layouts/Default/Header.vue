<template>
  <header
    class="backdrop-blur bg-background/95 border-b sticky supports-[backdrop-filter]:bg-background/60 top-0 w-full z-50"
  >
    <div class="container flex h-16 items-center justify-between max-w-screen-xl mx-auto px-4">
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

      <div class="flex gap-1 items-center ml-auto">
        <nav class="gap-1 hidden items-center md:flex">
          <Link variant="ghost" to="/" :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }">
            <Icon name="lucide:home" size="16" class="mr-1.5" />
            Accueil
          </Link>
          <Link
            to="/controller"
            variant="ghost"
            :class="{
              'bg-accent text-accent-foreground': $route.path === '/controller' && !$route.path.includes('/controller/')
            }"
          >
            <Icon name="lucide:settings" size="16" class="mr-1.5" />
            Sections
          </Link>
          <Link
            to="/controller/personnel"
            variant="ghost"
            :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/personnel' }"
          >
            <Icon name="lucide:users" size="16" class="mr-1.5" />
            Personnel
          </Link>
          <Link
            to="/controller/register"
            variant="ghost"
            :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/register' }"
          >
            <Icon name="lucide:user-plus" size="16" class="mr-1.5" />
            Enregistrer
          </Link>
          <Link
            to="/controller/presences"
            variant="ghost"
            :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/presences' }"
          >
            <Icon name="lucide:list-checks" size="16" class="mr-1.5" />
            Présences
          </Link>
          <Link to="/about" variant="ghost" :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }">
            <Icon name="lucide:info" size="16" class="mr-1.5" />
            À propos
          </Link>
        </nav>

        <Button variant="ghost" size="sm" class="md:hidden" @click="toggleMobileMenu">
          <Icon name="lucide:menu" size="20" />
        </Button>
      </div>
    </div>

    <div v-show="mobileMenuOpen" class="bg-muted/50 border-t md:hidden">
      <nav class="flex flex-col py-4 space-y-2">
        <Link
          to="/"
          variant="ghost"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/' }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:home" size="16" class="mr-1.5" />
          Accueil
        </Link>
        <Link
          to="/controller"
          variant="ghost"
          :class="{
            'bg-accent text-accent-foreground': $route.path === '/controller' && !$route.path.includes('/controller/')
          }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:settings" size="16" class="mr-1.5" />
          Sections
        </Link>
        <Link
          to="/controller/personnel"
          variant="ghost"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/personnel' }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:users" size="16" class="mr-1.5" />
          Personnel
        </Link>
        <Link
          to="/controller/register"
          variant="ghost"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/register' }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:user-plus" size="16" class="mr-1.5" />
          Enregistrer
        </Link>
        <Link
          to="/controller/presences"
          variant="ghost"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/controller/presences' }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:list-checks" size="16" class="mr-1.5" />
          Présences
        </Link>
        <Link
          to="/about"
          variant="ghost"
          :class="{ 'bg-accent text-accent-foreground': $route.path === '/about' }"
          @click="mobileMenuOpen = false"
        >
          <Icon name="lucide:info" size="16" class="mr-1.5" />
          À propos
        </Link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

watch(
  () => useRoute().path,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>

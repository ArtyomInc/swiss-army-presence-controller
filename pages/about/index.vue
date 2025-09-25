<template>
  <div class="container max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-16 text-center">
      <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
        <Icon name="lucide:shield-check" size="14" />
        100% Open Source
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        À propos de
        <span class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Swiss Army Presence Controller
        </span>
      </h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Un outil gratuit et open source conçu pour simplifier la gestion
        des présences militaires lors des rentrées en service.
      </p>
    </div>

    <!-- Mission Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">L'objectif</h2>
      <div class="prose prose-muted max-w-none">
        <p>
          Cet outil a été développé pour répondre aux besoins concrets des unités militaires
          lors des rentrées en service et des exercices. L'objectif est simple :
          fournir une solution efficace et sécurisée pour la gestion des effectifs.
        </p>
        <p>
          Conçu par un militaire pour les militaires, l'interface respecte
          les standards opérationnels tout en restant intuitive et moderne.
        </p>
      </div>
    </section>

    <!-- Privacy & Security Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Confidentialité et sécurité</h2>
      <div class="prose prose-muted max-w-none mb-6">
        <p>
          Vos données sont précieuses et sensibles. C'est pourquoi le projet a été conçu avec un accent particulier sur la simplicité et la sécurité :
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="flex items-start gap-3">
          <Icon name="lucide:hard-drive" size="20" class="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="font-semibold mb-1">Stockage 100% local</h3>
            <p class="text-sm text-muted-foreground">
              Toutes les données restent sur votre appareil. Aucune transmission externe.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Icon name="lucide:shield-check" size="20" class="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="font-semibold mb-1">Aucun tracking</h3>
            <p class="text-sm text-muted-foreground">
              Seules les statistiques de visite anonymes via Umami.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <Icon name="lucide:eye-off" size="20" class="text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="font-semibold mb-1">Fonctionnement hors ligne</h3>
            <p class="text-sm text-muted-foreground">
              L'application fonctionne sans connexion internet.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Source Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Open Source</h2>
      <div class="prose prose-muted max-w-none mb-6">
        <p>
          Le code source est entièrement disponible et transparent.
          Vous pouvez l'examiner, le modifier ou contribuer aux améliorations.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 mb-6">
        <Link
        variant="secondary"
          href="https://github.com/ArtyomInc/swiss-army-presence-controller"
          target="_blank"
        >
          <Icon name="lucide:github" size="16" />
          Code source du projet
        </Link>
        <Link
        variant="secondary"
          href="https://arduc.ch"
          target="_blank"
        >
          <Icon name="lucide:user" size="16" />
          À propos du développeur
        </Link>
      </div>
    </section>

    <!-- Technical Stack Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Technologies utilisées</h2>
      <div class="prose prose-muted max-w-none mb-6">
        <p>
          L'application utilise des technologies web modernes pour garantir
          performance et compatibilité :
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-card rounded-lg border">
          <Icon name="lucide:code" size="24" class="mx-auto mb-2 text-green-500" />
          <h3 class="font-semibold text-sm">Vue 3</h3>
        </div>
        <div class="text-center p-4 bg-card rounded-lg border">
          <Icon name="lucide:zap" size="24" class="mx-auto mb-2 text-blue-500" />
          <h3 class="font-semibold text-sm">Nuxt 3</h3>
        </div>
        <div class="text-center p-4 bg-card rounded-lg border">
          <Icon name="lucide:palette" size="24" class="mx-auto mb-2 text-purple-500" />
          <h3 class="font-semibold text-sm">Tailwind CSS</h3>
        </div>
        <div class="text-center p-4 bg-card rounded-lg border">
          <Icon name="lucide:database" size="24" class="mx-auto mb-2 text-orange-500" />
          <h3 class="font-semibold text-sm">LocalStorage</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link';

useSeoMeta({
  description: 'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'À propos - Swiss Army Presence Controller',
})
</script>

<template>
  <div class="container max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-16 text-center">
      <div
        class="bg-primary/10 font-medium gap-2 inline-flex items-center mb-6 px-3 py-1 rounded-full text-primary text-sm"
      >
        <Icon name="lucide:shield-check" size="14" />
        100% Open Source
      </div>
      <h1 class="font-bold mb-6 md:text-5xl text-4xl">
        À propos de
        <span class="bg-clip-text bg-gradient-to-r from-primary text-transparent to-primary/60">
          Swiss Army Presence Controller
        </span>
      </h1>
      <p class="leading-relaxed max-w-2xl mx-auto text-muted-foreground text-xl">
        Un outil gratuit et open source conçu pour simplifier la gestion des présences militaires lors des rentrées en
        service.
      </p>
    </div>

    <!-- Mission Section -->
    <section class="mb-12">
      <h2 class="font-bold mb-4 text-2xl">L'objectif</h2>
      <div class="max-w-none prose prose-muted">
        <p>
          Cet outil a été développé pour répondre aux besoins concrets des unités militaires lors des rentrées en
          service et des exercices. L'objectif est simple : fournir une solution efficace et sécurisée pour la gestion
          des effectifs.
        </p>
        <p>
          Conçu par un militaire pour les militaires, l'interface respecte les standards opérationnels tout en restant
          intuitive et moderne.
        </p>
      </div>
    </section>

    <!-- Privacy & Security Section -->
    <section class="mb-12">
      <h2 class="font-bold mb-4 text-2xl">Confidentialité et sécurité</h2>
      <div class="max-w-none mb-6 prose prose-muted">
        <p>
          Vos données sont précieuses et sensibles. C'est pourquoi le projet a été conçu avec un accent particulier sur
          la simplicité et la sécurité :
        </p>
      </div>

      <div class="gap-6 grid md:grid-cols-3">
        <div class="flex gap-3 items-start">
          <Icon name="lucide:hard-drive" size="20" class="dark:text-green-400 flex-shrink-0 mt-0.5 text-green-600" />
          <div>
            <h3 class="font-semibold mb-1">Stockage 100% local</h3>
            <p class="text-muted-foreground text-sm">
              Toutes les données restent sur votre appareil. Aucune transmission externe.
            </p>
          </div>
        </div>

        <div class="flex gap-3 items-start">
          <Icon name="lucide:shield-check" size="20" class="dark:text-blue-400 flex-shrink-0 mt-0.5 text-blue-600" />
          <div>
            <h3 class="font-semibold mb-1">Aucun tracking</h3>
            <p class="text-muted-foreground text-sm">Seules les statistiques de visite anonymes via Umami.</p>
          </div>
        </div>

        <div class="flex gap-3 items-start">
          <Icon name="lucide:eye-off" size="20" class="dark:text-purple-400 flex-shrink-0 mt-0.5 text-purple-600" />
          <div>
            <h3 class="font-semibold mb-1">Fonctionnement hors ligne</h3>
            <p class="text-muted-foreground text-sm">L'application fonctionne sans connexion internet.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Source Section -->
    <section class="mb-12">
      <h2 class="font-bold mb-4 text-2xl">Open Source</h2>
      <div class="max-w-none mb-6 prose prose-muted">
        <p>
          Le code source est entièrement disponible et transparent. Vous pouvez l'examiner, le modifier ou contribuer
          aux améliorations.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 mb-6">
        <Link variant="secondary" href="https://github.com/ArtyomInc/swiss-army-presence-controller" target="_blank">
          <Icon name="lucide:github" size="16" />
          Code source du projet
        </Link>
        <Link variant="secondary" href="https://arduc.ch" target="_blank">
          <Icon name="lucide:user" size="16" />
          À propos du développeur
        </Link>
      </div>
    </section>

    <!-- Technical Stack Section -->
    <section class="mb-12">
      <h2 class="font-bold mb-4 text-2xl">Technologies utilisées</h2>
      <div class="max-w-none mb-6 prose prose-muted">
        <p>L'application utilise des technologies web modernes pour garantir performance et compatibilité :</p>
      </div>

      <div class="gap-4 grid grid-cols-2 md:grid-cols-4">
        <div class="bg-card border p-4 rounded-lg text-center">
          <Icon name="lucide:code" size="24" class="mb-2 mx-auto text-green-500" />
          <h3 class="font-semibold text-sm">Vue 3</h3>
        </div>
        <div class="bg-card border p-4 rounded-lg text-center">
          <Icon name="lucide:zap" size="24" class="mb-2 mx-auto text-blue-500" />
          <h3 class="font-semibold text-sm">Nuxt 3</h3>
        </div>
        <div class="bg-card border p-4 rounded-lg text-center">
          <Icon name="lucide:palette" size="24" class="mb-2 mx-auto text-purple-500" />
          <h3 class="font-semibold text-sm">Tailwind CSS</h3>
        </div>
        <div class="bg-card border p-4 rounded-lg text-center">
          <Icon name="lucide:database" size="24" class="mb-2 mx-auto text-orange-500" />
          <h3 class="font-semibold text-sm">LocalStorage</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link';

useSeoMeta({
  description:
    'Découvrez Swiss Army Presence Controller, une solution open source et gratuite pour la gestion des présences militaires. Sécurisé, local et transparent.',
  title: 'About - Presence Controller'
})
</script>

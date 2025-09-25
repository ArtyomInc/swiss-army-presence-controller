<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Swiss Army Presence Controller
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Gérez facilement les présences de vos groupes et sections militaires lors des rentrées en service.
            Gratuit, open source et conçu pour simplifier vos opérations.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/controller">
                <Icon name="lucide:play-circle" size="20" class="mr-2" />
                Commencer maintenant
            </Link>
            <Link href="/about">
                <Icon name="lucide:info" size="20" class="mr-2" />
                En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Fonctionnalités principales
          </h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour gérer efficacement les présences de vos équipes.
          </p>
        </div>

        <div class="space-y-16">
          <!-- Feature 1 -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="flex items-center gap-3 mb-4">
                <Icon name="lucide:layers" size="32" class="text-primary" />
                <h3 class="text-2xl md:text-3xl font-bold">Configuration des sections</h3>
              </div>
              <p class="text-lg text-muted-foreground mb-6">
                Créez et organisez facilement vos sections militaires avec une interface intuitive. Ajoutez, supprimez et gérez vos groupes en quelques clics.
              </p>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                <span>Configuration rapide et flexible</span>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <NuxtImg
                src="/pictures/create_sections.png"
                alt="Création de sections"
                class="w-full rounded-xl shadow-2xl border border-border"
              />
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <NuxtImg
                src="/pictures/add_presence.png"
                alt="Ajout de présence"
                class="w-full rounded-xl shadow-2xl border border-border"
              />
            </div>
            <div>
              <div class="flex items-center gap-3 mb-4">
                <Icon name="lucide:user-plus" size="32" class="text-primary" />
                <h3 class="text-2xl md:text-3xl font-bold">Enregistrement rapide</h3>
              </div>
              <p class="text-lg text-muted-foreground mb-6">
                Ajoutez rapidement les présences avec les informations essentielles :
                nom, prénom, section et statut du livret de service. Interface optimisée pour la saisie rapide.
              </p>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Saisie rapide et intuitive</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Validation automatique</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="flex items-center gap-3 mb-4">
                <Icon name="lucide:users" size="32" class="text-primary" />
                <h3 class="text-2xl md:text-3xl font-bold">Vue d'ensemble claire</h3>
              </div>
              <p class="text-lg text-muted-foreground mb-6">
                Visualisez toutes les présences par section avec tri et statistiques détaillées.
                Interface claire et professionnelle pour une gestion optimale.
              </p>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Tri par nom, section ou date</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Statistiques en temps réel</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Export et gestion avancée</span>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <NuxtImg
                src="/pictures/manage_presence_in_sections_views.png"
                alt="Gestion des présences"
                class="w-full rounded-xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link';

useSeoMeta({
  description: 'Application gratuite et open source pour gérer facilement les présences de vos sections militaires. Interface moderne, stockage local sécurisé.',
  title: 'Swiss Army Presence Controller - Gestion des présences militaires',
})
</script>

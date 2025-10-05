<template>
  <div class="-mx-5 min-h-screen md:-mx-10">
    <section class="px-4 py-20 text-center md:px-10">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-8">
          <div
            class="bg-primary/10 font-medium gap-2 inline-flex items-center mb-6 px-3 py-1 rounded-full text-primary text-sm"
          >
            <Icon name="lucide:shield-check" size="14" />
            100% Open Source
          </div>
          <h1
            class="bg-clip-text bg-gradient-to-r font-bold from-primary mb-6 md:text-6xl text-4xl text-transparent to-primary/60"
          >
            Swiss Army Presence Controller
          </h1>
          <p class="max-w-3xl mb-8 md:text-2xl mx-auto text-muted-foreground text-xl">
            Gérez facilement les présences de vos groupes et sections militaires lors des rentrées en service. Gratuit
            et open source.
          </p>
          <div class="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/controller">
              <Icon name="lucide:play-circle" size="20" />
              Commencer maintenant
            </Link>
            <Link href="/about">
              <Icon name="lucide:info" size="20" />
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-20 md:px-10">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-16 text-center">
          <h2 class="font-bold mb-4 md:text-4xl text-3xl">Fonctionnalités principales</h2>
          <p class="max-w-2xl mx-auto text-muted-foreground text-xl">
            Tout ce dont vous avez besoin pour gérer efficacement les présences de vos groupes ou sections.
          </p>
        </div>

        <div class="space-y-16">
          <div class="gap-12 grid items-center lg:grid-cols-2">
            <div class="lg:order-1 order-2">
              <div class="flex gap-3 items-center mb-4">
                <Icon name="lucide:layers" size="32" class="text-primary" />
                <h3 class="font-bold md:text-3xl text-2xl">Configuration des sections</h3>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Créez et organisez facilement vos sections militaires avec une interface intuitive. Ajoutez, supprimez
                et gérez vos groupes en quelques clics.
              </p>
              <div class="flex gap-2 items-center text-muted-foreground text-sm">
                <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                <span>Configuration rapide et flexible</span>
              </div>
            </div>
            <div class="lg:order-2 order-1">
              <NuxtImg
                src="/pictures/create_sections.png"
                alt="Création de sections"
                class="border border-border rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>

          <div class="gap-12 grid items-center lg:grid-cols-2">
            <div>
              <NuxtImg
                src="/pictures/add_presence.png"
                alt="Ajout de présence"
                class="border border-border rounded-xl shadow-2xl w-full"
              />
            </div>
            <div>
              <div class="flex gap-3 items-center mb-4">
                <Icon name="lucide:user-plus" size="32" class="text-primary" />
                <h3 class="font-bold md:text-3xl text-2xl">Enregistrement rapide</h3>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Ajoutez rapidement les présences avec les informations essentielles : nom, prénom, section et statut du
                livret de service. Interface optimisée pour la saisie rapide.
              </p>
              <div class="space-y-2">
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Saisie rapide et intuitive</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Validation automatique</span>
                </div>
              </div>
            </div>
          </div>

          <div class="gap-12 grid items-center lg:grid-cols-2">
            <div class="lg:order-1 order-2">
              <div class="flex gap-3 items-center mb-4">
                <Icon name="lucide:users" size="32" class="text-primary" />
                <h3 class="font-bold md:text-3xl text-2xl">Vue d'ensemble claire</h3>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Visualisez toutes les présences par section avec tri et statistiques. Interface claire et
                professionnelle pour une gestion optimale.
              </p>
              <div class="space-y-2">
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Tri par nom, section ou date</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Statistiques en temps réel</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Export et gestion avancée</span>
                </div>
              </div>
            </div>
            <div class="lg:order-2 order-1">
              <NuxtImg
                src="/pictures/manage_presence_in_sections_views.png"
                alt="Gestion des présences"
                class="border border-border rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'

useSeoMeta({
  description:
    'Application gratuite et open source pour gérer facilement les présences de vos sections militaires. Interface moderne, stockage local sécurisé.',
  title: 'Swiss Army Presence Controller'
})
</script>

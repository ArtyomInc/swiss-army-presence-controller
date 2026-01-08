<template>
  <div class="-mx-5 md:-mx-10 min-h-screen">
    <section class="md:px-10 px-4 py-20 text-center">
      <div class="max-w-screen-xl mx-auto">
        <div class="mb-8">
          <div class="flex flex-wrap gap-2 justify-center mb-4">
            <div
              class="bg-primary/10 font-medium gap-2 inline-flex items-center px-3 py-1 rounded-full text-primary text-sm"
            >
              <Icon name="lucide:shield-check" size="14" />
              100% Open Source
            </div>
            <div
              class="bg-primary/10 font-medium gap-2 inline-flex items-center px-3 py-1 rounded-full text-primary text-sm"
            >
              <Icon name="lucide:server-off" size="14" />
              Aucune donnée n'est collectée
            </div>
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
            <Link href="/ajouter-presence" class="justify-center">
              <Icon name="lucide:play-circle" size="20" />
              Commencer maintenant
            </Link>
            <Link href="/a-propos">
              <Icon name="lucide:info" size="20" />
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section class="md:px-10 px-4 py-20">
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
                <Icon name="lucide:clipboard-check" size="32" class="text-primary" />
                <h3 class="font-bold md:text-3xl text-2xl">Enregistrement des présences</h3>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Tracez facilement l'arrivée de votre compagnie lors des rentrées en service. Enregistrez les
                informations essentielles et consultez les statistiques en temps réel par section.
              </p>
              <div class="space-y-2">
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Saisie rapide (nom, prénom, section, grade)</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Possession du livret de service</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Statistiques en temps réel par section</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Export Excel pour rapports</span>
                </div>
              </div>
            </div>
            <div class="lg:order-2 order-1">
              <ImageZoomable
                src="/pictures/manage_presence_in_sections_views.png"
                alt="Enregistrement des présences"
                class="border border-border rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>

          <div class="gap-12 grid items-center lg:grid-cols-2">
            <div>
              <ImageZoomable
                src="/pictures/add_presence_with_autocompletion.png"
                alt="Fonctionnalités avancées"
                class="border border-border rounded-lg shadow-2xl w-full"
              />
            </div>
            <div>
              <div class="flex gap-3 items-center mb-4">
                <Icon name="lucide:sparkles" size="32" class="text-primary" />
                <h3 class="font-bold md:text-3xl text-2xl">Fonctionnalités avancées</h3>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Importez votre liste de soldat depuis Excel pour débloquer des fonctionnalités avancées : autocomplétion
                lors de la saisie et détection automatique des absences.
              </p>
              <div class="space-y-2">
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Import Excel de votre liste de soldat</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Autocomplétion des noms lors de la saisie</span>
                </div>
              </div>
            </div>
          </div>

          <div class="gap-12 grid items-center lg:grid-cols-2">
            <div class="lg:order-1 order-2">
              <div class="flex flex-col gap-2 mb-4">
                <div class="flex gap-3 items-center">
                  <Icon name="lucide:user-x" size="32" class="text-primary" />
                  <h3 class="font-bold md:text-3xl text-2xl">Suivi des absences</h3>
                </div>
                <div
                  class="bg-primary/10 font-medium gap-2 inline-flex items-center px-3 py-1 rounded-full text-primary text-xs w-fit"
                >
                  <Icon name="lucide:sparkles" size="12" />
                  Nécessite l'import de la liste des soldats
                </div>
              </div>
              <p class="mb-6 text-lg text-muted-foreground">
                Identifiez automatiquement qui n'est pas entré en service en comparant votre liste de soldat importée
                avec les présences enregistrées. Idéal pour les rapports d'effectifs.
              </p>
              <div class="space-y-2">
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Vue d'ensemble des absents</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Tri par nom ou section</span>
                </div>
                <div class="flex gap-2 items-center text-muted-foreground text-sm">
                  <Icon name="lucide:check-circle" size="16" class="text-green-500" />
                  <span>Statistiques détaillées par section</span>
                </div>
              </div>
            </div>
            <div class="lg:order-2 order-1">
              <ImageZoomable
                src="/pictures/absences.png"
                alt="Suivi des absences"
                class="border border-border rounded-lg shadow-2xl w-full"
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
  description:
    'Application gratuite et open source pour gérer facilement les présences de vos sections militaires. Interface moderne, stockage local sécurisé.',
  title: 'Swiss Army Presence Controller'
})
</script>

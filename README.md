# Swiss Army Presence Controller

Une application web moderne et sécurisée pour la gestion des présences militaires lors de l'entrée en service.

## 🚀 Technologies Utilisées

### Framework & Core

- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js full-stack avec SSR/SSG
- **[Bun](https://bun.sh/)** - Runtime JavaScript ultra-rapide

### UI & Styling

- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn Vue](https://www.shadcn-vue.com/)** - Composants UI accessibles réutilisables
- **[Nuxt Icon](https://nuxt.com/modules/icon)** - Icônes avec Iconify (Lucide)

### Utilitaires

- **[Nuxt Color Mode](https://color-mode.nuxtjs.org/)** - Mode sombre/clair automatique
- **[Nuxt Image](https://image.nuxt.com/)** - Optimisation d'images

### Qualité du Code

- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formateur de code

## 📦 Installation

Installer les dépendances :

```bash
bun install
```

## 🛠️ Développement

Démarrer le serveur de développement sur `http://localhost:3000` :

```bash
bun run dev
```

Le script de dev inclut automatiquement le linting et le formatage.

## 🏗️ Production

Construire l'application pour la production :

```bash
bun run build
```

Prévisualiser le build de production localement :

```bash
bun run preview
```

## 🔧 Scripts Disponibles

- `bun run dev` - Lance le serveur de dev avec lint et format
- `bun run build` - Build pour la production
- `bun run generate` - Génère un site statique
- `bun run preview` - Prévisualise le build de production
- `bun run lint` - Vérifie le code avec ESLint
- `bun run lint:fix` - Corrige automatiquement les erreurs de lint
- `bun run format` - Formate le code avec Prettier
- `bun run format:check` - Vérifie le formatage sans modifier

## 💾 Stockage des Données

Les données sont stockées localement dans le **LocalStorage** du navigateur :

- `presence-people` - Liste des personnes enregistrées (les sections sont dérivées automatiquement)
- `person-references` - Liste de référence du personnel

Aucune donnée n'est envoyée à un serveur externe.

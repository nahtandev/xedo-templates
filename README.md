# Xedo Templates

> Bibliothèque de templates e-commerce prêts à l'emploi, propulsés par [Xedo](https://xedoapp.com) comme backend headless.

Chaque template est une application **Next.js** complète — catalogue, panier, checkout, confirmation — connectée à l'API Xedo via [`@xedo/sdk`](https://www.npmjs.com/package/@xedo/sdk). Déployez sur **Vercel** en quelques minutes, personnalisez en éditant un seul fichier.

---

## Pourquoi Xedo Templates ?

- **Zéro backend à gérer** — produits, commandes, paiements : tout est dans votre dashboard Xedo.
- **Une seule config à toucher** — `xedo.config.ts` à la racine de chaque template.
- **Déployable en un clic** sur Vercel.
- **Open-source** — code lisible, modifiable, sans dépendance propriétaire.

---

## Templates disponibles

### 🆓 Gratuits

| Template | Description | Stack |
|---|---|---|
| [T01 — Boutique Généraliste](./templates/t01-boutique-generale) | Boutique e-commerce minimaliste, catalogue + checkout — [démo live](https://xedo-t01-boutique-generale.vercel.app/) | Next.js, Tailwind, @xedo/sdk |
| [T04 — Menu Restaurant](./templates/t04-menu-restaurant) | Menu en ligne pour restaurant ou snack, commande directe | Next.js, Tailwind, @xedo/sdk |

### ⭐ Premium — Bientôt disponibles

| Template | Description |
|---|---|
| T02 — Boutique Mode | Catalogue mode avec variations dynamiques (taille, couleur) |
| T03 — Boutique Beauté | Produits cosmétiques, galerie enrichie, variations |
| T05 — Dark Kitchen | Livraison en ligne avec zones et options de personnalisation |
| T06 — Prestataire Services | Catalogue de prestations, commande simplifiée |
| T07 — Landing SaaS | One-page de vente avec checkout intégré |
| T08 — Marketplace Vendeur Unique | Catalogue large, multi-collections, suivi commande |

---

## Stack commune

- **[Next.js 16](https://nextjs.org)** — App Router, Turbopack, Server Actions
- **[Tailwind CSS v4](https://tailwindcss.com)** + design system maison **`@xedo/ui`**
- **[`@xedo/sdk` v0.2.3](https://www.npmjs.com/package/@xedo/sdk)** — client officiel Xedo
- **[Zustand](https://zustand-demo.pmnd.rs)** — état client (panier)
- **[Zod v4](https://zod.dev)** — validation des formulaires
- **[pnpm](https://pnpm.io)** — package manager (monorepo workspaces)

---

## Prérequis

- Node.js ≥ 18
- pnpm ≥ 10
- Un compte [Xedo](https://xedoapp.com) avec une clé API (`xdk_live_...`)

---

## Démarrage rapide

```bash
# Cloner le repo
git clone https://github.com/nahtandev/xedo-templates.git
cd xedo-templates

# Installer les dépendances
pnpm install

# Choisir un template et configurer la clé API
cd templates/t01-boutique-generale
cp .env.local.example .env.local
# Éditer .env.local : XEDO_API_KEY=xdk_live_...

# Lancer en dev
pnpm dev
```

Ou depuis la racine du monorepo :

```bash
pnpm dev:t01   # Boutique Généraliste
pnpm dev:t04   # Menu Restaurant
```

---

## Personnalisation

Chaque template expose un fichier `xedo.config.ts` à sa racine — c'est le **seul fichier à éditer** pour adapter le template à votre activité :

```ts
// xedo.config.ts
export const config = {
  storeName:    'Ma Boutique',
  storeTagline: 'Les meilleurs produits, livrés chez vous.',
  primaryColor: '#C97520',
  accentColor:  '#E8922A',
  // ...
};
```

---

## Déploiement sur Vercel

1. Forker ou cloner ce repo
2. Importer le dossier du template choisi sur [vercel.com](https://vercel.com)
3. Ajouter la variable d'environnement `XEDO_API_KEY` dans les settings Vercel
4. Déployer

> ⚠️ La clé `XEDO_API_KEY` ne doit jamais apparaître dans le bundle client.
> Tous les appels SDK sont effectués côté serveur (Server Components / Server Actions).

---

## Structure du monorepo

```
xedo-templates/
├── packages/
│   ├── ui/              # Design system partagé (tokens, polices, composants)
│   └── sdk-hooks/       # Hooks React autour de @xedo/sdk (en cours)
├── templates/
│   ├── t01-boutique-generale/
│   └── t04-menu-restaurant/
└── ...
```

---

## Contribuer

Les templates sont open-source. Les contributions sont les bienvenues :
- Corrections de bugs
- Améliorations UI/UX
- Traductions
- Nouveaux templates (ouvrir une issue d'abord)

---

## Liens utiles

- [Documentation Xedo Developer API](https://developers.xedoapp.com)
- [`@xedo/sdk` sur npm](https://www.npmjs.com/package/@xedo/sdk)
- [Xedo Business Dashboard](https://business.xedoapp.com)

---

## Auteur

Conçu et développé par **Nathan Gnankadja** — Full Stack Web Developer (focus backend : NestJS, Express, RESTful & GraphQL APIs ; NextJS & React côté front).

[![GitHub](https://img.shields.io/badge/GitHub-nahtandev-181717?logo=github&logoColor=white)](https://github.com/nahtandev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nathan%20Gnankadja-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nathan-gnankadja)
[![Site](https://img.shields.io/badge/Site-nathan.xdo.app-C97520?logo=safari&logoColor=white)](https://nathan.xdo.app)

> Une question, une idée d'amélioration ou besoin d'un template sur-mesure ? N'hésitez pas à me contacter.

---

## Licence

MIT — voir [LICENSE](./LICENSE)

---

<p align="center">
  Conçu et développé avec ☕ par <a href="https://github.com/nahtandev"><b>@nahtandev</b></a> &amp; <a href="https://claude.com/claude-code">Claude Code</a> 🤖
</p>
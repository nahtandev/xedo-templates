# T01 — Boutique Généraliste

> Template e-commerce minimaliste pour toute boutique vendant des produits physiques.
> Niveau : 🆓 **Gratuit** | [Xedo Templates](../../README.md)

---

## Ce que fait ce template

Une boutique e-commerce complète connectée à votre catalogue Xedo :

- 🛍️ Catalogue avec recherche et filtres par collection
- 📄 Fiche produit avec galerie d'images
- 🛒 Panier persistant (localStorage via Zustand)
- 💳 Checkout complet via Xedo (redirect vers page de paiement)
- ✅ Page de confirmation de commande

---

## Pages incluses

| Route | Description |
|---|---|
| `/` | Accueil — hero, atouts (livraison, paiement, local), produits |
| `/catalogue` | Catalogue avec recherche et filtres |
| `/produits/[slug]` | Fiche produit |
| `/checkout` | Récap panier + formulaire client |
| `/confirmation` | Confirmation post-paiement |

---

## Features

| Feature | Inclus |
|---|---|
| Catalogue produits | ✅ |
| Recherche (≥ 3 caractères) | ✅ |
| Filtre par collection | ✅ |
| Checkout Xedo intégré | ✅ |
| Livraison par zones / retrait en boutique | ✅ |
| Responsive mobile | ✅ |
| Déployable sur Vercel | ✅ |
| Variations dynamiques (taille, couleur…) | ❌ |
| Suivi commande | ❌ |

> Les features marquées ❌ sont disponibles dans les templates **Premium**.

---

## Stack

- **Next.js 16** — App Router, Turbopack, Server Actions
- **Tailwind CSS v4** + design system maison **`@xedo/ui`**
- **`@xedo/sdk` v0.2.2** — tous les appels API côté serveur
- **Zustand** — état panier côté client
- **Zod v4** — validation formulaire checkout

---

## Prérequis

- Node.js ≥ 18
- pnpm ≥ 10
- Un compte [Xedo](https://xedoapp.com) avec une clé API (`xdk_live_...`)

---

## Installation

```bash
# Depuis la racine du monorepo
pnpm install

# Depuis ce dossier
cd templates/t01-boutique-generale
cp .env.local.example .env.local
```

Éditer `.env.local` :

```
XEDO_API_KEY=xdk_live_...
```

---

## Démarrage

```bash
# Depuis ce dossier
pnpm dev

# Ou depuis la racine du monorepo
pnpm dev:t01
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Personnalisation

Éditer `xedo.config.ts` à la racine du template :

```ts
export const config = {
  // Identité de la boutique
  storeName:    'Ma Boutique',
  storeTagline: 'Les meilleurs produits, livrés chez vous.',

  // Couleurs (optionnel — défaut : palette ocre Xedo)
  primaryColor: '#C97520',
  accentColor:  '#E8922A',

  // SEO
  metaTitle:       'Ma Boutique | Accueil',
  metaDescription: 'Découvrez notre catalogue de produits.',
};
```

> Aucune autre modification de code n'est nécessaire pour un lancement basique.

---

## Déploiement sur Vercel

1. Importer ce dossier sur [vercel.com](https://vercel.com) (ou le repo entier en spécifiant `templates/t01-boutique-generale` comme root directory)
2. Ajouter la variable d'environnement :
   ```
   XEDO_API_KEY = xdk_live_...
   ```
3. Déployer

> ⚠️ **Sécurité** : `XEDO_API_KEY` ne doit jamais apparaître côté client.
> Tous les appels `@xedo/sdk` sont dans des Server Components ou Server Actions.

---

## Structure du template

```
t01-boutique-generale/
├── app/
│   ├── layout.tsx           # Layout global (fonts, metadata)
│   ├── page.tsx             # Accueil
│   ├── catalogue/
│   │   └── page.tsx         # Catalogue paginé
│   ├── produits/
│   │   └── [slug]/
│   │       └── page.tsx     # Fiche produit
│   ├── checkout/
│   │   └── page.tsx         # Panier + formulaire
│   └── confirmation/
│       └── page.tsx         # Confirmation commande
├── components/              # Composants spécifiques au template
├── store/
│   └── cart.ts              # État panier (Zustand, persistant)
├── lib/
│   ├── xedo.ts              # Instance SDK (server-side)
│   ├── catalog.ts           # Accès données produits / collections
│   ├── actions.ts           # Server Actions (preview + checkout)
│   ├── env.ts               # Variables d'environnement
│   ├── format.ts            # Formatage prix / texte
│   └── types.ts             # Types view-model
├── xedo.config.ts           # ← Seul fichier à éditer
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Liens utiles

- [Documentation Xedo Developer API](https://developers.xedoapp.com)
- [`@xedo/sdk` sur npm](https://www.npmjs.com/package/@xedo/sdk)
- [Tous les templates](../../README.md)

---

<p align="center">
  <sub>Un template <a href="../../README.md">Xedo Templates</a> · par <a href="https://github.com/nahtandev"><b>@nahtandev</b></a> &amp; <a href="https://claude.com/claude-code">Claude Code</a> 🤖</sub>
</p>
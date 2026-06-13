# T04 — Menu Restaurant

> Template pour restaurant, snack ou maquis avec menu en ligne et commande directe.
> Niveau : 🆓 **Gratuit** | [Xedo Templates](../../README.md)

---

## Ce que fait ce template

Un site de commande en ligne complet pour votre restaurant, connecté à votre catalogue Xedo. Les collections Xedo deviennent vos catégories de menu (Entrées, Plats, Desserts…), les produits deviennent vos plats.

- 🍽️ Menu organisé par catégories (collections Xedo)
- 📄 Fiche plat avec description et prix
- 🛒 Panier flottant (FAB) + tiroir de commande
- 💳 Commande en ligne via Xedo — sur place, à emporter ou livraison
- ✅ Page de confirmation de commande

---

## Pages incluses

| Route | Description |
|---|---|
| `/` | Accueil — hero, plats à la une, catégories, infos pratiques |
| `/menu` | Menu complet par catégories (onglets sticky, filtrage) |
| `/menu/[slug]` | Fiche plat + suggestions de la même catégorie |
| `/commande` | Récap commande + coordonnées + mode de retrait |
| `/confirmation` | Confirmation post-paiement |
| `/contact` | Adresse, téléphone, horaires |

---

## Features

| Feature | Inclus |
|---|---|
| Menu organisé par catégories | ✅ |
| Plats à la une (collection configurable) | ✅ |
| Commande sur place / à emporter | ✅ |
| Livraison par zones | ✅ *(si zones configurées dans Xedo)* |
| Checkout Xedo intégré | ✅ |
| Panier flottant (FAB) + tiroir | ✅ |
| Infos pratiques (horaires, adresse, téléphone) | ✅ |
| Responsive mobile | ✅ |
| Déployable sur Vercel | ✅ |
| Variations (portions, options supplémentaires) | ❌ |
| Suivi commande temps réel | ❌ |

> Les features marquées ❌ sont disponibles dans **T05 — Dark Kitchen** (Premium).

---

## Stack

- **Next.js 16** — App Router, Turbopack, Server Actions
- **Tailwind CSS v4** + design system maison **`@xedo/ui`**
- **`@xedo/sdk` v0.2.3** — tous les appels API côté serveur
- **Zustand** — état panier côté client (persistant)
- **Zod v4** — validation formulaire commande

---

## Prérequis

- Node.js ≥ 18
- pnpm ≥ 10
- Un compte [Xedo](https://xedoapp.com) avec une clé API (`xdk_live_...`)

---

## Comment structurer votre catalogue Xedo

Ce template fonctionne mieux avec la structure suivante dans votre dashboard Xedo :

| Xedo | Correspond à |
|---|---|
| **Collections** | Catégories du menu (Entrées, Plats, Desserts, Boissons…) |
| **Produits** | Plats individuels |
| **Description produit** | Description du plat (ingrédients, allergènes…) |
| **Prix produit** | Prix du plat |
| **Image produit** | Photo du plat (cover) |
| **Zones de livraison** *(optionnel)* | Active l'option « Livraison » au checkout |

> La section **« À la une »** de l'accueil tire ses plats de la collection indiquée par `featuredCollection` dans `xedo.config.ts`. Si elle est absente ou vide, le template retombe sur les plats les plus récents.

---

## Installation

```bash
# Depuis la racine du monorepo
pnpm install

# Depuis ce dossier
cd templates/t04-menu-restaurant
cp .env.local.example .env.local
```

Éditer `.env.local` :

```
XEDO_API_KEY=xdk_live_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Démarrage

```bash
# Depuis ce dossier
pnpm dev

# Ou depuis la racine du monorepo
pnpm dev:t04
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Personnalisation

Éditer `xedo.config.ts` à la racine du template :

```ts
export const config = {
  // Identité du restaurant
  storeName:    'Le Maquis Digital',
  storeTagline: 'Cuisine maison, commandez en ligne.',

  // Couleurs (optionnel — défaut : palette ocre Xedo)
  primaryColor: '#C97520',
  accentColor:  '#E8922A',

  // Collection mise en avant dans « À la une » (fallback : plats récents)
  featuredCollection: 'plats',

  // Icône par catégorie (clés d'icônes — voir components/icons.tsx)
  categoryIcons: {
    entrees: 'Leaf', plats: 'Flame', accompagnements: 'Bowl',
    desserts: 'Cookie', boissons: 'Cup',
  },
  defaultCategoryIcon: 'Bowl',

  // Infos pratiques (accueil, footer, page contact)
  openingHours: 'Lun–Sam : 11h–22h · Dim : 12h–20h',
  address:      'Carrefour Cadjèhoun, Cotonou, Bénin',
  phone:        '+229 21 30 40 50',

  // SEO
  metaTitle:       'Le Maquis Digital | Commander en ligne',
  metaDescription: 'Commandez vos plats préférés en ligne — préparés minute.',
};
```

> Aucune autre modification de code n'est nécessaire pour un lancement basique.

---

## Déploiement sur Vercel

1. Importer ce dossier sur [vercel.com](https://vercel.com) (ou le repo entier en spécifiant `templates/t04-menu-restaurant` comme root directory)
2. Ajouter les variables d'environnement :
   ```
   XEDO_API_KEY = xdk_live_...
   NEXT_PUBLIC_SITE_URL = https://votre-domaine.com
   ```
3. Déployer

> ⚠️ **Sécurité** : `XEDO_API_KEY` ne doit jamais apparaître côté client.
> Tous les appels `@xedo/sdk` sont dans des Server Components ou Server Actions.

---

## Structure du template

```
t04-menu-restaurant/
├── app/
│   ├── layout.tsx           # Layout global (fonts, header, footer, panier)
│   ├── page.tsx             # Accueil
│   ├── menu/
│   │   ├── page.tsx         # Menu complet par catégories
│   │   └── [slug]/
│   │       └── page.tsx     # Fiche plat
│   ├── commande/
│   │   └── page.tsx         # Coordonnées + mode de retrait
│   ├── confirmation/
│   │   └── page.tsx         # Confirmation commande
│   └── contact/
│       └── page.tsx         # Infos pratiques
├── components/              # Header, Footer, CartFab, FoodRow, FeatureCard,
│                            # MenuBrowser, DishDetail, CheckoutForm, icons…
├── store/
│   └── cart.ts              # État panier (Zustand, persistant)
├── lib/
│   ├── xedo.ts              # Instance SDK (server-side)
│   ├── catalog.ts           # Accès données plats / catégories
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

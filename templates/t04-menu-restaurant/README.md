# T04 — Menu Restaurant

> Template pour restaurant, snack ou maquis avec menu en ligne et commande directe.
> Niveau : 🆓 **Gratuit** | [Xedo Templates](../../README.md)

![Menu Restaurant](../../packages/ui/src/assets/previews/t04-desktop.png)

---

## Ce que fait ce template

Un site de commande en ligne complet pour votre restaurant, connecté à votre catalogue Xedo. Les collections Xedo deviennent vos catégories de menu (Entrées, Plats, Desserts…), les produits deviennent vos plats.

- 🍽️ Menu organisé par catégories (collections Xedo)
- 📄 Fiche plat avec description et prix
- 🛒 Panier flottant (FAB mobile-friendly)
- 💳 Commande en ligne via Xedo (sur place ou à emporter)
- ✅ Page de confirmation de commande

---

## Pages incluses

| Route | Description |
|---|---|
| `/` | Accueil — hero, spécialités, catégories, infos pratiques |
| `/menu` | Menu complet par catégories (onglets sticky) |
| `/menu/[slug]` | Fiche plat |
| `/commande` | Récap commande + formulaire client |
| `/confirmation` | Confirmation post-paiement |

---

## Features

| Feature | Inclus |
|---|---|
| Menu organisé par catégories | ✅ |
| Commande en ligne (sur place / à emporter) | ✅ |
| Checkout Xedo intégré | ✅ |
| Panier flottant (FAB) | ✅ |
| Infos pratiques (horaires, adresse, téléphone) | ✅ |
| Responsive mobile | ✅ |
| Déployable sur Vercel | ✅ |
| Variations (portions, options supplémentaires) | ❌ |
| Livraison à domicile par zones | ❌ |
| Suivi commande | ❌ |

> Les features marquées ❌ sont disponibles dans **T05 — Dark Kitchen** (Premium).

---

## Stack

- **Next.js 16** — App Router, Turbopack, Server Actions
- **Tailwind CSS v4** + **shadcn/ui**
- **`@xedo/sdk` v0.2.2** — tous les appels API côté serveur
- **Zustand** — état panier côté client
- **Zod v4** — validation formulaire commande

---

## Prérequis

- Node.js ≥ 18
- pnpm ≥ 9
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
| **Image produit** | Photo du plat |

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

  // Infos pratiques (affichées sur la page d'accueil)
  openingHours: 'Lun–Sam : 11h–22h | Dim : 12h–20h',
  address:      'Cotonou, Bénin',
  phone:        '+229 XX XX XX XX',

  // SEO
  metaTitle:       'Le Maquis Digital | Commander en ligne',
  metaDescription: 'Commandez vos plats préférés en ligne.',
};
```

> Aucune autre modification de code n'est nécessaire pour un lancement basique.

---

## Déploiement sur Vercel

1. Importer ce dossier sur [vercel.com](https://vercel.com) (ou le repo entier en spécifiant `templates/t04-menu-restaurant` comme root directory)
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
t04-menu-restaurant/
├── app/
│   ├── layout.tsx           # Layout global (fonts, metadata)
│   ├── page.tsx             # Accueil
│   ├── menu/
│   │   ├── page.tsx         # Menu complet par catégories
│   │   └── [slug]/
│   │       └── page.tsx     # Fiche plat
│   ├── commande/
│   │   └── page.tsx         # Panier + formulaire commande
│   └── confirmation/
│       └── page.tsx         # Confirmation commande
├── components/              # Composants spécifiques au template
├── lib/
│   └── xedo.ts              # Instance SDK (server-side)
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
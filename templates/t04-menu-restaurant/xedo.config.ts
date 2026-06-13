export const config = {
  // Identité du restaurant
  storeName: 'Le Maquis Digital',
  storeTagline: 'Cuisine maison, commandez en ligne.',

  // Couleurs (optionnel — défaut : palette ocre Xedo)
  primaryColor: '#C97520',
  accentColor: '#E8922A',

  // Accueil — slug de la collection mise en avant dans « À la une ».
  // Si la collection est absente / vide, on retombe sur les plats les plus récents.
  featuredCollection: 'plats',

  // Icône affichée pour chaque catégorie (clé d'icône — voir components/icons.tsx).
  // Les collections non listées utilisent defaultCategoryIcon.
  categoryIcons: {
    entrees: 'Leaf',
    plats: 'Flame',
    accompagnements: 'Bowl',
    desserts: 'Cookie',
    boissons: 'Cup',
  } as Record<string, string>,
  defaultCategoryIcon: 'Bowl',

  // Infos pratiques (page Contact, footer, accueil)
  openingHours: 'Lun–Sam : 11h–22h · Dim : 12h–20h',
  address: 'Carrefour Cadjèhoun, Cotonou, Bénin',
  phone: '+229 21 30 40 50',

  // SEO
  metaTitle: 'Le Maquis Digital | Commander en ligne',
  metaDescription: 'Commandez vos plats préférés en ligne — préparés minute.',
} as const;

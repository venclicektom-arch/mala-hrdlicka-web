import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  // VLASTNÍ VZHLED MENU A HLAVIČKY
  ui: {
    brand: {
      name: 'Malá Hrdlička | Administrace',
    },
    navigation: {
      'Správa Galerie': ['galleryCategories', 'gallery'],
      // Až budeme mít ceník, přidáme sem třeba:
      // 'Správa Ceníku': ['cenikTydenni', 'cenikVikend']
    },
  },

  collections: {
    // 1. KOLEKCE: Kategorie fotek (Sekce)
    galleryCategories: collection({
      label: '1. Kategorie fotek (Sekce)', // Očíslováno pro snadnější pochopení
      slugField: 'title',
      path: 'src/content/galleryCategories/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Název sekce (např. Chatky, Areál)' } }),
      },
    }),

    // 2. KOLEKCE: Samotné fotky
    gallery: collection({
      label: '2. Samotné fotografie', // Očíslováno
      slugField: 'title',
      path: 'src/content/gallery/*',
      format: { data: 'json' },

      // TENTO ŘÁDEK PŘIDÁ ZOBRAZENÍ SEKCE DO TABULKY (umožní vyhledávání/filtraci)
      columns: ['category'],

      schema: {
        title: fields.slug({ name: { label: 'Název fotky' } }),

        // Propojení na kategorie výše
        category: fields.relationship({
          label: 'Zařadit do sekce',
          collection: 'galleryCategories',
          validation: { isRequired: true },
        }),

        image: fields.image({
          label: 'Fotografie',
          directory: 'src/assets/images/gallery',
          publicPath: '../../assets/images/gallery/',
          validation: { isRequired: true },
        }),
        alt: fields.text({ label: 'Popis pro nevidomé (alt text)', defaultValue: 'Fotografie ubytování' }),
      },
    }),
  },
});

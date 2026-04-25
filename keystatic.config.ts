import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'Malá Hrdlička | Administrace',
    },
    navigation: {
      FOTOGALERIE: ['gallery'],
    },
  },

  collections: {
    gallery: collection({
      label: 'Správa sekcí galerie',
      slugField: 'title',
      path: 'src/content/gallery/*',
      format: { data: 'json' },

      schema: {
        title: fields.slug({
          name: {
            label: 'Název sekce',
            description: 'Zadejte název, který se zobrazí na webu (např. Apartmány, Chatky).',
          },
        }),

        // 1. PŘIDÁNO: Číselné pole pro pořadí
        order: fields.integer({
          label: 'Pořadí sekce na webu',
          description: 'Napište číslo (např. 1, 2, 3...). Podle tohoto čísla se sekce seřadí na webu.',
          defaultValue: 1,
          validation: { min: 1 }, // TÍMTO ZAKÁŽEME NULU A MÍNUSOVÁ ČÍSLA
        }),

        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Vybrat fotografii',
              directory: 'src/assets/images/gallery',
              publicPath: '../../assets/images/gallery/',
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: 'Popis fotografie',
              description: 'Krátce popište, co je na fotce (např. Pohled na ložnici). Pomáhá to lidem se zrakovým postižením a vyhledávačům.',
              defaultValue: 'Fotografie ubytování',
            }),
          }),
          {
            label: 'Seznam fotografií v této sekci',
            itemLabel: (props) => props.fields.alt.value || 'Nová fotografie',
            description: 'Zde můžete přidávat, odebírat nebo měnit pořadí fotek v této sekci.',
          },
        ),
      },
    }),
  },
});

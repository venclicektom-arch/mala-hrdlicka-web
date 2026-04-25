import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().min(1).default(1),
      images: z.array(
        z.object({
          image: image(),
          alt: z.string(),
        }),
      ),
    }),
});

const cenik = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cenik' }),
  schema: z.object({
    tydenniPobyty: z
      .array(
        z.object({
          nazev: z.string(),
          popis: z.string(),
          sezona1: z.string(),
          sezona2: z.string(),
          sezona3: z.string(),
          nejzadanejsi: z.boolean(),
        }),
      )
      .default([]),
    vikendovePobyty: z
      .array(
        z.object({
          nazev: z.string(),
          cena: z.string(),
          doba: z.string(),
          podminka: z.string(),
          ikona: z.string(),
        }),
      )
      .default([]),
    doplnkoveSluzby: z
      .array(
        z.object({
          nazev: z.string(),
          cena: z.string(),
          jednotka: z.string(),
          popis: z.string(),
          highlight: z.boolean(),
          ikona: z.string(),
        }),
      )
      .default([]),
    stornopodminky: z
      .array(
        z.object({
          dny: z.string(),
          procenta: z.string(),
          popis: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { gallery, cenik };

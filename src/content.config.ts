import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),

      // PŘIDÁNO .min(1)
      order: z.number().min(1).default(1),

      images: z.array(
        z.object({
          image: image(),
          alt: z.string(),
        }),
      ),
    }),
});

export const collections = { gallery };

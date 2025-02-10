import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        readingTime: z.number(),
        slug: z.string(),
        cover: z.string(),
        updatedAt: z.date(),
      }),
    }),
  },
});

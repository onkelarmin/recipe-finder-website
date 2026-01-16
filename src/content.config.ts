import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const recipes = defineCollection({
  loader: file("src/data/data.json"),
  schema: ({ image }) =>
    z.object({
      id: z.number(),
      title: z.string(),
      slug: z.string(),
      image: z.object({
        large: image(),
        small: image(),
      }),
      overview: z.string(),
      servings: z.number(),
      prepMinutes: z.number(),
      cookMinutes: z.number(),
      ingredients: z.array(z.string()),
      instructions: z.array(z.string()),
    }),
});

export const collections = { recipes };

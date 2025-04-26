import { z } from 'zod';

export const pokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    weight: z.number(),
    height: z.number(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

import { z } from 'zod';

export const jokeSchema = z.object({
  error: z.boolean(),
  id: z.number(),
  joke: z.string(),
  category: z.string(),
});

export type Joke = z.infer<typeof jokeSchema>;
export type JokeAudit = Joke & { numUpdates: number };

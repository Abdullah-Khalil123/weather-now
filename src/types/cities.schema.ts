import z from 'zod';

const citySchema = z.object({
  id: z.number(),
  country: z.string(),
  lat: z.float32(),
  lon: z.float32(),
  name: z.string(),
  region: z.string(),
  url: z.string(),
});

export type City = z.infer<typeof citySchema>;

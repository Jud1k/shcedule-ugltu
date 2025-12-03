import z from 'zod';

export const nullableString = (schema: z.ZodString | z.ZodEmail) =>
  z.preprocess((val) => (val === '' ? null : val), schema.nullable());

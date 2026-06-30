// schemas/search.schemas.js

import { z } from "zod";

export const productSearchSchema = z.object({

  search: z.string().min(1), 

  category: z.string().min(1).optional(),

  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(10),

  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1)
});



export const searchSuggestionsSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, "Debe ingresar al menos 2 caracteres")
    .max(50, "La búsqueda es demasiado larga"),
});
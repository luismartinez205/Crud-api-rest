import { z } from "zod";

/**
 * Esquema de validación de productos usando Zod.
 * Equivalente al JSON Schema (producto-schema.json), pensado
 * para validar datos en runtime dentro de un proyecto TS/Node
 * (API routes, formularios, importación de catálogos, etc).
 */

export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().min(1),
});

export const PriceSchema = z.object({
  current: z.number().min(0),
  old: z.number().min(0).optional(),
  discount: z.number().min(0).max(100).optional(),
  currency: z.string().regex(/^[A-Z]{3}$/, "Código de moneda inválido (ISO 4217, ej. USD)"),
});

export const TaxSchema = z.object({
  taxable: z.boolean().optional(),
  taxClass: z.string().optional(),
});

export const SeoSchema = z.object({
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});

export const WarrantySchema = z.object({
  duration: z.number().int().min(0).optional(),
  unit: z.enum(["dias", "meses", "anos"]).optional(),
});

export const ShippingSchema = z.object({
  weight: z
    .object({
      value: z.number().min(0).optional(),
      unit: z.enum(["kg", "g", "lb"]).optional(),
    })
    .optional(),
  dimensions: z
    .object({
      length: z.number().min(0).optional(),
      width: z.number().min(0).optional(),
      height: z.number().min(0).optional(),
      unit: z.enum(["cm", "in"]).optional(),
    })
    .optional(),
  free: z.boolean(),
});

export const VariantSchema = z.object({
  sku: z.string().min(1),
  color: z.string().optional(),
  size: z.string().optional(),
  stock: z.number().int().min(0),
  image: z.string().url().optional(),
  price: z.number().min(0).optional(),
});

export const ProductSchema = z
  .object({
    id: z.string().uuid(),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "El slug debe ser kebab-case"),
    sku: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    brand: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.enum(["draft", "published", "archived"]),
    isActive: z.boolean(),
    featured: z.boolean().optional(),
    condition: z.enum(["nuevo", "usado", "reacondicionado"]).optional(),
    barcode: z.string().regex(/^[0-9]{8,14}$/).optional(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().int().min(0).optional(),
    createdAt: z.string().datetime().nullable().optional(),
    updatedAt: z.string().datetime().nullable().optional(),
    seo: SeoSchema.optional(),
    price: PriceSchema,
    tax: TaxSchema.optional(),
    specs: z.record(z.string(), z.any()).optional(),
    warranty: WarrantySchema.optional(),
    shipping: ShippingSchema,
    colors: z.array(z.string()).optional(),
    images: z.array(ImageSchema).min(1),
    availability: z.enum(["disponible", "agotado", "preventa", "descontinuado"]),
    stock: z.number().int().min(0),
    minOrderQuantity: z.number().int().min(1).optional(),
    maxOrderQuantity: z.number().int().min(1).optional(),
    variants: z.array(VariantSchema).min(1),
    relatedProducts: z.array(z.string().uuid()).optional(),
  })
  // Validación extra: el stock total debe coincidir con la suma de las variantes
  .refine(
    (data) => data.stock === data.variants.reduce((sum, v) => sum + v.stock, 0),
    {
      message: "El stock total no coincide con la suma del stock de las variantes",
      path: ["stock"],
    }
  );

export const ProductListSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

/**
 * Ejemplo de uso:
 *
 * import productosData from "./producto-corregido.json";
 *
 * const result = ProductListSchema.safeParse(productosData);
 *
 * if (!result.success) {
 *   console.error(result.error.format());
 * } else {
 *   console.log("Catálogo válido:", result.data);
 * }
 */
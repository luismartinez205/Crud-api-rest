import { z } from 'zod';

export const getOrdersSchema = z.object({
  status: z.string().optional(),
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().optional()
});

export const orderIdSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const createOrderSchema = z.object({
  customerId: z.number(),
  total: z.number().positive(),
  products: z.array(z.object({
    productId: z.number(),
    quantity: z.number().positive()
  }))
});

export const updateOrderSchema = z.object({
  status: z.enum([
    'pending',
    'processing',
    'shipped',
    'delivered'
  ]).optional()
});


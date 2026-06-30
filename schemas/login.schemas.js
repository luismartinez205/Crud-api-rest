import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});



export const registerSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es requerido'),
  mail: z.string().trim().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  adress: z.string().optional(),
  phone: z.string().optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], {
    errorMap: () => ({ message: 'Estado inválido. Debe ser: pending, processing, shipped, delivered o cancelled' })
  })
});
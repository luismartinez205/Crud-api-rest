import { z } from 'zod';

export const getUsersSchema = z.object({
  name: z.string().optional(),
  role: z.enum(['admin', 'user']).optional(),
  page: z.coerce.number().positive().optional()
});

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).default('user')
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.email().optional(),
  role: z.enum(['admin', 'user']).optional()
});




export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "La contraseña actual es requerida"),

    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .max(50, "La contraseña es demasiado larga"),

    confirmPassword: z
      .string()
      .min(1, "Debe confirmar la nueva contraseña"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );

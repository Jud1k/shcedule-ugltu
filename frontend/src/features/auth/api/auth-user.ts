import z from 'zod';

export const registerFormSchema = z
  .object({
    email: z.email('Введите корректный email'),
    password: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .max(32, 'Пароль не должен содержать более 32 символов'),
    repeat_password: z.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    error: 'Пароли не совпадают',
    path: ['repeat_password'],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.email('Введите корректный email'),
  password: z.string().min(5, 'Пароль должен содержать минимум 5 символов'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

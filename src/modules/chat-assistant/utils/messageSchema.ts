import { z } from 'zod';

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(500, 'Mensagem muito longa'),
});

export type MessageFormData = z.infer<typeof messageSchema>;

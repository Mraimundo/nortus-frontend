import { z } from 'zod';

export const ticketSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(['Baixa', 'Média', 'Alta', 'Urgente']),
  status: z.enum(['Aberto', 'Em andamento', 'Resolvido']),
  assignedTo: z.string(),
  createdAt: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  subject: z.string().optional(),
});

export const createTicketSchema = z.object({
  clientName: z
    .string()
    .min(2, 'O nome do cliente deve ter no mínimo 2 caracteres.')
    .max(100, 'O nome do cliente deve ter no máximo 100 caracteres.')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços'),

  email: z
    .string()
    .email('Digite um e-mail válido')
    .min(1, 'O e-mail é obrigatório'),

  priority: z.enum(['Baixa', 'Média', 'Alta', 'Urgente'] as const, {
    error: 'A prioridade é obrigatória',
  }),

  responsible: z.string().min(1, 'Selecione o responsável pelo ticket.'),

  subject: z
    .string()
    .min(5, 'O assunto deve ter pelo menos 10 caracteres')
    .max(200, 'O assunto deve ter no máximo 500 caracteres'),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

import { v4 as uuidv4 } from 'uuid';
import { Filters, Ticket } from '../store/useTicketStore';

export const DEFAULT_FILTERS: Filters = {
  status: 'Todos os status',
  priority: 'Todas as prioridades',
  assignedTo: 'Todos os responsáveis',
  searchTerm: '',
};

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: uuidv4(),
    title: 'Solicitação de alteração',
    description: 'Cliente deseja alterar cobertura.',
    priority: 'Urgente',
    status: 'Aberto',
    assignedTo: 'Ana Silva',
    createdAt: '2024-12-14T09:00:00Z',
    clientName: 'Ricardo Leite',
    clientEmail: 'ricardo@email.com',
  },
  {
    id: uuidv4(),
    title: 'Dúvida sobre cobertura',
    description: 'Cliente tem dúvidas sobre limite de cobertura.',
    priority: 'Média',
    status: 'Aberto',
    assignedTo: 'João Costa',
    createdAt: '2024-12-13T10:30:00Z',
    clientName: 'Maria Silva',
    clientEmail: 'mariasilva@email.com',
  },
  {
    id: uuidv4(),
    title: 'Sinistro na residência',
    description: 'Relato de sinistro por vazamento.',
    priority: 'Baixa',
    status: 'Em andamento',
    assignedTo: 'Carlos Lima',
    createdAt: '2024-12-13T14:00:00Z',
    clientName: 'João Costa',
    clientEmail: 'costajoao@email.com',
  },
  {
    id: uuidv4(),
    title: 'Seguro residencial',
    description: 'Contratação de seguro residencial.',
    priority: 'Urgente',
    status: 'Aberto',
    assignedTo: 'Anderson Freitas',
    createdAt: '2024-12-12T08:15:00Z',
    clientName: 'Residencial Premium',
    clientEmail: 'rpremium@email.com',
  },
  {
    id: uuidv4(),
    title: 'Dúvida sobre combo automóvel e residencial',
    description: 'Cliente quer entender benefícios do combo.',
    priority: 'Média',
    status: 'Aberto',
    assignedTo: 'Ana Silva',
    createdAt: '2024-12-09T16:45:00Z',
    clientName: 'Família Total',
    clientEmail: 'familiatotal@email.com',
  },
];

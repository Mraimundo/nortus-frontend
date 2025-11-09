import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_FILTERS, INITIAL_TICKETS } from '../utils/constants';
import { ticketSchema } from '../utils/schema';

export type Ticket = ReturnType<typeof ticketSchema.parse>;

export interface Filters {
  status: string;
  priority: string;
  assignedTo: string;
  searchTerm: string;
}

export interface TicketStore {
  tickets: Ticket[];
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>) => void;
  updateTicket: (id: string, ticket: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  getFilteredTickets: () => Ticket[];
}

const getCookieStorage = () => ({
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return value ? decodeURIComponent(value.split('=')[1]) : null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    const expires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
});

const normalize = (str?: string) => (str ?? '').toLowerCase();

const matchesFilter = (ticket: Ticket, filters: Filters): boolean => {
  const { status, priority, assignedTo, searchTerm } = filters;
  const search = normalize(searchTerm);

  const statusMatch = status === 'Todos os status' || ticket.status === status;
  const priorityMatch =
    priority === 'Todas as prioridades' || ticket.priority === priority;
  const assignedMatch =
    assignedTo === 'Todos os responsáveis' || ticket.assignedTo === assignedTo;

  const searchMatch =
    !search ||
    [ticket.id, ticket.clientName, ticket.clientEmail, ticket.title].some(
      (field) => normalize(field).includes(search),
    );

  return statusMatch && priorityMatch && assignedMatch && searchMatch;
};

export const useTicketStore = create<TicketStore>()(
  persist(
    immer((set, get) => ({
      tickets: INITIAL_TICKETS,
      filters: DEFAULT_FILTERS,

      setFilters: (filters) =>
        set((state) => {
          state.filters = { ...state.filters, ...filters };
        }),

      addTicket: (ticketData) =>
        set((state) => {
          state.tickets.unshift({
            ...ticketData,
            id: uuidv4(),
            status: 'Aberto',
            createdAt: new Date().toISOString(),
          });
        }),

      updateTicket: (id, updatedData) =>
        set((state) => {
          const ticket = state.tickets.find((t) => t.id === id);
          if (ticket) Object.assign(ticket, updatedData);
        }),

      deleteTicket: (id) =>
        set((state) => {
          state.tickets = state.tickets.filter((t) => t.id !== id);
        }),

      getFilteredTickets: () =>
        get().tickets.filter((ticket) => matchesFilter(ticket, get().filters)),
    })),
    {
      name: 'ticket-storage',
      storage: createJSONStorage(getCookieStorage),
      partialize: (state) => ({ tickets: state.tickets }),
      version: 1,
    },
  ),
);

import { describe, it, expect, beforeEach } from 'vitest';
import { useTicketStore } from './useTicketStore';
import { act } from '@testing-library/react';

describe('useTicketStore', () => {
  beforeEach(() => {
    useTicketStore.setState((state) => ({
      tickets: [],
      filters: {
        status: 'Todos os status',
        priority: 'Todas as prioridades',
        assignedTo: 'Todos os responsáveis',
        searchTerm: '',
      },
    }));
  });

  it('should be able to added a new ticket correctly.', () => {
    act(() => {
      useTicketStore.getState().addTicket({
        title: 'Novo Ticket',
        description: 'Teste de criação',
        priority: 'Alta',
        assignedTo: 'Mouzinho',
        clientName: 'Cliente Teste',
        clientEmail: 'cliente@teste.com',
      });
    });

    const { tickets } = useTicketStore.getState();
    expect(tickets).toHaveLength(1);
    expect(tickets[0].title).toBe('Novo Ticket');
    expect(tickets[0].status).toBe('Aberto');
  });

  it('It should be possible to delete an existing ticket.', () => {
    const { addTicket, deleteTicket } = useTicketStore.getState();

    act(() => {
      addTicket({
        title: 'Ticket para exclusão',
        description: 'Será removido',
        priority: 'Baixa',
        assignedTo: 'Ana',
        clientName: 'Teste',
        clientEmail: 'teste@email.com',
      });
    });

    const id = useTicketStore.getState().tickets[0].id;

    act(() => {
      deleteTicket(id);
    });

    const { tickets } = useTicketStore.getState();
    expect(tickets).toHaveLength(0);
  });

  it('should be able to return correctly filtered tickets.', () => {
    const { addTicket, setFilters, getFilteredTickets } =
      useTicketStore.getState();

    act(() => {
      addTicket({
        title: 'Ticket Urgente',
        description: 'Problema grave',
        priority: 'Urgente',
        assignedTo: 'Mouzinho',
        clientName: 'Carlos',
        clientEmail: 'carlos@email.com',
      });

      addTicket({
        title: 'Ticket Normal',
        description: 'Problema leve',
        priority: 'Baixa',
        assignedTo: 'Ana',
        clientName: 'Maria',
        clientEmail: 'maria@email.com',
      });
    });

    act(() => {
      setFilters({ priority: 'Urgente' });
    });

    const filtered = getFilteredTickets();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].priority).toBe('Urgente');
  });

  it('should be able to filter correctly by the search term.', () => {
    const { addTicket, setFilters, getFilteredTickets } =
      useTicketStore.getState();

    act(() => {
      addTicket({
        title: 'Atendimento Residencial',
        description: 'Cliente quer suporte',
        priority: 'Média',
        assignedTo: 'Pedro',
        clientName: 'Roberto',
        clientEmail: 'roberto@email.com',
      });

      addTicket({
        title: 'Suporte Automotivo',
        description: 'Cliente com dúvidas sobre apólice',
        priority: 'Alta',
        assignedTo: 'Ana',
        clientName: 'Lucas',
        clientEmail: 'lucas@email.com',
      });
    });

    act(() => {
      setFilters({ searchTerm: 'Residencial' });
    });

    const result = getFilteredTickets();
    expect(result).toHaveLength(1);
    expect(result[0].title).toContain('Residencial');
  });
});

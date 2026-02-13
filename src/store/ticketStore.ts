import { create } from 'zustand';
import type { Ticket, TicketFilters, PaginationMeta } from '../interfaces';

interface TicketStore {
  tickets: Ticket[];
  filters: TicketFilters;
  pagination: PaginationMeta;
  isLoading: boolean;
  error: string | null;

  setTickets: (tickets: Ticket[]) => void;
  setPagination: (pagination: PaginationMeta) => void;
  setFilters: (filters: Partial<TicketFilters>) => void;
  resetFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: number, ticket: Ticket) => void;
  removeTicket: (id: number) => void;
}

const initialFilters: TicketFilters = {
  subject: '',
  priority: 'all',
  status: 'all',
  sort_by: 'created_at',
  sort_dir: 'desc',
};

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  filters: initialFilters,
  pagination: {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  },
  isLoading: false,
  error: null,

  setTickets: (tickets) => set({ tickets }),

  setPagination: (pagination) => set({ pagination }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, current_page: 1 }, 
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1,
      },
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  addTicket: (ticket) =>
    set((state) => ({
      tickets: [ticket, ...state.tickets],
    })),

  updateTicket: (id, updatedTicket) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? updatedTicket : ticket
      ),
    })),

  removeTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    })),
}));
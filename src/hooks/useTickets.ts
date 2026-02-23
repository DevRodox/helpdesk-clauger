import { useCallback } from 'react';
import { useTicketStore } from '../store/ticketStore';
import { ticketAPI } from '../services';
import type { TicketFormData, ApiError } from '../interfaces';
import { DEFAULT_PER_PAGE } from '../utils';

export const useTickets = () => {
  const {
    tickets,
    filters,
    pagination,
    isLoading,
    error,
    setTickets,
    setPagination,
    setLoading,
    setError,
    addTicket,
    updateTicket,
    removeTicket,
  } = useTicketStore();

  const fetchTickets = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const currentFilters = useTicketStore.getState().filters;
        
        const params: Record<string, unknown> = {
          page,
          per_page: DEFAULT_PER_PAGE,
        };

        if (currentFilters.subject) params.search = currentFilters.subject;
        if (currentFilters.priority && currentFilters.priority !== 'all') params.priority = currentFilters.priority;
        if (currentFilters.status && currentFilters.status !== 'all') params.status = currentFilters.status;
        if (currentFilters.sort_by) params.sort_by = currentFilters.sort_by;
        if (currentFilters.sort_dir) params.sort_dir = currentFilters.sort_dir;

        const response = await ticketAPI.getAll(params);

        setTickets(response.data.items);
        setPagination(response.data.meta);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Error al cargar tickets');
      } finally {
        setLoading(false);
      }
    },
    [setTickets, setPagination, setLoading, setError],
  );

  const createTicket = useCallback(
    async (data: TicketFormData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await ticketAPI.create(data);
        addTicket(response.data);
        await fetchTickets(1);
        return { success: true, data: response.data };
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Error al crear ticket');
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [addTicket, fetchTickets, setLoading, setError],
  );

  const editTicket = useCallback(
    async (id: number, data: Partial<TicketFormData>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await ticketAPI.update(id, data);
        updateTicket(id, response.data);
        return { success: true, data: response.data };
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Error al actualizar ticket');
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [updateTicket, setLoading, setError],
  );

  const deleteTicket = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);

      try {
        await ticketAPI.delete(id);
        removeTicket(id);
        return { success: true };
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Error al eliminar ticket');
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [removeTicket, setLoading, setError],
  );

  const getTicketById = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await ticketAPI.getById(id);
        return { success: true, data: response.data };
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Error al obtener ticket');
        return { success: false, error: apiError.message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  return {
    tickets,
    filters,
    pagination,
    isLoading,
    error,
    fetchTickets,
    createTicket,
    editTicket,
    deleteTicket,
    getTicketById,
  };
};
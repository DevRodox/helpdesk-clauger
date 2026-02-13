import { useCallback } from 'react';
import { ticketAPI } from '../services/api';
import { useTicketStore } from '../store/ticketStore';
import type { TicketFormData, ApiError } from '../interfaces';
import { DEFAULT_PER_PAGE } from '../utils/constants';

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
    async (page: number = pagination.current_page) => {
      setLoading(true);
      setError(null);

      try {
        const params: Record<string, unknown> = {
          page,
          per_page: DEFAULT_PER_PAGE,
        };

        if (filters.subject) params.subject = filters.subject;
        if (filters.priority && filters.priority !== 'all')
          params.priority = filters.priority;
        if (filters.status && filters.status !== 'all')
          params.status = filters.status;
        if (filters.sort_by) params.sort_by = filters.sort_by;
        if (filters.sort_dir) params.sort_dir = filters.sort_dir;

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
    [
      filters,
      pagination.current_page,
      setTickets,
      setPagination,
      setLoading,
      setError,
    ]
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
    [addTicket, fetchTickets, setLoading, setError]
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
    [updateTicket, setLoading, setError]
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
    [removeTicket, setLoading, setError]
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
    [setLoading, setError]
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
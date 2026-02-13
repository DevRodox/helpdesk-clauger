import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../utils';
import type {
  ApiError,
  TicketListResponse,
  Ticket,
  TicketFormData,
  BackendErrorResponse,
} from '../interfaces';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<BackendErrorResponse>) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';

    const formattedError: ApiError = {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(formattedError);
  },
);

export const ticketAPI = {
  getAll: (params: Record<string, unknown> = {}): Promise<TicketListResponse> => {
    return api.get('/tickets', { params });
  },

  getById: (id: number): Promise<{ success: boolean; data: Ticket }> => {
    return api.get(`/tickets/${id}`);
  },

  create: (ticketData: TicketFormData): Promise<{ success: boolean; data: Ticket }> => {
    return api.post('/tickets', ticketData);
  },

  update: (
    id: number,
    ticketData: Partial<TicketFormData>,
  ): Promise<{ success: boolean; data: Ticket }> => {
    return api.put(`/tickets/${id}`, ticketData);
  },

  delete: (id: number): Promise<{ success: boolean }> => {
    return api.delete(`/tickets/${id}`);
  },

  getPriorities: (): Promise<{
    success: boolean;
    data: { value: string; label: string }[];
  }> => {
    return api.get('/tickets/priorities');
  },

  getStatuses: (): Promise<{
    success: boolean;
    data: { value: string; label: string }[];
  }> => {
    return api.get('/tickets/statuses');
  },
};

export default api;

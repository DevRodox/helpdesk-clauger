export type Priority = 'low' | 'medium' | 'high';

export type Status = 'pending' | 'in_progress' | 'resolved';

export interface Ticket {
  id: number;
  subject: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TicketFormData {
  subject: string;
  priority: Priority;
  status: Status;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface TicketListResponse {
  success: boolean;
  data: {
    items: Ticket[];
    meta: PaginationMeta;
  };
  message: string;
  code: number;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

export interface BackendErrorResponse {
  success: boolean;
  data: unknown;
  message: string;
  code: number;
}

export interface TicketFilters {
  subject?: string;
  priority?: Priority | 'all';
  status?: Status | 'all';
  sort_by?: 'subject' | 'created_at' | 'priority' | 'status';
  sort_dir?: 'asc' | 'desc';
}

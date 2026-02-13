import type { Priority, Status } from '../interfaces';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const BACKEND_TO_FRONTEND_PRIORITY: Record<string, Priority> = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

export const BACKEND_TO_FRONTEND_STATUS: Record<string, Status> = {
  Pending: 'pending',
  'In Progress': 'in_progress',
  Resolved: 'resolved',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  medium:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export const STATUS_LABELS: Record<Status, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  resolved: 'Resuelto',
};

export const STATUS_COLORS: Record<Status, string> = {
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  in_progress:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export const DEFAULT_PER_PAGE = 10;
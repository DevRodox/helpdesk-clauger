import type { Priority, Status } from '../interfaces';
import { BACKEND_TO_FRONTEND_PRIORITY, BACKEND_TO_FRONTEND_STATUS } from './constants';

export const normalizePriority = (priority: string): Priority => {
  return BACKEND_TO_FRONTEND_PRIORITY[priority] || 'medium';
};

export const normalizeStatus = (status: string): Status => {
  return BACKEND_TO_FRONTEND_STATUS[status] || 'pending';
};
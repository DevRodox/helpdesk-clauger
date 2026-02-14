import { Badge } from '../ui';
import { normalizePriority, normalizeStatus } from '../../utils';
import { useLanguage } from '../../hooks';
import type { Ticket, Status } from '../../interfaces';

interface Props {
  tickets: Ticket[];
  isLoading: boolean;
  onTicketClick: (id: number) => void;
}

export const TicketTable = ({ tickets, isLoading, onTicketClick }: Props) => {
  const { t } = useLanguage();

  const getStatusIcon = (status: Status) => {
    const icons = {
      pending: 'schedule',
      in_progress: 'autorenew',
      resolved: 'check_circle',
    };
    return icons[status] || 'circle';
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">{t.tickets.loadingTickets}</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
        <span className="material-icons text-gray-400 text-5xl">inbox</span>
        <p className="mt-4 text-gray-500 dark:text-gray-400">{t.tickets.noTickets}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.tickets.subject}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.tickets.priority}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.tickets.status}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.tickets.createdAt}
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.common.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const normalizedPriority = normalizePriority(ticket.priority);
              const normalizedStatus = normalizeStatus(ticket.status);

              return (
                <tr
                  key={ticket.id}
                  className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                    #{ticket.id}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      type="priority"
                      value={normalizedPriority}
                      label={t.priority[normalizedPriority]}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      type="status"
                      value={normalizedStatus}
                      label={t.status[normalizedStatus]}
                      icon={getStatusIcon(normalizedStatus)}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {ticket.created_at}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => onTicketClick(ticket.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      aria-label={t.tickets.viewDetails}
                    >
                      <span className="material-icons text-sm">more_horiz</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
        {tickets.map((ticket) => {
          const normalizedPriority = normalizePriority(ticket.priority);
          const normalizedStatus = normalizeStatus(ticket.status);

          return (
            <div
              key={ticket.id}
              onClick={() => onTicketClick(ticket.id)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      #{ticket.id}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {ticket.subject}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTicketClick(ticket.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={t.tickets.viewDetails}
                >
                  <span className="material-icons text-xl">chevron_right</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  type="priority"
                  value={normalizedPriority}
                  label={t.priority[normalizedPriority]}
                />
                <Badge
                  type="status"
                  value={normalizedStatus}
                  label={t.status[normalizedStatus]}
                  icon={getStatusIcon(normalizedStatus)}
                />
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {ticket.created_at}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
import { SearchInput, Select, Button } from '../ui';
import { useTicketStore } from '../../store/ticketStore';
import { useLanguage } from '../../hooks';

interface Props {
  onCreateClick: () => void;
}

export const TicketFilters = ({ onCreateClick }: Props) => {
  const { filters, setFilters } = useTicketStore();
  const { t } = useLanguage();

  const priorityOptions = [
    { value: 'all', label: t.priority.all },
    { value: 'low', label: t.priority.low },
    { value: 'medium', label: t.priority.medium },
    { value: 'high', label: t.priority.high },
  ];

  const statusOptions = [
    { value: 'all', label: t.status.all },
    { value: 'pending', label: t.status.pending },
    { value: 'in_progress', label: t.status.in_progress },
    { value: 'resolved', label: t.status.resolved },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="w-full lg:hidden">
        <SearchInput
          placeholder={t.tickets.searchPlaceholder}
          value={filters.subject || ''}
          onChange={(e) => setFilters({ subject: e.target.value })}
          onClear={() => setFilters({ subject: '' })}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="hidden lg:block flex-1 max-w-xs">
            <SearchInput
              placeholder={t.tickets.searchPlaceholder}
              value={filters.subject || ''}
              onChange={(e) => setFilters({ subject: e.target.value })}
              onClear={() => setFilters({ subject: '' })}
            />
          </div>

          <div className="flex gap-3 flex-1 sm:flex-initial">
            <Select
              options={priorityOptions}
              value={filters.priority || 'all'}
              onChange={(e) =>
                setFilters({
                  priority: e.target.value as 'low' | 'medium' | 'high' | 'all',
                })
              }
              className="flex-1 sm:w-48"
            />

            <Select
              options={statusOptions}
              value={filters.status || 'all'}
              onChange={(e) =>
                setFilters({
                  status:
                    e.target.value as
                      | 'pending'
                      | 'in_progress'
                      | 'resolved'
                      | 'all',
                })
              }
              className="flex-1 sm:w-48"
            />
          </div>
        </div>

        <Button 
          variant="primary" 
          icon="add" 
          onClick={onCreateClick}
          className="w-full sm:w-auto"
        >
          <span className="hidden sm:inline">{t.tickets.createTicket}</span>
          <span className="sm:hidden">{t.common.create}</span>
        </Button>
      </div>
    </div>
  );
};
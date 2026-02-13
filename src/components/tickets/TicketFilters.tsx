import { SearchInput, Select, Button } from '../ui';
import { useTicketStore } from '../../store/ticketStore';
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
} from '../../utils';

interface Props {
  onCreateClick: () => void;
}

export const TicketFilters = ({ onCreateClick }: Props) => {
  const { filters, setFilters } = useTicketStore();

  const priorityOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'low', label: PRIORITY_LABELS.low },
    { value: 'medium', label: PRIORITY_LABELS.medium },
    { value: 'high', label: PRIORITY_LABELS.high },
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: STATUS_LABELS.pending },
    { value: 'in_progress', label: STATUS_LABELS.in_progress },
    { value: 'resolved', label: STATUS_LABELS.resolved },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="w-full lg:hidden">
        <SearchInput
          placeholder="Buscar por asunto..."
          value={filters.subject || ''}
          onChange={(e) => setFilters({ subject: e.target.value })}
          onClear={() => setFilters({ subject: '' })}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="hidden lg:block flex-1 max-w-xs">
            <SearchInput
              placeholder="Buscar por asunto..."
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
          <span className="hidden sm:inline">Crear Ticket</span>
          <span className="sm:hidden">Crear</span>
        </Button>
      </div>
    </div>
  );
};
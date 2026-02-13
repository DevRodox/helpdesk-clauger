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
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 flex-1">
        <SearchInput
          placeholder="Buscar por asunto..."
          value={filters.subject || ''}
          onChange={(e) => setFilters({ subject: e.target.value })}
          onClear={() => setFilters({ subject: '' })}
          className="w-80"
        />

        <Select
          options={priorityOptions}
          value={filters.priority || 'all'}
          onChange={(e) =>
            setFilters({
              priority: e.target.value as 'low' | 'medium' | 'high' | 'all',
            })
          }
          className="w-48"
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
          className="w-48"
        />
      </div>

      <Button variant="primary" icon="add" onClick={onCreateClick}>
        Crear Ticket
      </Button>
    </div>
  );
};
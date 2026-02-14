import { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, PrioritySelector } from '../ui';
import { useTickets, useLanguage } from '../../hooks';
import { normalizePriority, normalizeStatus } from '../../utils';
import type { TicketFormData, Status, Ticket } from '../../interfaces';

interface Props {
  isOpen: boolean;
  ticketId: number | null;
  onClose: () => void;
  onSuccess: () => void;
  onDelete: () => void;
}

export const EditTicketModal = ({ isOpen, ticketId, onClose, onSuccess, onDelete }: Props) => {
  const { editTicket, getTicketById, isLoading } = useTickets();
  const { t } = useLanguage();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    priority: 'medium',
    status: 'pending',
  });

  const [errors, setErrors] = useState<{ subject?: string }>({});

  const statusOptions = [
    { value: 'pending', label: t.status.pending },
    { value: 'in_progress', label: t.status.in_progress },
    { value: 'resolved', label: t.status.resolved },
  ];

  useEffect(() => {
    const loadTicket = async () => {
      if (ticketId && isOpen) {
        const result = await getTicketById(ticketId);
        if (result.success && result.data) {
          setTicket(result.data);
          setFormData({
            subject: result.data.subject,
            priority: normalizePriority(result.data.priority),
            status: normalizeStatus(result.data.status),
          });
        }
      }
    };

    loadTicket();
  }, [ticketId, isOpen, getTicketById]);

  const validate = () => {
    const newErrors: { subject?: string } = {};

    if (!formData.subject.trim()) {
      newErrors.subject = t.tickets.subjectRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !ticketId) return;

    const result = await editTicket(ticketId, formData);

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setTicket(null);
    setFormData({ subject: '', priority: 'medium', status: 'pending' });
    setErrors({});
    onClose();
  };

  if (!ticket) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${t.tickets.editTicket} #${ticket.id}`}
      subtitle={t.tickets.editSubtitle}
      footer={
        <>
          <Button variant="danger" icon="delete" onClick={onDelete} disabled={isLoading}>
            {t.tickets.deleteTicketButton}
          </Button>
          <div className="flex-1" />
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            {t.common.cancel}
          </Button>
          <Button variant="primary" icon="save" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? t.tickets.saving : t.tickets.saveChanges}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-sm pb-4 border-b border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-sm">calendar_today</span>
            {t.tickets.created}: {ticket.created_at}
          </span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-sm">update</span>
            {t.tickets.updated}: {ticket.updated_at}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t.tickets.subject}
            placeholder={t.tickets.subjectPlaceholder}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            error={errors.subject}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PrioritySelector
              label={t.tickets.priority}
              value={formData.priority}
              onChange={(priority) => setFormData({ ...formData, priority })}
            />

            <Select
              label={t.tickets.status}
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

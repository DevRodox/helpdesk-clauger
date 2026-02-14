import { useState } from 'react';
import { Modal, Button, Input, Select, PrioritySelector } from '../ui';
import { useTickets, useLanguage } from '../../hooks';
import type { TicketFormData, Status } from '../../interfaces';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTicketModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { createTicket, isLoading } = useTickets();
  const { t } = useLanguage();

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

    if (!validate()) return;

    const result = await createTicket(formData);

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ subject: '', priority: 'medium', status: 'pending' });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t.tickets.createNew}
      subtitle={t.tickets.createSubtitle}
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            {t.common.cancel}
          </Button>
          <Button variant="primary" icon="save" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? t.tickets.saving : t.tickets.saveTicket}
          </Button>
        </>
      }
    >
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
    </Modal>
  );
};
import { useState } from 'react';
import { Modal, Button, Input, Select, PrioritySelector } from '../ui';
import { useTickets } from '../../hooks';
import { STATUS_LABELS } from '../../utils';
import type { TicketFormData, Status } from '../../interfaces';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTicketModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { createTicket, isLoading } = useTickets();

  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    priority: 'medium',
    status: 'pending',
  });

  const [errors, setErrors] = useState<{ subject?: string }>({});

  const statusOptions = [
    { value: 'pending', label: STATUS_LABELS.pending },
    { value: 'in_progress', label: STATUS_LABELS.in_progress },
    { value: 'resolved', label: STATUS_LABELS.resolved },
  ];

  const validate = () => {
    const newErrors: { subject?: string } = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
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
      title="Crear Nuevo Ticket"
      subtitle="Complete los detalles para registrar la incidencia."
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" icon="save" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Ticket'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Asunto"
          placeholder="Breve descripción del problema"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          error={errors.subject}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PrioritySelector
            label="Prioridad"
            value={formData.priority}
            onChange={(priority) => setFormData({ ...formData, priority })}
          />

          <Select
            label="Estado"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
          />
        </div>
      </form>
    </Modal>
  );
};

import { Modal, Button } from '../ui';
import { useTickets } from '../../hooks';

interface Props {
  isOpen: boolean;
  ticketId: number | null;
  ticketSubject?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteTicketModal = ({
  isOpen,
  ticketId,
  ticketSubject,
  onClose,
  onSuccess,
}: Props) => {
  const { deleteTicket, isLoading } = useTickets();

  const handleDelete = async () => {
    if (!ticketId) return;

    const result = await deleteTicket(ticketId);

    if (result.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Ticket"
      maxWidth="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="danger" icon="delete" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <span className="material-icons text-red-600 dark:text-red-400">
              warning
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              ¿Está seguro que desea eliminar este ticket?
            </p>
            {ticketSubject && (
              <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                "{ticketSubject}"
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
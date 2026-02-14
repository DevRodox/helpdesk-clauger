import { useEffect, useState } from 'react';
import { useTickets, useModal, useLanguage } from '../../hooks';
import {
  TicketFilters,
  TicketTable,
  Pagination,
  CreateTicketModal,
  EditTicketModal,
  DeleteTicketModal,
} from './';
import { Toast } from '../ui';

export const TicketsPage = () => {
  const { tickets, pagination, isLoading, fetchTickets } = useTickets();
  const { isOpen, modalType, selectedId, openModal, closeModal } = useModal();
  const { t } = useLanguage();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const [ticketToDelete, setTicketToDelete] = useState<{
    id: number;
    subject: string;
  } | null>(null);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handlePageChange = (page: number) => {
    fetchTickets(page);
  };

  const handleCreateTicket = () => {
    openModal('create');
  };

  const handleTicketClick = (id: number) => {
    openModal('edit', id);
  };

  const handleCreateSuccess = () => {
    setToast({
      show: true,
      message: t.tickets.ticketCreated,
      type: 'success',
    });
  };

  const handleEditSuccess = () => {
    setToast({
      show: true,
      message: t.tickets.ticketUpdated,
      type: 'success',
    });
  };

  const handleDeleteClick = () => {
    const ticket = tickets.find((t) => t.id === selectedId);
    if (ticket) {
      setTicketToDelete({ id: ticket.id, subject: ticket.subject });
      closeModal();
    }
  };

  const handleDeleteSuccess = () => {
    setTicketToDelete(null);
    setToast({
      show: true,
      message: t.tickets.ticketDeleted,
      type: 'success',
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          {t.tickets.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t.tickets.subtitle}
        </p>
      </div>

      <TicketFilters onCreateClick={handleCreateTicket} />

      <TicketTable tickets={tickets} isLoading={isLoading} onTicketClick={handleTicketClick} />

      {!isLoading && tickets.length > 0 && (
        <Pagination meta={pagination} onPageChange={handlePageChange} />
      )}

      <CreateTicketModal
        isOpen={isOpen && modalType === 'create'}
        onClose={closeModal}
        onSuccess={handleCreateSuccess}
      />

      <EditTicketModal
        isOpen={isOpen && modalType === 'edit'}
        ticketId={selectedId}
        onClose={closeModal}
        onSuccess={handleEditSuccess}
        onDelete={handleDeleteClick}
      />

      <DeleteTicketModal
        isOpen={!!ticketToDelete}
        ticketId={ticketToDelete?.id || null}
        ticketSubject={ticketToDelete?.subject}
        onClose={() => setTicketToDelete(null)}
        onSuccess={handleDeleteSuccess}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};
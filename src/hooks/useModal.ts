import { useState, useCallback } from 'react';

type ModalType = 'create' | 'edit' | 'delete' | null;

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = useCallback((type: ModalType, id?: number) => {
    setModalType(type);
    setSelectedId(id || null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setModalType(null);
      setSelectedId(null);
    }, 200);
  }, []);

  return {
    isOpen,
    modalType,
    selectedId,
    openModal,
    closeModal,
  };
};
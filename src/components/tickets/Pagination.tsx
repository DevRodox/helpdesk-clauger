import { Button } from '../ui';
import type { PaginationMeta } from '../../interfaces';

interface Props {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ meta, onPageChange }: Props) => {
  const { current_page, last_page, total, per_page } = meta;

  const startItem = (current_page - 1) * per_page + 1;
  const endItem = Math.min(current_page * per_page, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Mostrando <span className="font-medium">{startItem}</span> a{' '}
        <span className="font-medium">{endItem}</span> de{' '}
        <span className="font-medium">{total}</span> resultados
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
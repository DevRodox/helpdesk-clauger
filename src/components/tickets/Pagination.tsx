import { Button } from '../ui';
import { useLanguage } from '../../hooks';
import type { PaginationMeta } from '../../interfaces';

interface Props {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ meta, onPageChange }: Props) => {
  const { t } = useLanguage();
  const { current_page, last_page, total, per_page } = meta;

  const startItem = (current_page - 1) * per_page + 1;
  const endItem = Math.min(current_page * per_page, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-700">
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
        {t.tickets.showing} <span className="font-medium">{startItem}</span> {t.tickets.to}{' '}
        <span className="font-medium">{endItem}</span> {t.tickets.of}{' '}
        <span className="font-medium">{total}</span> {t.tickets.results}
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="secondary"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="flex-1 sm:flex-initial"
        >
          <span className="hidden sm:inline">{t.common.previous}</span>
          <span className="sm:hidden material-icons text-sm">chevron_left</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="flex-1 sm:flex-initial"
        >
          <span className="hidden sm:inline">{t.common.next}</span>
          <span className="sm:hidden material-icons text-sm">chevron_right</span>
        </Button>
      </div>
    </div>
  );
};
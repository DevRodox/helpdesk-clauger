import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils';
import type { Priority, Status } from '../../interfaces';

interface Props {
  type: 'priority' | 'status';
  value: Priority | Status;
  label: string;
  icon?: string;
}

export const Badge = ({ type, value, label, icon }: Props) => {
  const colors = type === 'priority' ? PRIORITY_COLORS : STATUS_COLORS;
  const colorClass = colors[value as keyof typeof colors];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${colorClass}`}
    >
      {icon && <span className="material-icons text-sm">{icon}</span>}
      {label}
    </span>
  );
};
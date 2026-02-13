import { PRIORITY_LABELS } from '../../utils';
import type { Priority } from '../../interfaces';

interface Props {
  value: Priority;
  onChange: (priority: Priority) => void;
  label?: string;
}

const priorities: Priority[] = ['low', 'medium', 'high'];

export const PrioritySelector = ({
  value,
  onChange,
  label,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        {priorities.map((priority) => (
          <label key={priority} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value={priority}
              checked={value === priority}
              onChange={(e) => onChange(e.target.value as Priority)}
              className="sr-only peer"
            />
            <span className="block w-full py-1.5 text-center text-xs font-medium text-gray-500 dark:text-gray-400 rounded-md peer-checked:bg-white dark:peer-checked:bg-[#2c3b4a] peer-checked:text-primary peer-checked:shadow-sm transition-all hover:text-gray-700 dark:hover:text-gray-200">
              {PRIORITY_LABELS[priority]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
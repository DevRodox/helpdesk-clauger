import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ onClear, value, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-icons text-gray-500 text-lg">search</span>
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          className={`block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
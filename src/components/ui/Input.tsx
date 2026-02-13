import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, required, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`block w-full px-3 py-2.5 bg-white dark:bg-[#111920] border ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary'
            } text-gray-900 dark:text-white text-sm rounded-lg placeholder-gray-400 dark:placeholder-gray-500 ${
              error ? 'pr-10' : ''
            } ${className}`}
            aria-invalid={!!error}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="material-icons text-red-500 text-lg">
                error_outline
              </span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ name, className, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          type="checkbox"
          className={`h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 ${className}`}
          {...props}
          ref={ref}
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };

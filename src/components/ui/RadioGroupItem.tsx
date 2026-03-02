
import React from 'react';

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      className={`h-4 w-4 shrink-0 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroupItem };

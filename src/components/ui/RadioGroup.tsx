import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ name, children, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div ref={ref} {...props} onChange={field.onChange} value={field.value}>
          {children}
        </div>
      )}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>((props, ref) => (
    <input type="radio" ref={ref} {...props} />
));

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };

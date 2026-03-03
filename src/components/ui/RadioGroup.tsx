import React, { createContext, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from './Label';

interface RadioGroupContextProps {
  name: string;
  value: any;
  onChange: (...event: any[]) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  name: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ name, children, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroupContext.Provider value={{ name: field.name, value: field.value, onChange: field.onChange }}>
          <div ref={ref} {...props} role="radiogroup">
            {children}
          </div>
        </RadioGroupContext.Provider>
      )}
    />
  );
});
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(({ value, ...props }, ref) => {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { name, value: groupValue, onChange } = context;
  const isChecked = value === groupValue;

  return (
    <input
      type="radio"
      ref={ref}
      name={name}
      value={value}
      checked={isChecked}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      {...props}
    />
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };

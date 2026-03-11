import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type = 'text', 
  required = true, 
  autoComplete 
}) => {
  const { register } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-700">{label}</label>
      <div className="mt-2 relative">
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          id={name}
          {...register(name, { required })}
          autoComplete={autoComplete}
          className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow duration-200"
        />
        {isPassword && (
          <button 
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
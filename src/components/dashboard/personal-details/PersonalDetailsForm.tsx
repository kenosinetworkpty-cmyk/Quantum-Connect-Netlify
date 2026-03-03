import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { PersonalDetails } from './personalDetailsTypes';

const detailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  idNumber: z.string().min(1, 'ID number is required'),
  email: z.string().email('Invalid email address'),
  contactNumber: z.string().min(1, 'Contact number is required'),
});

interface PersonalDetailsFormProps {
  details: PersonalDetails;
  onSubmit: (data: PersonalDetails) => void;
  isLoading: boolean;
}

export const PersonalDetailsForm = ({ details, onSubmit, isLoading }: PersonalDetailsFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetails>({
    resolver: zodResolver(detailsSchema),
    defaultValues: details,
  });

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" {...register('surname')} />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="idNumber">ID Number</Label>
          <Input id="idNumber" {...register('idNumber')} />
          {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input id="contactNumber" {...register('contactNumber')} />
          {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';

const ticketSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  category: z.enum(['technical', 'billing', 'general']),
  message: z.string().min(1, 'Message is required'),
});

export type NewTicketFormValues = z.infer<typeof ticketSchema>;

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewTicketFormValues) => void;
  isLoading: boolean;
}

export const NewTicketModal = ({ isOpen, onClose, onSubmit, isLoading }: NewTicketModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<NewTicketFormValues>({
    resolver: zodResolver(ticketSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit New Ticket</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" {...register('subject')} />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => register('category').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              {...register('message')}
              className="w-full border border-gray-300 rounded-md p-2 h-32"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

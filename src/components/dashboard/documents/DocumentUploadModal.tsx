import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';

const documentSchema = z.object({
  type: z.enum(['ID', 'Proof of Address', 'Other']),
  fileName: z.string().min(1, 'File name is required'),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DocumentFormValues) => void;
  isLoading: boolean;
}

export const DocumentUploadModal = ({ isOpen, onClose, onSubmit, isLoading }: DocumentUploadModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="type">Document Type</Label>
            <Select onValueChange={(value) => register('type').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ID">ID</SelectItem>
                <SelectItem value="Proof of Address">Proof of Address</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>
          <div>
            <Label htmlFor="fileName">File Name</Label>
            <Input id="fileName" {...register('fileName')} />
            {errors.fileName && <p className="text-red-500 text-sm mt-1">{errors.fileName.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Document'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

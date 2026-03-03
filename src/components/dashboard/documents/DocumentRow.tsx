import React from 'react';
import { Document } from './documentTypes';
import { Button } from '../../ui/Button';

interface DocumentRowProps {
  document: Document;
  onDelete: (id: string) => void;
}

export const DocumentRow = ({ document, onDelete }: DocumentRowProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div>
        <p className="text-lg font-semibold text-gray-900">{document.fileName}</p>
        <p className="text-sm text-gray-600">Type: {document.type}</p>
        <p className="text-xs text-gray-500 mt-1">
          Created: {new Date(document.createdAt?.toDate()).toLocaleDateString()}
        </p>
      </div>
      <Button variant="destructive" size="sm" onClick={() => onDelete(document.id)}>
        Delete
      </Button>
    </div>
  );
};

import React, { useState } from 'react';
import { useDocuments } from '../../services/useDocuments';
import { Button } from '../../ui/Button';
import { DocumentUploadModal, DocumentFormValues } from './DocumentUploadModal';
import { DocumentRow } from './DocumentRow';

export const DocumentUploads = () => {
  const { documents, uploadDocument, deleteDocument, isLoading, error } = useDocuments();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: DocumentFormValues) => {
    await uploadDocument(data);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Document Uploads</h2>
        <Button onClick={() => setIsModalOpen(true)}>Upload Document</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {documents.length > 0 ? (
          documents.map(doc => (
            <DocumentRow key={doc.id} document={doc} onDelete={deleteDocument} />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No documents uploaded</h3>
            <p className="text-sm text-gray-500 mt-1">Upload your ID, proof of address, or other documents.</p>
          </div>
        )}
      </div>

      <DocumentUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

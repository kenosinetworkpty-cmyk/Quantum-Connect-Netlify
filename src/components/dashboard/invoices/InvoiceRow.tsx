import React from 'react';
import { Invoice } from './invoiceTypes';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface InvoiceRowProps {
  invoice: Invoice;
}

export const InvoiceRow = ({ invoice }: InvoiceRowProps) => {
  const getStatusClass = () => {
    return invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 px-6">{invoice.invoiceNumber}</td>
      <td className="py-4 px-6">R{invoice.amount.toFixed(2)}</td>
      <td className="py-4 px-6">{new Date(invoice.dueDate?.toDate()).toLocaleDateString()}</td>
      <td className="py-4 px-6">
        <Badge className={getStatusClass()}>{invoice.status}</Badge>
      </td>
      <td className="py-4 px-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => invoice.pdfUrl && window.open(invoice.pdfUrl, '_blank')}
          disabled={!invoice.pdfUrl}
        >
          Download PDF
        </Button>
      </td>
    </tr>
  );
};

import React from 'react';
import { useInvoices } from '../../services/useInvoices';
import { InvoiceRow } from './InvoiceRow';

export const Invoices = () => {
  const { invoices, isLoading } = useInvoices();

  if (isLoading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Invoices & Billing</h2>
      
      {invoices.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-3 px-6">Invoice #</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Due Date</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} />)}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No invoices found</h3>
          <p className="text-sm text-gray-500 mt-1">Your invoices will appear here.</p>
        </div>
      )}
    </div>
  );
};

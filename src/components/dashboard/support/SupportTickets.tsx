import React, { useState } from 'react';
import { useSupportTickets } from '../../services/useSupportTickets';
import { TicketRow } from './TicketRow';
import { Button } from '../../ui/Button';
import { CreateTicketModal, TicketFormValues } from './CreateTicketModal';

export const SupportTickets = () => {
  const { tickets, createTicket, isLoading, error } = useSupportTickets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTicket = async (data: TicketFormValues) => {
    await createTicket(data);
    setIsModalOpen(false);
  };

  if (isLoading && tickets.length === 0) {
    return <p>Loading support tickets...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
        <Button onClick={() => setIsModalOpen(true)}>Create Ticket</Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {tickets.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-3 px-6">Ticket ID</th>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Last Updated</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => <TicketRow key={ticket.id} ticket={ticket} />)}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No support tickets found</h3>
          <p className="text-sm text-gray-500 mt-1">Create a new ticket to get help.</p>
        </div>
      )}

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
        isLoading={isLoading}
      />
    </div>
  );
};

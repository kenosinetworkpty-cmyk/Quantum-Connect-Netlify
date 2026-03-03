import React from 'react';
import { SupportTicket } from './supportTicketTypes';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface TicketRowProps {
  ticket: SupportTicket;
}

export const TicketRow = ({ ticket }: TicketRowProps) => {
  const getStatusClass = () => {
    switch (ticket.status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 px-6">{ticket.ticketId}</td>
      <td className="py-4 px-6">{ticket.subject}</td>
      <td className="py-4 px-6">
        <Badge className={getStatusClass()}>{ticket.status}</Badge>
      </td>
      <td className="py-4 px-6">{new Date(ticket.lastUpdated?.toDate()).toLocaleDateString()}</td>
      <td className="py-4 px-6">
        <Button variant="outline" size="sm">
          View
        </Button>
      </td>
    </tr>
  );
};

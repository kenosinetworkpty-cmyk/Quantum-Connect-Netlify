import React from 'react';
import { SupportTicket } from './supportTypes';
import { Badge } from '../../ui/Badge';

interface TicketCardProps {
  ticket: SupportTicket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const getStatusClass = () => {
    switch (ticket.status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">{ticket.subject}</h3>
        <Badge className={getStatusClass()}>{ticket.status}</Badge>
      </div>
      <p className="text-sm text-gray-600 mb-4">Category: {ticket.category}</p>
      <p className="text-sm text-gray-800">{ticket.message}</p>
      <div className="text-xs text-gray-500 mt-4">
        {new Date(ticket.createdAt?.toDate()).toLocaleString()}
      </div>
    </div>
  );
};

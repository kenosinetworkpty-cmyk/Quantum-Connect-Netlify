import React, { useState } from 'react';
import { SupportTicket } from '../../types';
import { Button } from '../ui/Button';

interface SupportProps {
  tickets: SupportTicket[];
  onSubmitTicket: (subject: string, message: string) => void;
}

const Support: React.FC<SupportProps> = ({ tickets, onSubmitTicket }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && message.trim()) {
      onSubmitTicket(subject, message);
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Submit Ticket Form */}
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Submit a Ticket</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <Button type="submit" variant="primary">Submit Ticket</Button>
        </form>
      </div>

      {/* Existing Tickets */}
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Your Tickets</h3>
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{ticket.subject}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ticket.status === 'open' ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-800'}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{ticket.date}</p>
              <p className="mt-2">{ticket.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;

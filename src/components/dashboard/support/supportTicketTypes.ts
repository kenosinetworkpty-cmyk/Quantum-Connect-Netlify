export interface SupportTicket {
  id: string;
  ticketId: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: any;
  lastUpdated: any;
}

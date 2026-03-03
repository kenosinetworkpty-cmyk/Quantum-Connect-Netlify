export interface SupportTicket {
  id: string;
  subject: string;
  category: 'technical' | 'billing' | 'general';
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: any;
}
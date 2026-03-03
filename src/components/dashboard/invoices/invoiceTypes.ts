export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: any;
  status: 'paid' | 'unpaid';
  pdfUrl?: string;
  createdAt: any;
}

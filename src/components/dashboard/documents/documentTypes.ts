export interface Document {
  id: string;
  type: 'ID' | 'Proof of Address' | 'Other';
  fileName: string;
  createdAt: any;
}
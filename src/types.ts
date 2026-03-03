
export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category: string;
  specs: string[];
  features: string[];
  whatsIncluded: string[];
};

export interface Address {
  street: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface AvailabilityResult {
  available: boolean;
  exchange?: string;
  providers: string[];
}

export interface Package {
  id: string;
  providerId: string;
  name: string;
  speedDown: number;
  speedUp: number;
  price: number;
  features: string[];
  contractTerm: string;
  hasRouter: boolean;
  hasInstallation: boolean;
  uncapped: boolean;
  type?: 'fibre';
  description?: string;
  bestFor?: string;
}

export interface Lead {
  name: string;
  contact: string;
  email: string;
  address: Address;
  packageId: string;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  sla: string;
}

export interface WebhostingPackage {
  name: string;
  price: string;
  description: string;
  isFavorite?: boolean;
  features: string[];
  type: 'webhosting';
}

export type AnyPackage = Package | WebhostingPackage;

export { type Package as FibrePackage };

export interface Order {
    id: string;
    date: string;
    service: AnyPackage;
    timeline: {
        name: string;
        status: 'completed' | 'pending' | 'next';
        description: string;
    }[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  date: string;
  replies: {
      from: 'user' | 'support';
      message: string;
      date: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  surname: string;
  idNumber: string;
  cellphoneNumber: string;
  address: Address;
  purchases: PurchasedProduct[];
  subscriptions: Subscription[];
  invoices: Invoice[];
  documents: UserDocument[];
  orders: Order[];
  tickets: SupportTicket[];
}

export interface PurchasedProduct {
  product: ShopProduct;
  purchaseDate: string;
  quantity: number;
  totalPrice: number;
}

export interface Subscription {
  service: AnyPackage;
  startDate: string;
  nextPaymentDate: string;
  monthlyAmount: number;
  status: 'active' | 'cancelled';
  contractType: 'prepaid' | 'month-to-month';
  remainingDays?: number;
  dataUsage?: {
    used: number;
    total: number;
    unit: 'GB' | 'TB';
  };
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Due';
  url: string;
}

export interface UserDocument {
  id: string;
  name: string;
  type: 'ID' | 'Proof of Address';
  uploadDate: string;
  url: string;
}

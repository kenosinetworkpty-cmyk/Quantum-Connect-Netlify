
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

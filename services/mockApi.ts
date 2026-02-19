import { Address, AvailabilityResult, Package, Provider, Lead } from '../types';

const DELAY_MS = 1200; // Increased delay to simulate external API calls

export const PROVIDERS: Provider[] = [
  {
    id: 'frogfoot',
    name: 'Frogfoot',
    logo: 'https://picsum.photos/id/1/64/64', // Placeholder
    rating: 4.8,
    sla: '99.9% Uptime',
  },
  {
    id: 'openserve',
    name: 'Openserve',
    logo: 'https://picsum.photos/id/2/64/64', // Placeholder
    rating: 4.7,
    sla: '99.8% Uptime',
  },
  {
    id: 'vumatel',
    name: 'Vumatel',
    logo: 'https://picsum.photos/id/3/64/64', // Placeholder
    rating: 4.9,
    sla: '99.95% Uptime',
  }
];

export const PACKAGES: Package[] = [
  // --- Frogfoot Packages (Symmetrical) ---
  {
    id: 'ff-10',
    providerId: 'frogfoot',
    name: 'Budget User',
    speedDown: 10,
    speedUp: 10,
    price: 499,
    features: ['Symmetrical Speed', 'Best for Browsing', 'Free Router'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'ff-20',
    providerId: 'frogfoot',
    name: 'Light User',
    speedDown: 20,
    speedUp: 20,
    price: 599,
    features: ['Symmetrical Speed', 'HD Streaming', 'Free Installation'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'ff-50',
    providerId: 'frogfoot',
    name: 'Family Plan',
    speedDown: 50,
    speedUp: 50,
    price: 749,
    features: ['Symmetrical Speed', '4K Streaming', 'Multi-User Home'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  
  // --- Openserve Packages (Asymmetric) ---
  {
    id: 'os-10',
    providerId: 'openserve',
    name: 'Budget User',
    speedDown: 10,
    speedUp: 5,
    price: 289,
    features: ['Uncapped', 'Reliable Connection', 'Starter Pack'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'os-20',
    providerId: 'openserve',
    name: 'Light User',
    speedDown: 20,
    speedUp: 10,
    price: 305,
    features: ['Uncapped', 'Widest Coverage', 'Free Activation'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'os-50',
    providerId: 'openserve',
    name: 'Family Plan',
    speedDown: 50,
    speedUp: 25,
    price: 622,
    features: ['Uncapped', 'Fast Downloads', 'Free Router'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },

  // --- Vumatel Packages (Generic Fallback) ---
  {
    id: 'vuma-10',
    providerId: 'vumatel',
    name: 'Budget User',
    speedDown: 10,
    speedUp: 10,
    price: 479,
    features: ['Uncapped Data', 'Budget Friendly', 'Free WiFi Router'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'vuma-20',
    providerId: 'vumatel',
    name: 'Light User',
    speedDown: 20,
    speedUp: 10,
    price: 599,
    features: ['Uncapped Data', 'Free WiFi Router', 'Best Value'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'vuma-50',
    providerId: 'vumatel',
    name: 'Family Plan',
    speedDown: 50,
    speedUp: 50,
    price: 799,
    features: ['Uncapped Data', 'Ultra Fast', 'Free WiFi Router'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  }
];

// Mock Address Autocomplete Suggestions
export const getAddressSuggestions = async (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    if (query.length < 3) {
      resolve([]);
      return;
    }
    
    setTimeout(() => {
      resolve([
        `${query} Street, Sandton, Johannesburg`,
        `${query} Avenue, Cape Town City Centre`,
        `${query} Close, Umhlanga, Durban`,
        `${query} Road, Brooklyn, Pretoria`,
        `12 ${query} Way, Midrand`,
      ]);
    }, 300);
  });
};

export const checkAvailability = async (address: Address): Promise<AvailabilityResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Logic to simulate finding different providers based on randomness or specific keywords
      // In a real backend, this would make HTTP requests to FNO APIs
      
      const random = Math.random();
      let providers: string[] = [];
      let available = false;
      let exchange = undefined;

      // Simulation Logic
      if (address.city.toLowerCase().includes('capetown') || random > 0.6) {
         providers.push('frogfoot');
         available = true;
         exchange = 'Claremont Node A';
      }
      
      if (address.city.toLowerCase().includes('durban') || random > 0.4 && random < 0.8) {
         providers.push('openserve');
         available = true;
         exchange = 'Umhlanga Exchange';
      }

      // 10% chance of no coverage
      if (random < 0.1) {
        providers = [];
        available = false;
        exchange = undefined;
      }

      // If no logic hit but random was high enough, default to generic
      if (available && providers.length === 0) {
        providers.push('vumatel');
      }

      // Ensure duplicates are removed if logic overlaps
      providers = [...new Set(providers)];

      resolve({
        available: providers.length > 0,
        exchange,
        providers,
      });
    }, DELAY_MS);
  });
};

export const getPackages = async (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PACKAGES), 200);
  });
};

export const submitLead = async (lead: Lead): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log('Lead submitted to backend:', lead);
    setTimeout(() => resolve(true), 1000);
  });
};

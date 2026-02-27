
export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
  features: string[];
  whatsIncluded: string[];
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'mini-dc-ups',
    name: 'Mini DC UPS',
    price: 999,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x-4e-IBl3G-DRmCjB2K-d-y9z-F-p-q-w&s',
    description: 'Keep your fibre and router powered during load shedding and power outages. This compact, reliable backup power solution ensures you stay connected when it matters most.',
    specs: [
      'Capacity: 8800mAh Li-ion',
      'Input: 220V AC',
      'Output: 5V/9V/12V DC, PoE',
      'Runtime: Up to 4 hours',
    ],
    features: [
      'Automatic switch-over to battery power',
      'Overload and short-circuit protection',
      'Lightweight and compact design',
      'LED status indicators',
    ],
    whatsIncluded: [
      'Mini DC UPS',
      'AC Power Cable',
      'DC Splitter Cable',
      'User Manual',
    ],
  },
  {
    id: '5g-sim-package',
    name: '5G SIM Package',
    price: 499,
    image: 'https://example.com/5g-sim.jpg',
    description: 'Experience blazing-fast internet speeds with our 5G SIM package. Perfect for home or on-the-go.',
    specs: [
      'Network: 5G',
      'Data: Uncapped',
      'Compatibility: 5G-enabled devices',
    ],
    features: [
      'Low latency for gaming and streaming',
      'Easy to set up',
      'Nationwide coverage',
    ],
    whatsIncluded: [
      '5G SIM Card',
      'Activation Instructions',
    ],
  },
  {
    id: 'fibre-installation-voucher',
    name: 'Fibre Installation Voucher',
    price: 1499,
    image: 'https://example.com/fibre-voucher.jpg',
    description: 'Get a discount on your new fibre installation with this voucher. Professional installation by our certified technicians.',
    specs: [
      'Value: R500',
      'Applicable for: New fibre installations',
      'Validity: 12 months',
    ],
    features: [
      'Redeemable on any of our fibre packages',
      'Professional and timely installation',
    ],
    whatsIncluded: [
      'Fibre Installation Voucher Code',
    ],
  },
  {
    id: 'voip-phone',
    name: 'VoIP Phone',
    price: 799,
    image: 'https://example.com/voip-phone.jpg',
    description: 'A modern VoIP phone for crystal-clear conversations. Ideal for home offices and small businesses.',
    specs: [
      'Display: 2.8-inch color LCD',
      'Lines: 2',
      'Connectivity: Ethernet',
    ],
    features: [
      'HD audio',
      'Call waiting, forwarding, and transfer',
      'Easy to configure',
    ],
    whatsIncluded: [
      'VoIP Phone',
      'Handset and Cord',
      'Ethernet Cable',
      'Power Adapter',
    ],
  },
];

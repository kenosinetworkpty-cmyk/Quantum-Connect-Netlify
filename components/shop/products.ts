
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
];

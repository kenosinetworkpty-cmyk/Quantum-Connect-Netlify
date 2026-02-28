
import { ShopProduct } from '../../types';

export const shopProducts: ShopProduct[] = [
  {
    id: 'mini-dc-ups',
    name: 'Mini DC UPS',
    price: 999,
    currency: 'ZAR',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMoKQPTZ18ibcsmTOBMJbdP2fA3rxcN9Bg_HFTQAWvP6EXG-6VsGsTfUIAH0oXrIIhz9E2cmRTPKsvOzhGkkr1ynXw9M2f-l-Q0v2_OBVdywcWAmvLQIGWPfba_id1FuqL7fEMimVMk3hTcGjhcXEs=w479-h599-s-no-gm?authuser=2',
    description: 'Keep your fibre and router powered during load shedding. This compact backup ensures you stay connected.',
    category: 'Compact Battery Backup',
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
    id: 'portable-power-station',
    name: 'Portable Power Station',
    price: 6999,
    currency: 'ZAR',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOxjf4yZdhf25bOjMIANLSJl5S74UcHEZNQjo-pTl-LNKCtMy3yeuuhN5CnujNvoUEuqdakqodWKRQraNZfnVAq60dIwHLQIR0_8SqAsfe67qTzhWMI_LFzOtHRxU96bOrtqh8JRtdJax9Jf6F6--k=w899-h599-s-no-gm?authuser=2',
    description: 'A robust portable power station for running larger devices like TVs, laptops, and small appliances during an outage.',
    category: 'Portable Power Stations',
    specs: [
      'Capacity: 512Wh LiFePO4',
      'Output Ports: 2x AC, 4x USB-A, 2x USB-C, 2x DC',
      'AC Output: 500W Continuous',
      'Lifecycles: 3000+',
    ],
    features: [
      'Solar panel compatible (sold separately)',
      'Fast charging technology',
      'Pure Sine Wave inverter for sensitive electronics',
      'LCD screen with real-time stats',
    ],
    whatsIncluded: [
      '512Wh Portable Power Station',
      'AC Wall Charger',
      'Car Charger Cable',
      'User Manual',
    ],
  },
  {
    id: '20000mah-power-bank',
    name: '20000mAh Power Bank',
    price: 699,
    currency: 'ZAR',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNW9hVWKsvqxG4l7FO9UyvnT6c7W7nROEV_jTFSIoBI_0Hsxr-DYkgF_J9rYmKT65CrdoJIGYyeFMnjqs4wz7vdWiAJaUGDX7QljbbUde3hykQz_NlhXa4_0xNOkSGd2_atsrRI8TtvBzisdCjMduE=w899-h599-s-no-gm?authuser=2',
    description: 'Charge your mobile phones, tablets, and other small devices on the go. Never run out of battery again.',
    category: 'Portable Power Banks',
    specs: [
      'Capacity: 20000mAh',
      'Ports: 2x USB-A, 1x USB-C',
      'Max Output: 22.5W',
      'Compatibility: Universal',
    ],
    features: [
      'Fast charging for compatible devices',
      'Slim and portable design',
      'Charge multiple devices simultaneously',
      'Digital battery level display',
    ],
    whatsIncluded: [
      '20000mAh Power Bank',
      'USB-C Charging Cable',
      'User Guide',
    ],
  },
];

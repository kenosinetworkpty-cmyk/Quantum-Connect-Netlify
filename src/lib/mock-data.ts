import { User, ShopProduct, Package, Invoice, UserDocument, Order, SupportTicket } from '../types';

const mockShopProduct: ShopProduct = {
  id: 'prod_123',
  name: 'UPS Power Inverter',
  price: 2500,
  currency: 'R',
  image: '/images/ups.jpg',
  description: 'A reliable UPS power inverter for your home or office.',
  category: 'Power Solutions',
  specs: ['1000W', '12V', 'Modified Sine Wave'],
  features: ['Overload Protection', 'Short Circuit Protection', 'Low Battery Alarm'],
  whatsIncluded: ['UPS Inverter', 'User Manual'],
};

const mockFibrePackage: Package = {
  id: 'pkg_456',
  providerId: 'prov_789',
  name: 'JioAirFiber',
  speedDown: 50,
  speedUp: 40,
  price: 1200,
  features: ['Uncapped Data', 'Free Router', 'Free Installation'],
  contractTerm: '24 months',
  hasRouter: true,
  hasInstallation: true,
  uncapped: true,
  type: 'fibre',
};

const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    date: '2023-10-01',
    amount: 1200,
    status: 'Paid',
    url: '#',
  },
  {
    id: 'inv_002',
    date: '2023-11-01',
    amount: 1200,
    status: 'Due',
    url: '#',
  },
  {
    id: 'inv_003',
    date: '2023-09-01',
    amount: 1100,
    status: 'Paid',
    url: '#',
  },
];

const mockDocuments: UserDocument[] = [
  {
    id: 'doc_001',
    name: 'ID_Card.jpg',
    type: 'ID',
    uploadDate: '2023-01-10',
    url: '#',
  },
  {
    id: 'doc_002',
    name: 'Proof_of_Address.pdf',
    type: 'Proof of Address',
    uploadDate: '2023-01-10',
    url: '#',
  },
];

const mockOrder: Order = {
    id: 'NO00016TQUL2',
    date: '04 Jul, 2025 12:01 PM',
    service: mockFibrePackage,
    timeline: [
        {
            name: 'Order placed',
            status: 'completed',
            description: 'We have received your order.'
        },
        {
            name: 'Installation',
            status: 'pending',
            description: 'Our agent will contact you to schedule a visit.'
        },
        {
            name: 'Activation',
            status: 'next',
            description: 'Your service will be activated upon successful installation.'
        }
    ]
}

const mockTickets: SupportTicket[] = [
    {
        id: 'tkt_001',
        subject: 'Slow internet speed',
        message: 'My internet speed is very slow, please check.',
        status: 'open',
        date: '2023-11-10',
        replies: [],
    },
    {
        id: 'tkt_002',
        subject: 'Billing issue',
        message: 'I have been charged twice this month.',
        status: 'closed',
        date: '2023-10-25',
        replies: [
            {
                from: 'support',
                message: 'We have resolved the issue and refunded the extra amount.',
                date: '2023-10-26',
            }
        ],
    }
];

export const mockUser: User = {
  id: 'user_abc',
  name: 'Edgar',
  surname: 'Joe',
  idNumber: '9001015000080',
  cellphoneNumber: '090240287465',
  address: {
    street: '123 Main Road',
    suburb: 'Green Point',
    city: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8001',
  },
  purchases: [
    {
      product: mockShopProduct,
      purchaseDate: '2023-10-26',
      quantity: 1,
      totalPrice: 2500,
    },
  ],
  subscriptions: [
    {
      service: mockFibrePackage,
      startDate: '2023-01-15',
      nextPaymentDate: '2025-09-08',
      monthlyAmount: 1200,
      status: 'active',
      contractType: 'prepaid',
      remainingDays: 12,
      dataUsage: {
        used: 30.86,
        total: 32.10,
        unit: 'GB',
      },
    },
  ],
  invoices: mockInvoices,
  documents: mockDocuments,
  orders: [mockOrder],
  tickets: mockTickets,
};
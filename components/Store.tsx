import React, { useState } from 'react';
import { ShoppingCart, Zap, Battery, BatteryCharging, Check, X, Truck, Shield, Clock, Plus, Minus, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/Button';

// --- Types ---
type Category = 'all' | 'generators' | 'ups' | 'powerbanks';

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  shortDesc: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  inBox: string[];
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 'gen-1',
    name: 'Titan 3000 Inverter Generator',
    category: 'generators',
    price: 12999,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczM8RVpgYxQBSPRqFAfQwyfXXkj_b5_8z9bjKKoh_ezLjkWDb-JrU7aece3_CwmYqMPlrACcnu32PSBdpxRSsr5fy4MWEso7GmC_szMS1inICTEW9rw9CxqtWpJHvTwj9MArW7GpTdHp3Safw2YmNxY=w899-h599-s-no-gm?authuser=2',
    shortDesc: 'Portable power for the whole home office.',
    description: 'The Titan 3000 provides pure sine wave energy, safe for sensitive electronics like laptops and fibre ONTs. With a 7-hour runtime at 50% load, you can work through the longest outages.',
    specs: [
      { label: 'Output', value: '3000W' },
      { label: 'Fuel Type', value: 'Petrol' },
      { label: 'Noise Level', value: '58dB' },
      { label: 'Start', value: 'Electric/Recoil' }
    ],
    features: ['Silent Operation Technology', 'Eco-Mode Fuel Saving', 'Digital Load Display', 'Overload Protection'],
    inBox: ['Titan 3000 Generator', 'Oil Funnel', 'Spark Plug Wrench', 'DC Charging Cables'],
    rating: 4.8
  },
  {
    id: 'ups-1',
    name: 'Mini DC UPS 8800mAh',
    category: 'ups',
    price: 899,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMoKQPTZ18ibcsmTOBMJbdP2fA3rxcN9Bg_HFTQAWvP6EXG-6VsGsTfUIAH0oXrIIhz9E2cmRTPKsvOzhGkkr1ynXw9M2f-l-Q0v2_OBVdywcWAmvLQIGWPfba_id1FuqL7fEMimVMk3hTcGjhcXEs=w479-h599-s-no-gm?authuser=2',
    shortDesc: 'Keep your Fibre WiFi running during loadshedding.',
    description: 'A compact, plug-and-play solution designed specifically for WiFi Routers and Fibre ONT devices. Seamless switchover ensures your internet never drops.',
    specs: [
      { label: 'Capacity', value: '8800mAh' },
      { label: 'Output', value: '9V / 12V Selectable' },
      { label: 'Runtime', value: '4-6 Hours' },
      { label: 'Ports', value: 'DC + USB' }
    ],
    features: ['Zero-lag switchover', 'Lithium-ion battery', 'Over-charge protection', 'Universal compatibility'],
    inBox: ['Mini DC UPS', 'DC Splitter Cable', 'AC Power Cord', 'User Manual'],
    rating: 4.9
  },
  {
    id: 'ups-2',
    name: 'Quantum Power Station 500',
    category: 'ups',
    price: 6499,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOxjf4yZdhf25bOjMIANLSJl5S74UcHEZNQjo-pTl-LNKCtMy3yeuuhN5CnujNvoUEuqdakqodWKRQraNZfnVAq60dIwHLQIR0_8SqAsfe67qTzhWMI_LFzOtHRxU96bOrtqh8JRtdJax9Jf6F6--k=w899-h599-s-no-gm?authuser=2',
    shortDesc: 'Power your laptop, monitor and wifi.',
    description: 'Bridge the gap between portable and powerful. This 500Wh station can charge a laptop 8 times or run a TV and router for 5 hours.',
    specs: [
      { label: 'Capacity', value: '500Wh' },
      { label: 'AC Output', value: '300W Pure Sine' },
      { label: 'Recharge', value: 'Wall/Solar/Car' },
      { label: 'Weight', value: '4.5kg' }
    ],
    features: ['LCD Info Screen', 'Built-in LED Flashlight', 'Solar Charging Compatible', '3x USB-A, 1x USB-C'],
    inBox: ['Power Station 500', 'AC Adapter', 'Car Charger Cable', 'Cigarette Lighter Socket'],
    rating: 4.7
  },
  {
    id: 'pb-1',
    name: 'PocketJuice 20k',
    category: 'powerbanks',
    price: 599,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOtXL1YabGpjyMNFk3UJRHQYpC5Q0VWR_ZaYwJ98vQtAFSFOpXNeV5ACbu-dJ_w4P21pNJkYJ20hoYZbajvL0WKECye5al_O3xkXDKnBZ5IUFJHil4t247l3XqZUXJ9TtatY075Y87_C-2dZhR7X2k=w479-h599-s-no-gm?authuser=2',
    shortDesc: 'Fast charging for phones and tablets.',
    description: 'Ultra-slim high capacity power bank with PD (Power Delivery) technology to fast charge modern smartphones up to 50% in 30 minutes.',
    specs: [
      { label: 'Capacity', value: '20,000mAh' },
      { label: 'Output', value: '20W PD' },
      { label: 'Ports', value: '2x USB-A, 1x USB-C' },
      { label: 'Material', value: 'Aluminum Alloy' }
    ],
    features: ['Fast Charge Support', 'Digital % Display', 'Flight Safe', 'Short-circuit Protection'],
    inBox: ['PocketJuice 20k', 'USB-C to USB-C Cable', 'Travel Pouch'],
    rating: 4.6
  },
  {
    id: 'ups-3',
    name: 'RouterGuard Pro UPS',
    category: 'ups',
    price: 1299,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOQguAqX2YZ5IYBPn5NKVVbDXDk33afN1PBWxEy2KQdRFAREyRE87BTqi6UVULo9_uYpj3zkYHsjOeoINWqtab5PoV0fEtZEVtKCy2IVf54EImwfkENvn8e-Wd8yEgcNjs7p5msV0csXomznG7n9iE=w899-h599-s-no-gm?authuser=2',
    shortDesc: 'Extended battery life for dual-band routers.',
    description: 'Designed for high-performance routers, providing up to 8 hours of backup power. Features intelligent charging and auto-start.',
    specs: [
      { label: 'Capacity', value: '14000mAh' },
      { label: 'Output', value: '5V/9V/12V' },
      { label: 'Runtime', value: '6-8 Hours' },
      { label: 'Ports', value: 'Multi-DC' }
    ],
    features: ['High Capacity Cells', 'Intelligent Charging', 'Over-voltage Protection', 'POE Support'],
    inBox: ['RouterGuard Pro', 'Splitter Cable', 'Manual'],
    rating: 4.8
  },
  {
    id: 'gen-2',
    name: 'MaxPower 5kW Generator',
    category: 'generators',
    price: 18999,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOi64A4zdmZ0fu0A81WH2Nt2DIwpUDnx1OEoR7AZkR7f-RgzbZH8WMhs1vjtcpDCy3Se7tt_MVm9OU8r4IamoLC7Fpd4UdOIdLrt7TJUSiBKELpDqpb8mvvzzRD8QIFa4iNmGKMaDfx9Sj6qdSktZU=w1065-h599-s-no-gm?authuser=2',
    shortDesc: 'Heavy duty backup for larger homes.',
    description: 'Capable of running essential appliances including fridges and lights. Push-button start and rugged durability.',
    specs: [
      { label: 'Output', value: '5000W' },
      { label: 'Fuel', value: 'Petrol' },
      { label: 'Tank', value: '25L' },
      { label: 'Start', value: 'Electric Key' }
    ],
    features: ['AVR Voltage Regulation', 'Low Oil Alert', 'Heavy Duty Wheels', 'Circuit Breaker'],
    inBox: ['Generator Unit', 'Wheel Kit', 'Tools'],
    rating: 4.7
  },
  {
    id: 'pb-2',
    name: 'SlimLine 10k',
    category: 'powerbanks',
    price: 349,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNW9hVWKsvqxG4l7FO9UyvnT6c7W7nROEV_jTFSIoBI_0Hsxr-DYkgF_J9rYmKT65CrdoJIGYyeFMnjqs4wz7vdWiAJaUGDX7QljbbUde3hykQz_NlhXa4_0xNOkSGd2_atsrRI8TtvBzisdCjMduE=w899-h599-s-no-gm?authuser=2',
    shortDesc: 'Pocket-sized power for daily use.',
    description: 'Ultra-thin design fits easily in your pocket. Perfect for keeping your phone topped up during the day.',
    specs: [
      { label: 'Capacity', value: '10000mAh' },
      { label: 'Output', value: '2.1A' },
      { label: 'Ports', value: '2x USB-A' },
      { label: 'Weight', value: '180g' }
    ],
    features: ['Slim Profile', 'LED Indicator', 'Dual Charging', 'Durable Casing'],
    inBox: ['Powerbank', 'Micro-USB Cable'],
    rating: 4.5
  },
  {
    id: 'pb-3',
    name: 'TravelMate 10k',
    category: 'powerbanks',
    price: 399,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOjmSx6dYnUMEFSDhptIa5uDCXIrNVg4BtBCxBkVWOx5JFEGSSlucu0UHZ9eA6jz9fUphAody7_lIyov5ylHYi0hd1aflwg8Miy75Ns4qZGPHUT20q8JbVNtKNaDn7_R9QWNzmNMao3NErezXKABxo=w479-h599-s-no-gm?authuser=2',
    shortDesc: 'Rugged power for on the go.',
    description: 'Textured grip and compact size make this ideal for travel. Includes built-in flashlight.',
    specs: [
      { label: 'Capacity', value: '10000mAh' },
      { label: 'Output', value: '2.1A' },
      { label: 'Feature', value: 'Flashlight' },
      { label: 'Weight', value: '200g' }
    ],
    features: ['Textured Grip', 'Built-in Torch', 'Compact Size', 'Fast Recharging'],
    inBox: ['Powerbank', 'USB-C Cable'],
    rating: 4.4
  },
  {
    id: 'ups-4',
    name: 'Nano UPS',
    category: 'ups',
    price: 599,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPDAmqZWZiWNdycHyL7puHmlg0YjlbpPsCMihR2Y2ROGDhgel8DhSLlO-dCv7wZydZmYam2-F0efNQTIK8dYR5QL91aLy6mAnQyWvzGGQm5XCMVtFFab2P-ggTPyM-Ur83D6mCBtKoBzUEXGkJ5Ji8=w903-h599-s-no-gm?authuser=2',
    shortDesc: 'Ultra-compact backup for ONT devices.',
    description: 'Small form factor UPS designed specifically for Fibre termination units (ONT) or small cameras.',
    specs: [
      { label: 'Capacity', value: '4400mAh' },
      { label: 'Output', value: '12V DC' },
      { label: 'Runtime', value: '3-4 Hours' },
      { label: 'Size', value: 'Compact' }
    ],
    features: ['Direct DC Plug', 'Auto Switch', 'Lightweight', 'Wall Mountable'],
    inBox: ['Nano UPS', 'Connector Set'],
    rating: 4.6
  }
];

export const Store: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Actions ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null); // Close modal if open
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="store" className="bg-slate-50 min-h-screen relative font-sans">
      
      {/* --- Cart Sidebar --- */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
            <h3 className="text-xl font-bold flex items-center">
              <ShoppingCart className="mr-3" size={20} /> Your Cart
            </h3>
            <button onClick={() => setIsCartOpen(false)} className="hover:text-red-400 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 py-10">
                Your cart is empty.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-slate-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-blue-600 font-bold text-sm">R{item.price}</p>
                    <div className="flex items-center mt-2 gap-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200"><Minus size={14} /></button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-100 hover:bg-slate-200"><Plus size={14} /></button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-xs text-red-500 underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
             <div className="flex justify-between items-center mb-4">
               <span className="text-slate-600">Subtotal</span>
               <span className="text-2xl font-black text-slate-900">R{cartTotal}</span>
             </div>
             <p className="text-xs text-slate-400 mb-4 text-center">Shipping calculated at checkout</p>
             <Button className="w-full" disabled={cart.length === 0}>
               Proceed to Checkout
             </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for Cart/Modal */}
      {(isCartOpen || selectedProduct) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => { setIsCartOpen(false); setSelectedProduct(null); }}
        ></div>
      )}

      {/* --- Product Detail Modal (Beats Style) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
          <div className="bg-white w-full max-w-6xl h-[90vh] md:h-auto overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto animate-in zoom-in-95 duration-300 flex flex-col md:flex-row relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-slate-100"
            >
              <X size={24} />
            </button>

            {/* Left: Image Hero */}
            <div className="w-full md:w-1/2 bg-slate-100 p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
               {/* Abstract Background Elements */}
               <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
               <img src={selectedProduct.image} alt={selectedProduct.name} className="relative z-10 w-full object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-auto">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">{selectedProduct.category === 'ups' ? 'Battery Backup' : selectedProduct.category}</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-6">
                   <div className="flex text-yellow-400">
                     {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />)}
                   </div>
                   <span className="text-slate-400 text-sm">({selectedProduct.rating} / 5)</span>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{selectedProduct.description}</p>
                
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-4 border-b border-slate-100 pb-2">Tech Specs</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div key={idx}>
                      <span className="block text-xs text-slate-400 uppercase">{spec.label}</span>
                      <span className="block text-slate-900 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-4 border-b border-slate-100 pb-2">Key Features</h3>
                <ul className="mb-8 space-y-2">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <Check size={14} className="text-green-500 mr-2" /> {feat}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-4 border-b border-slate-100 pb-2">What's in the Box</h3>
                <p className="text-sm text-slate-500 mb-8">{selectedProduct.inBox.join(' • ')}</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-6">
                <div>
                   <span className="block text-xs text-slate-400">Total Price</span>
                   <span className="text-3xl font-black text-slate-900">R{selectedProduct.price}</span>
                </div>
                <Button size="lg" className="px-8 rounded-full" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-900 overflow-hidden py-20 lg:py-32">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczPxbhRJkqoeHCH4UsZNbIZVlMyf2hv263AyE41jL4xt2WUgm5mAAUtL3k1Sx65-OSvsMocAbjNNIZ4s6ZqmPvYrxmm4jDsTuoWtueV5WlgZaNGz32DJUdNlaoZx1nQ9TErynUXNAvzbinkV8_kpm0Y=w897-h599-s-no-gm?authuser=2" 
              alt="Power Solutions Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-900/30 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-widest mb-6">
             <Zap size={14} className="mr-2" /> Power When You Need It
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Stay Connected When <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">The Lights Go Out</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium backup power solutions designed specifically for Fibre ONTs, Routers, and Home Offices. 
            Don't let loadshedding stop your flow.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 bg-red-600 hover:bg-red-700 border-none" onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Shop Power Solutions
            </Button>
          </div>
        </div>
      </div>

      {/* --- CATEGORIES --- */}
      <div className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div 
               onClick={() => setActiveCategory('generators')}
               className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${activeCategory === 'generators' ? 'border-red-500 bg-red-50' : 'border-slate-100 hover:border-red-200'}`}
             >
               <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Zap size={24} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">Generators</h3>
               <p className="text-sm text-slate-500 mt-2">Heavy duty power for the whole home.</p>
             </div>

             <div 
               onClick={() => setActiveCategory('ups')}
               className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${activeCategory === 'ups' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
             >
               <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <BatteryCharging size={24} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">UPS & Battery Backup</h3>
               <p className="text-sm text-slate-500 mt-2">Keep routers & WiFi online instantly.</p>
             </div>

             <div 
               onClick={() => setActiveCategory('powerbanks')}
               className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${activeCategory === 'powerbanks' ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-green-200'}`}
             >
               <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Battery size={24} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">Power Banks</h3>
               <p className="text-sm text-slate-500 mt-2">Portable charge for phones & tablets.</p>
             </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div id="products" className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-slate-900">Featured Products</h2>
          
          {/* Cart Trigger Button (Mobile/Desktop) */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-900 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart size={28} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              
              {/* Product Image */}
              <div 
                className="bg-slate-50 p-8 h-64 flex items-center justify-center cursor-pointer overflow-hidden relative"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">Quick View</span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{product.category}</span>
                     <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">In Stock</span>
                   </div>
                   <h3 
                     className="text-lg font-bold text-slate-900 mb-2 leading-tight cursor-pointer hover:text-blue-900"
                     onClick={() => setSelectedProduct(product)}
                   >
                     {product.name}
                   </h3>
                   <p className="text-sm text-slate-500 line-clamp-2">{product.shortDesc}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                   <span className="text-xl font-black text-slate-900">R{product.price}</span>
                   <button 
                     onClick={() => addToCart(product)}
                     className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
                   >
                     <Plus size={20} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- TRUST BAR --- */}
      <div className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center text-center md:text-left md:justify-start">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Truck size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Fast Delivery</h4>
                    <p className="text-sm text-slate-500">Nationwide shipping within 3-5 days.</p>
                 </div>
              </div>
              <div className="flex items-center justify-center text-center md:text-left md:justify-start">
                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Warranty Support</h4>
                    <p className="text-sm text-slate-500">12 Month warranty on all power products.</p>
                 </div>
              </div>
              <div className="flex items-center justify-center text-center md:text-left md:justify-start">
                 <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Always On Support</h4>
                    <p className="text-sm text-slate-500">Technical assistance for setup & queries.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

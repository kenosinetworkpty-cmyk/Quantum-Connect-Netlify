
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { shopProducts } from './components/shop/products';
import Webhosting from './components/Webhosting';
import { Voip } from './components/Voip';
import { Terms } from './components/Terms';
import { FibreCheckout } from './components/FibreCheckout';
import { FibreConfirmation } from './components/FibreConfirmation';
import { Footer } from './components/Footer';
import { PowerSolutions } from './components/PowerSolutions';
import { PAIA } from './components/PAIA';
import { Support } from './components/Support';
import { Privacy } from './components/Privacy';
import { ConsultationScheduling } from './components/ConsultationScheduling';
import { Address, AvailabilityResult, Package as FibrePackage, Lead, Provider, WebhostingPackage, AnyPackage } from './types';
import { getPackages, submitLead, PROVIDERS } from './services/mockApi';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import UserDashboard from './components/Dashboard/UserDashboard';
import { AuthScreen } from './auth/AuthScreen';

const webhostingPackages: WebhostingPackage[] = [
    {
      name: 'Basic Package',
      price: 'R39',
      type: 'webhosting',
      description: 'Superior and secure hosting for personal sites.',
      features: [
        'Superior and secure hosting',
        'Initial assessment and strategic IT roadmap',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '2 GB NVMe Storage',
        '30 GB traffic',
        '1 MySQL database',
        '5 email accounts',
        '1 website',
        '3 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Standard Package',
      price: 'R59',
      type: 'webhosting',
      description: 'Perfect for growing businesses with more traffic.',
      isFavorite: true,
      features: [
        'Superior and secure hosting',
        'Detailed assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '5 GB NVMe storage',
        'Unlimited traffic',
        '3 MySQL databases',
        '30 email accounts',
        '5 websites',
        '5 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Premium Package',
      price: 'R149',
      type: 'webhosting',
      description: 'Advanced performance for e-commerce.',
      features: [
        'Superior and secure hosting',
        'Comprehensive assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '30 GB NVMe storage',
        'Unlimited traffic',
        '5 MySQL databases',
        '15 websites',
        '15 domain aliases',
        'SSL certificate',
        '90 email accounts',
      ],
    },
  ];

const App: React.FC = () => {
  const [allPackages, setAllPackages] = useState<AnyPackage[]>([]);
  const [providers] = useState<Provider[]>(PROVIDERS);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    getPackages().then(fibrePackages => {
        const packagesWithTypes = fibrePackages.map(p => ({...p, type: 'fibre' as const}));
        setAllPackages([...packagesWithTypes, ...webhostingPackages]);
    });
  }, []);

  const handleAvailabilityCheck = (result: AvailabilityResult, address: Address) => {
    setAvailability(result);
    setUserAddress(address);
    if (result.available) {
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  const handleAddToCart = (productId: string, quantity: number) => {
    const numQuantity = Number(quantity);
    const addQuantity = !isNaN(numQuantity) && numQuantity > 0 ? numQuantity : 1;
    setCart(prevCart => {
      const existingQuantity = prevCart[productId] || 0;
      const newQuantity = existingQuantity + addQuantity;
      return {
        ...prevCart,
        [productId]: newQuantity,
      };
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const numQuantity = Number(quantity);

    if (isNaN(numQuantity)) {
      setCart(prevCart => ({ ...prevCart, [productId]: 1 }));
      return;
    }

    if (numQuantity <= 0) {
      setCart(prevCart => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    } else {
      setCart(prevCart => ({ ...prevCart, [productId]: numQuantity }));
    }
  };

  const fibrePackages = allPackages.filter(p => p.type === 'fibre') as FibrePackage[];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                packages={fibrePackages}
                providers={providers}
                availability={availability}
                userAddress={userAddress}
                onAvailabilityCheck={handleAvailabilityCheck}
              />
            }
          />
          <Route path="/shop" element={
            <Shop 
              products={shopProducts} 
              onAddToCart={handleAddToCart} 
              onUpdateCartQuantity={handleUpdateCartQuantity} 
              cart={cart} 
            />
          } />
          <Route path="/webhosting" element={<Webhosting />} />
          <Route path="/voip" element={<Voip />} />
          <Route path="/power-solutions" element={<PowerSolutions />} />
          <Route path="/checkout/:packageName" element={<FibreCheckout packages={fibrePackages} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/fibre-confirmation" element={<FibreConfirmation />} />
          <Route path="/PAIA" element={<PAIA />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/consultation-scheduling" element={<ConsultationScheduling />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Fibre } from './components/Fibre';
import { WebHosting } from './components/WebHosting';
import { Shop } from './components/Shop';
import { ProductPage } from './components/shop/ProductPage';
import { ShopCheckout } from './components/shop/ShopCheckout';
import { Checkout } from './components/Checkout';
import { Address, AvailabilityResult, Package, Provider } from './types';

import { PACKAGES_DATA, PROVIDERS_DATA } from './data';

const App: React.FC = () => {
  const [packages] = useState<Package[]>(PACKAGES_DATA);
  const [providers] = useState<Provider[]>(PROVIDERS_DATA);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);

  const handleAvailabilityCheck = (result: AvailabilityResult, address: Address) => {
    setAvailability(result);
    setUserAddress(address);
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="bg-white dark:bg-slate-900 font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <Home 
                packages={packages} 
                providers={providers} 
                availability={availability} 
                userAddress={userAddress} 
                onAvailabilityCheck={handleAvailabilityCheck} 
              />
            } />
            <Route path="/fibre" element={<Fibre onAvailabilityCheck={handleAvailabilityCheck} />} />
            <Route path="/web-hosting" element={<WebHosting />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<ProductPage />} />
            <Route path="/shop/checkout" element={<ShopCheckout />} />
            <Route path="/checkout/:packageName" element={<Checkout packages={packages} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

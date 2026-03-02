
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home } from '../components/Home';
import { Fibre } from '../components/Fibre';
import { Webhosting } from '../components/Webhosting';
import { Shop } from '../components/Shop';
import { ProductPage } from '../components/shop/ProductPage';
import { ShopCheckout } from '../components/shop/ShopCheckout';
import { FibreCheckout } from '../components/FibreCheckout';
import { AnyPackage } from './types';
import AuthScreen from './auth/AuthScreen';
import Dashboard from './auth/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

import { fibrePackages, webhostingPackages, voipPackages } from './data';

const App: React.FC = () => {
  const allPackages: AnyPackage[] = [...fibrePackages, ...webhostingPackages, ...voipPackages];

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  return (
    <Router>
      <AuthProvider>
        <div className="bg-white dark:bg-slate-900 font-sans">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fibre" element={<Fibre packages={fibrePackages} />} />
              <Route path="/webhosting" element={<Webhosting packages={webhostingPackages} />} />
              <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
              <Route path="/shop/:productId" element={<ProductPage onAddToCart={addToCart} />} />
              <Route path="/shop/checkout" element={<ShopCheckout cart={cart} onUpdateQuantity={updateQuantity} onBack={() => {}} onProceedToPayment={() => {}} />} />
              <Route path="/checkout/:packageName" element={<FibreCheckout packages={allPackages} />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

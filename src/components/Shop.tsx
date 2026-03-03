
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { ShopProduct } from '../types';
import { ShopHero } from './ShopHero';
import { ProductFilters } from './shop/ProductFilters';
import { ProductGrid } from './shop/ProductGrid';
import { TrustAndSupport } from './shop/TrustAndSupport';
import { ProductPage } from './shop/ProductPage';
import { PreCheckout } from './shop/PreCheckout';
import { ShopCheckout, CheckoutFormValues } from './shop/ShopCheckout';
import { ShopConfirmation } from './shop/ShopConfirmation';

interface ShopProps {
  products: ShopProduct[];
  onAddToCart: (productId: string, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  cart: { [key: string]: number };
}

export const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onUpdateCartQuantity, cart }) => {
  const [currentView, setCurrentView] = useState<'shop' | 'pre-checkout' | 'checkout' | 'confirmation'>('shop');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
    setCurrentView('shop');
  };

  const handleGoToCheckout = () => {
    setCurrentView('pre-checkout');
    window.scrollTo(0, 0);
  };
  
  const handleAddToCartAndGoToCheckout = (productId: string, quantity: number) => {
    onAddToCart(productId, quantity);
    handleGoToCheckout();
  };

  const handleProceedToFullCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = async (data: CheckoutFormValues) => {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);

      // TODO: Process order (e.g., save to database, etc.)
      console.log('Order data:', data);

      setCurrentView('confirmation');
      window.scrollTo(0, 0);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please go to the client zone to sign in.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (currentView === 'pre-checkout') {
    return <PreCheckout cart={cart} products={products} onUpdateCartQuantity={onUpdateCartQuantity} onProceedToCheckout={handleProceedToFullCheckout} />;
  }

  if (currentView === 'checkout') {
    return (
      <>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <ShopCheckout cart={cart} products={products} onCheckout={handleProceedToPayment} />
      </>
    );
  }

  if (currentView === 'confirmation') {
    return <ShopConfirmation onContinueShopping={handleBackToProducts} />;
  }

  if (selectedProductId) {
    return (
      <ProductPage 
        productId={selectedProductId} 
        onBack={handleBackToProducts} 
        onAddToCart={handleAddToCartAndGoToCheckout} 
      />
    );
  }

  return (
    <div className="bg-white">
      <ShopHero onShopNowClick={handleGoToCheckout} />
      <main className="container mx-auto px-4 py-16">
        <h2 id="product-categories" className="text-3xl font-bold text-center mb-4">Featured Power Solutions</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">Solutions to keep you connected and productive during load shedding.</p>
        <div className="flex flex-col md:flex-row gap-8">
          <ProductFilters />
          <ProductGrid products={products} onProductClick={handleProductClick} />
        </div>
      </main>
      <TrustAndSupport />
    </div>
  );
};

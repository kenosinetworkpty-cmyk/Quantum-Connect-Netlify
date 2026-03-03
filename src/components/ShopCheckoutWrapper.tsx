import React, { useState } from 'react';
import { Shop } from './Shop';
import { ShopCheckout } from './shop/ShopCheckout';
import { Confirmation } from './Confirmation';
import { ShopProduct } from '../types';
import { CheckoutFormValues } from './shop/ShopCheckout';

interface ShopCheckoutWrapperProps {
  products: ShopProduct[];
}

export const ShopCheckoutWrapper: React.FC<ShopCheckoutWrapperProps> = ({ products }) => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleAddToCart = (productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    } else {
      setCart(prevCart => ({ ...prevCart, [productId]: quantity }));
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleCheckout = (data: CheckoutFormValues) => {
    console.log('Checkout data:', data);
    setIsOrderConfirmed(true);
  };

  if (isOrderConfirmed) {
    return <Confirmation />;
  }

  if (isCheckingOut) {
    return <ShopCheckout cart={cart} products={products} onCheckout={handleCheckout} />;
  }

  return (
    <Shop
      products={products}
      cart={cart}
      onAddToCart={handleAddToCart}
      onUpdateCartQuantity={handleUpdateCartQuantity}
      onProceedToCheckout={handleProceedToCheckout}
    />
  );
};

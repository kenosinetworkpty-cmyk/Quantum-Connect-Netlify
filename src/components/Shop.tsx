import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/Button';
import { ShopProduct } from '../types';
import { Input } from './ui/Input';

interface ShopProps {
  products: ShopProduct[];
  cart: { [id: string]: number };
  onAddToCart: (id: string) => void;
  onUpdateCartQuantity: (id: string, quantity: number) => void;
  onProceedToCheckout: () => void;
}

export const Shop: React.FC<ShopProps> = ({ products, cart, onAddToCart, onUpdateCartQuantity, onProceedToCheckout }) => {
  const cartItems = Object.keys(cart)
    .map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return null;
      return { ...product, quantity: cart[id] };
    })
    .filter((item): item is ShopProduct & { quantity: number } => item !== null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-gray-900">Our Shop</h1>
          <p className="text-center text-gray-600 mt-2">Explore our curated selection of high-quality products.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
          <aside className="lg:col-span-1">
            <CartSidebar 
              cartItems={cartItems} 
              subtotal={subtotal} 
              onUpdateQuantity={onUpdateCartQuantity}
              onProceedToCheckout={onProceedToCheckout}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: ShopProduct, onAddToCart: (id: string) => void }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="relative h-48 bg-gray-200">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg text-gray-800 h-16">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-2 mb-4 h-24">{product.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-gray-900">R {product.price.toFixed(2)}</p>
        <Button onClick={() => onAddToCart(product.id)} size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
);

const CartSidebar = ({ cartItems, subtotal, onUpdateQuantity, onProceedToCheckout }: {
  cartItems: (ShopProduct & { quantity: number })[];
  subtotal: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onProceedToCheckout: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6 flex items-center">
      <ShoppingCart className="w-6 h-6 mr-3 text-gray-600" />
      Your Cart
    </h2>
    {cartItems.length > 0 ? (
      <>
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">R {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  className="w-20 text-center"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Subtotal</span>
            <span>R {subtotal.toFixed(2)}</span>
          </div>
          <Button onClick={onProceedToCheckout} className="w-full mt-6" size="lg">Proceed to Checkout</Button>
        </div>
      </>
    ) : (
      <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
    )}
  </div>
);


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shopProducts, ShopProduct } from './products';
import { PageLayout } from '../ui/PageLayout';

export const ShopCheckout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = shopProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const subtotal = product.price * quantity;

  return (
    <PageLayout title="Complete Your Order">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Delivery Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
              <input type="text" id="name" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">Delivery Address</label>
              <input type="text" id="address" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
              <input type="tel" id="phone" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cart Summary</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-slate-600">R{product.price}</p>
                </div>
              </div>
              <div>
                <label htmlFor="quantity" className="sr-only">Quantity</label>
                <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} min="1" className="w-20 border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between text-lg font-semibold text-slate-900">
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-slate-900 mt-2">
                <span>Total</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <Link to={`/shop/confirmation/${product.id}`} className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg text-center block hover:bg-blue-600 transition-colors duration-300">Proceed to Payment</Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

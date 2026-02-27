
import React from 'react';
import { Link } from 'react-router-dom';
import { shopProducts } from './shop/products';
import { PageLayout } from './ui/PageLayout';

export const Shop: React.FC = () => {
  return (
    <PageLayout title="Shop Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {shopProducts.map(product => (
          <div key={product.id} className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Link to={`/shop/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="text-2xl font-bold text-slate-900 mt-2">R{product.price}</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">View Product</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

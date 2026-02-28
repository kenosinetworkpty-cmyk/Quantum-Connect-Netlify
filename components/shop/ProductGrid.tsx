
import React from 'react';
import { ShopProduct } from '../../types';
import { Button } from '../ui/Button';

interface ProductGridProps {
  products: ShopProduct[];
  onProductClick: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
          onClick={() => onProductClick(product.id)}
        >
          <div className="relative h-64">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <Button variant="outline" className="text-white border-white group-hover:bg-white group-hover:text-slate-900 transition-colors duration-300">
                View Details
              </Button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-slate-600 mb-4">{product.category}</p>
            <p className="text-blue-600 font-bold text-xl">{product.currency} {product.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="rounded-md mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <Link to={`/shop/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 text-center">
        View Details
      </Link>
    </div>
  );
};

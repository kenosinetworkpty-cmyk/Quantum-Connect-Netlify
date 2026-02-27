
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { shopProducts, ShopProduct } from './products';
import { PageLayout } from '../ui/PageLayout';
import { TrustAndSupport } from './TrustAndSupport';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = shopProducts.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <PageLayout title={product.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <p className="text-4xl font-bold text-slate-900">R{product.price}</p>
          <p className="text-slate-600 mt-4">{product.description}</p>
          <div className="mt-8">
            <Link to={`/shop/checkout/${product.id}`} className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300">Purchase Now</Link>
          </div>
          <TrustAndSupport />
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">Key Specs</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          {product.specs.map(spec => <li key={spec}>{spec}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">Features</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          {product.features.map(feature => <li key={feature}>{feature}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">What's Included</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          {product.whatsIncluded.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </PageLayout>
  );
};

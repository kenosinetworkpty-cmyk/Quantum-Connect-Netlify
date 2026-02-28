
import React from 'react';
import { useParams } from 'react-router-dom';
import { shopProducts } from './products';
import { PageLayout } from '../ui/PageLayout';
import { Button } from '../ui/Button';
import { CheckCircle, Zap } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = shopProducts.find(p => p.id === productId);

  if (!product) {
    return <PageLayout title="Product Not Found"><p className='text-center'>Sorry, we couldn't find that product.</p></PageLayout>;
  }

  return (
    <PageLayout title={product.name}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg object-contain max-h-[400px]"/>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-green-400 mb-6">R {product.price.toLocaleString()}</p>
            <p className="text-slate-300 mb-8 text-lg">{product.description}</p>
            
            <Button size="lg" className="w-full md:w-auto rounded-full px-12 py-5 text-lg font-bold tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-green-500/40 transform active:scale-95 transition-all duration-300 bg-gradient-to-r from-blue-600 to-green-500">Add to Cart</Button>

            <div className="mt-10 border-t border-slate-700 pt-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Zap size={20} className="mr-2 text-yellow-400"/>Key Specs</h3>
              <ul className="space-y-2 text-slate-400">
                {product.specs.map((spec, i) => <li key={i} className="flex items-center"><CheckCircle size={16} className="mr-3 text-green-500 flex-shrink-0"/>{spec}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-slate-700">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Features</h2>
            <ul className="space-y-4 text-slate-300 text-lg">
              {product.features.map((feature, i) => <li key={i}>{feature}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
            <ul className="space-y-4 text-slate-300 text-lg">
              {product.whatsIncluded.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

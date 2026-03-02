
import React from 'react';
import { ChevronLeft, CheckCircle, Package, Battery, Zap } from 'lucide-react';
import { shopProducts } from './products';
import { Button } from '../ui/Button';

type ProductPageProps = {
  productId: string;
  onBack: () => void;
  onAddToCart: (productId: string) => void;
};

export const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack, onAddToCart }) => {
  const product = shopProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={onBack}>Go back to Shop</Button>
      </div>
    );
  }

  return (
    <section className="bg-slate-900 text-white min-h-screen animate-in fade-in">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Back to Shop Link */}
        <div className="mb-8">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            className="inline-flex items-center text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back to All Products
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Product Image */}
          <div className="flex justify-center items-start">
            <div className="relative w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                {product.category}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-3">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-400 mb-6">
              {product.currency} {product.price.toLocaleString()}
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">{product.description}</p>
            
            <Button 
              size="lg"
              onClick={() => onAddToCart(product.id)}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transform active:scale-95 transition-all duration-300"
            >
              Buy Now
            </Button>

            {/* Details Sections */}
            <div className="mt-12 space-y-8">
              {/* Key Specifications */}
              <div>
                <h3 className="text-xl font-bold flex items-center mb-4"><Battery className="mr-3 text-blue-400"/>Key Specifications</h3>
                <ul className="space-y-2 text-slate-300">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle size={18} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Features */}
              <div>
                <h3 className="text-xl font-bold flex items-center mb-4"><Zap className="mr-3 text-yellow-400"/>Features Overview</h3>
                <ul className="space-y-2 text-slate-300">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle size={18} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* What's Included */}
              <div>
                <h3 className="text-xl font-bold flex items-center mb-4"><Package className="mr-3 text-gray-400"/>What's Included</h3>
                <ul className="space-y-2 text-slate-300">
                  {product.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle size={18} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

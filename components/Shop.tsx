
import React from 'react';
import { shopProducts } from './shop/products';
import { Link } from 'react-router-dom';
import { PageLayout } from './ui/PageLayout';
import { ShopHero } from './ShopHero';
import { TrustAndSupport } from './shop/TrustAndSupport';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Compact Battery Backup',
    description: 'Keep your router and fibre ONT on during outages.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPDAmqZWZiWNdycHyL7puHmlg0YjlbpPsCMihR2Y2ROGDhgel8DhSLlO-dCv7wZydZmYam2-F0efNQTIK8dYR5QL91aLy6mAnQyWvzGGQm5XCMVtFFab2P-ggTPyM-Ur83D6mCBtKoBzUEXGkJ5Ji8=w903-h599-s-no-gm?authuser=2',
    targetId: 'mini-dc-ups',
    buttonText: 'View Mini UPS',
  },
  {
    name: 'Portable Power Stations',
    description: 'Run larger devices like TVs and computers.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczM8RVpgYxQBSPRqFAfQwyfXXkj_b5_8z9bjKKoh_ezLjkWDb-JrU7aece3_CwmYqMPlrACcnu32PSBdpxRSsr5fy4MWEso7GmC_szMS1inICTEW9rw9CxqtWpJHvTwj9MArW7GpTdHp3Safw2YmNxY=w899-h599-s-no-gm?authuser=2',
    targetId: 'portable-power-station',
    buttonText: 'View Power Stations',
  },
  {
    name: 'Portable Power Banks',
    description: 'Charge your mobile devices anytime, anywhere.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOQguAqX2YZ5IYBPn5NKVVbDXDk33afN1PBWxEy2KQdRFAREyRE87BTqi6UVULo9_uYpj3zkYHsjOeoINWqtab5PoV0fEtZEVtKCy2IVf54EImwfkENvn8e-Wd8yEgcNjs7p5msV0csXomznG7n9iE=w899-h599-s-no-gm?authuser=2',
    targetId: '20000mah-power-bank',
    buttonText: 'View Power Banks',
  },
];

const ProductCard: React.FC<{ product: typeof shopProducts[0] }> = ({ product }) => (
    <div id={product.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
    <Link to={`/shop/${product.id}`} className="block overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-slate-800 mb-2">{product.name}</h3>
      <p className="text-slate-600 text-sm mb-6 flex-grow">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-xl font-black text-slate-900">R {product.price.toLocaleString()}</p>
        <Button size="sm" asChild variant='outline' className="border-slate-300 hover:bg-slate-800 hover:text-white">
            <Link to={`/shop/${product.id}`}>Buy Now</Link>
        </Button>
      </div>
    </div>
  </div>
);

export const Shop: React.FC = () => {

  const handleCategoryClick = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -120; // Adjust for header height and spacing
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <PageLayout title="">
      <ShopHero />
      
      {/* Product Categories */}
      <section id="product-categories" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Explore Our Product Categories</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">From keeping your internet on to powering your whole setup, find the right solution for your needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map(cat => (
                    <div 
                      key={cat.name} 
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden group flex flex-col text-center shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        <div className="overflow-hidden">
                            <img src={cat.image} alt={cat.name} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{cat.name}</h3>
                            <p className="text-slate-600 text-sm mb-6 flex-grow">{cat.description}</p>
                            <Button 
                              onClick={() => handleCategoryClick(cat.targetId)}
                              variant='outline' 
                              className="border-slate-300 hover:bg-slate-800 hover:text-white mt-auto"
                            >
                                {cat.buttonText}
                                <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="products" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Featured Power Solutions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">Reliable, high-performance backup power to keep you connected.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TrustAndSupport />

    </PageLayout>
  );
};

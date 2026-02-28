
import React from 'react';
import { Button } from './ui/Button';

export const ShopHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[800px] bg-slate-900 flex items-center justify-center">
      
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczP8oSlxvUmfnLJSoD9eIJy3eRQMCPF-3wvETQTJ0TS3Y2cFxxPhYTRD7kbReuzL-d_mw3rx9-Xcj5GRWuCVDB6XzMg4rSW7wAbRRXV6KD5plfYOfaSB21iDeqY3mtS73WRE3g6aj-zhTCkvPI6Ttpo=w899-h599-s-no-gm?authuser=2"
          alt="A person using a portable power station outdoors."
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-in fade-in duration-1000">
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4 max-w-3xl mx-auto animate-in slide-in-from-bottom-3 duration-700">
          Power Through Loadshedding
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-3 duration-700 delay-100">
          Explore our range of backup power solutions. From keeping your WiFi on to powering your entire home, we've got you covered.
        </p>

        <div className="animate-in slide-in-from-bottom-3 duration-700 delay-200">
          <Button 
            size="lg"
            onClick={() => {
                const productsSection = document.getElementById('product-categories');
                if (productsSection) {
                    const yOffset = -100; // Adjusted offset for better scroll positioning
                    const y = productsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
            }}
            className="rounded-md px-8 py-3 text-base font-bold tracking-wide shadow-lg bg-blue-600 hover:bg-blue-700 transform active:scale-95 transition-all duration-300"
          >
            Shop Backup Solutions
          </Button>
        </div>

      </div>
    </section>
  );
};

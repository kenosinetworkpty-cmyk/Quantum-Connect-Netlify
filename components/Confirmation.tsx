
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { CheckCircle, ShieldCheck, Mail, Bot } from 'lucide-react';

export const Confirmation: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczNsckRlpT7yB-ySr9N7mWa7N09HAum71k2abhvNu_ZqCKKgxZ8n5XhFSbU6d2jbp455z9Keye5hf6tH-KWSHW3IU6SvdLWfUppMDoY7HYhr1h1gnG2GTvmkKMCXKIyTvB_RQkXNTTygPingbpdkfak=w1920-h1080-s-no-gm?authuser=2')",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div
        className={[
          'relative z-10 text-center text-white px-6 py-12 max-w-4xl mx-auto transition-all duration-1000',
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          <span className="bg-gradient-to-r from-sky-400 to-emerald-400 text-transparent bg-clip-text">
            Congratulations on your purchase
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-md">
          Check your inbox for confirmation.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span>Payment Successfully Verified</span>
          </div>
        </div>

        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">What Happens Next?</h3>
          <ul className="space-y-3 text-left text-slate-300">
            <li className="flex items-center"><CheckCircle className="text-emerald-400 mr-3" size={20} />A confirmation email has been sent to your inbox.</li>
            <li className="flex items-center"><Bot className="text-sky-400 mr-3" size={20} />Our team is preparing your hosting setup.</li>
            <li className="flex items-center"><Mail className="text-emerald-400 mr-3" size={20} />Activation details will be emailed shortly.</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Return to Home</Button>
          </Link>
          <Link to="/web-hosting">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-slate-900">Explore More Services</Button>
          </Link>
        </div>

        <div className="mt-16 text-center text-slate-400 text-sm">
          <p>Need help? Contact our support team at <a href="mailto:support@yourisp.com" className="text-sky-400 hover:text-sky-300">support@yourisp.com</a></p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const FibreConfirmation: React.FC = () => {
  const backgroundImageUrl = 'https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2';

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white transition-opacity duration-1000 animate-in fade-in"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
        
        <div className="mb-8 animate-in fade-in zoom-in-95 duration-500">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Congratulations!
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light">
            You've successfully purchased Quantum Fibre. Check your inbox for confirmation.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl mb-10">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/20 pb-4">What Happens Next?</h2>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                    <span>A confirmation email has been sent to your inbox.</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                    <span>Our team is preparing your fibre hardware for dispatch.</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                    <span>Activation details and your new account info will be emailed shortly.</span>
                  </li>
                </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Trust & Security</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-green-400"/>
                        <span>Your order has been securely processed.</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-green-400"/>
                        <span>SSL Encrypted Checkout</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-green-400"/>
                        <span>Payment Successfully Verified</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button asChild variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30 border-none">
            <Link to="/support">View My Order</Link>
          </Button>
          <Button asChild variant="primary" className="bg-blue-500 hover:bg-blue-400 border-none">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="backdrop-blur-sm bg-transparent hover:bg-white/10 text-white border-white/50">
            <Link to="/voip">Explore Other Services</Link>
          </Button>
        </div>

        <div className="text-xs text-blue-200/80">
          <p>Need help? Contact our support team at <a href="mailto:support@quantumconnect.click" className="font-semibold hover:text-white">support@quantumconnect.click</a> or on WhatsApp at <span className="font-semibold">+27 68 054 6225</span>.</p>
        </div>

      </div>
    </div>
  );
};
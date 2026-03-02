
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const FibreConfirmation: React.FC = () => {
  const backgroundImageUrl = 'https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2';

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start pt-32 justify-center text-white transition-opacity duration-1000 animate-in fade-in"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 text-center p-6 md:p-8 max-w-4xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        
        {/* Main Hero Message */}
        <div className="mb-8">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-400 to-green-400"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}
          >
            Congratulations on your purchase
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto">
            Check your inbox for confirmation. Your order has been securely processed.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-10 text-slate-300 text-xs md:text-sm">
            <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-400"/>
                <span>SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-400"/>
                <span>Payment Successfully Verified</span>
            </div>
        </div>
        
        {/* What Happens Next Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-2xl mb-10 text-left">
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/20 pb-4">
            What Happens Next?
          </h2>
          <ul className="space-y-4 text-slate-100">
            <li className="flex items-start gap-4">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={22} />
              <span><strong>Confirmation email sent:</strong> A summary of your order is on its way to your inbox.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={22} />
              <span><strong>Our team is preparing your order:</strong> We're getting your purchase ready.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={22} />
              <span><strong>Activation details will be emailed shortly:</strong> Look out for another email with your account info and activation date.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button asChild variant="secondary" className="backdrop-blur-sm bg-white/20 hover:bg-white/30 border-none text-white transition-colors duration-300">
            <Link to="/support">View My Order</Link>
          </Button>
          <Button asChild variant="primary" className="bg-blue-500 hover:bg-blue-600 border-none text-white transition-colors duration-300 shadow-lg shadow-blue-500/20">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="backdrop-blur-sm bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-colors duration-300">
            <Link to="/voip">Explore Other Services</Link>
          </Button>
        </div>

        {/* Micro-Trust Footer */}
        <div className="text-xs text-slate-300/80 pt-6 border-t border-white/10">
          <p>Need help? Contact our support team anytime at <a href="mailto:support@quantumconnect.click" className="font-semibold text-slate-200 hover:text-white">support@quantumconnect.click</a> or on WhatsApp at <span className="font-semibold text-slate-200">+27 68 054 6225</span>.</p>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { CheckCircle, Package, Mail, Home, ShoppingBag, Phone, Mail as MailIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShopConfirmationProps {
  onContinueShopping: () => void;
}

export const ShopConfirmation: React.FC<ShopConfirmationProps> = ({ onContinueShopping }) => {
  const backgroundImageUrl = 'https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2';

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white p-4 animate-in fade-in"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
        
        <div className="bg-green-500/10 border border-green-400/20 rounded-full p-4 mb-6">
          <CheckCircle className="text-green-400" size={64} />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400 mb-4">
          Congratulations!
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
          Your purchase is complete. A confirmation has been sent to your inbox.
        </p>

        {/* Trust Signals */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-slate-400 mb-12">
          <div className="flex items-center">
            <span className="text-green-400 font-bold mr-2">✔</span> Payment Successfully Verified
          </div>
          <div className="flex items-center">
             <span className="text-green-400 font-bold mr-2">✔</span> Order Securely Processed
          </div>
          <div className="flex items-center">
            <span className="text-green-400 font-bold mr-2">✔</span> SSL Encrypted Checkout
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-center text-lg"><Mail className="text-blue-400 mr-4"/> A confirmation email has been sent.</div>
            <div className="flex items-center text-lg"><Package className="text-blue-400 mr-4"/> Our team is preparing your order for dispatch.</div>
            <div className="flex items-center text-lg"><Home className="text-blue-400 mr-4"/> Activation details will be emailed shortly.</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"><ShoppingBag className="mr-2"/> View My Order</Button>
          <Button onClick={onContinueShopping} variant="outline" className="border-slate-400 text-slate-300 hover:bg-slate-700 hover:text-white"><Home className="mr-2"/>Return to Home</Button>
          <Button variant="outline" className="border-slate-400 text-slate-300 hover:bg-slate-700 hover:text-white">Explore More Services</Button>
        </div>

        {/* Micro-Trust Enhancements */}
        <div className="text-slate-500 text-sm">
          <p className="mb-2">Need help? Contact our support team anytime.</p>
          <div className="flex justify-center space-x-4">
            <a href="mailto:support@quantumconnect.click" className="hover:text-slate-300 transition-colors flex items-center"><MailIcon size={14} className="mr-1"/> support@quantumconnect.click</a>
            <a href="https://wa.me/27680546225" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors flex items-center"><Phone size={14} className="mr-1"/> +27 68 054 6225</a>
          </div>
        </div>
      </div>
    </div>
  );
};

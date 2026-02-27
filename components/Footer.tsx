import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Quantum Connect</h3>
            <p className="text-sm leading-relaxed mb-6">
              Simplifying internet connectivity for modern homes and businesses. Compare, connect, and get online in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Check Coverage</Link></li>
              <li><Link to="/#pricing" className="hover:text-white transition-colors">Compare Packages</Link></li>
              <li><Link to="/business" className="hover:text-white transition-colors">Business Fibre</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Support Centre</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/aup" className="hover:text-white transition-colors">Acceptable Use Policy</Link></li>
              <li><Link to="/PAIA" className="hover:text-white transition-colors">PAIA Manual</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact Us</h4>
             <ul className="space-y-3 text-sm">
               <li>support@quantumconnect.click</li>
               <li>WhatsApp Chat: +27 68 054 6225</li>
               <li>WhatsApp support on +27 68 054 6225</li>
             </ul>
             <div className="mt-6">
                <span className="text-xs text-slate-500 block mb-2">Secure Payments & SSL</span>
                <div className="flex items-center space-x-2 text-slate-400">
                   <CreditCard size={24} className="flex-shrink-0" />
                   <span className="text-xs leading-tight">Visa / Mastercard / EFT / Ozow</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 mt-3">
                   <ShieldCheck size={24} className="flex-shrink-0 text-green-400" />
                   <span className="text-xs leading-tight">SSL Secured Checkout</span>
                </div>
             </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Quantum Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

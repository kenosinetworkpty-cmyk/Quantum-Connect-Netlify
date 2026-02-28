import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, CreditCard, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = -100; // Adjust this value to stop higher
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to allow page navigation
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };


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
              <a href="https://www.linkedin.com/company/quantum-connect-click/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="Visit Quantum Connect on LinkedIn" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#availability-checker" onClick={(e) => handleSmoothScroll(e, 'availability-checker')} className="hover:text-white transition-colors">Check Coverage</a></li>
              <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className="hover:text-white transition-colors">Compare Packages</a></li>
              <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className="hover:text-white transition-colors">Business Fibre</a></li>
              <li><a href="/support" onClick={(e) => handleNav(e, '/support')} className="hover:text-white transition-colors">Support Centre</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/terms" onClick={(e) => handleNav(e, '/terms')} className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" onClick={(e) => handleNav(e, '/privacy')} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/aup" onClick={(e) => handleNav(e, '/aup')} className="hover:text-white transition-colors">Acceptable Use Policy</a></li>
              <li><a href="/PAIA" onClick={(e) => handleNav(e, '/PAIA')} className="hover:text-white transition-colors">PAIA Manual</a></li>
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

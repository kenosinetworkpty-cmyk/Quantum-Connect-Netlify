
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Wifi, Server, Phone, User, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../src/auth/AuthContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isTransparentPage = location.pathname === '/' || location.pathname === '/shop' || location.pathname === '/webhosting' || location.pathname === '/voip';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fibre', icon: Wifi, path: '/' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Webhosting', icon: Server, path: '/webhosting' },
    { name: 'Voip', icon: Phone, path: '/voip' },
  ];

  const authLink = user ? 
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' } :
    { name: 'Client Zone Sign In', icon: LogIn, path: '/auth' };


  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b";
  const headerScrolledClasses = "bg-white/80 backdrop-blur-xl shadow-md border-slate-200/80";
  const headerTopTransparentClasses = "bg-transparent border-transparent";
  const headerTopSolidClasses = "bg-white border-slate-200 shadow-sm";

  const getHeaderClasses = () => {
    if (isScrolled) return headerScrolledClasses;
    return isTransparentPage ? headerTopTransparentClasses : headerTopSolidClasses;
  };

  const getLinkClasses = () => {
    const base = "group relative flex items-center gap-2 text-sm font-bold transition-colors py-2 tracking-wide";
    if (isScrolled || !isTransparentPage) return `${base} text-slate-700 hover:text-blue-900`;
    return `${base} text-slate-200 hover:text-white`;
  };
  
  const brandColor = isScrolled || !isTransparentPage ? "#0a254e" : "#ffffff";

  return (
    <header className={`${headerBaseClasses} ${getHeaderClasses()}`}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-24">

          {/* Left Spacer (Desktop) / Mobile Logo */} 
          <div className="md:w-1/3">
            <div className="md:hidden">
              <Link to="/">
                <QuantumLogo mainColor={brandColor} />
              </Link>
            </div>
          </div>

          {/* Centered Logo (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <Link to="/">
              <QuantumLogo mainColor={brandColor} />
            </Link>
          </div>

          {/* Right Content (Desktop Nav / Mobile Button) */}
          <div className="md:w-1/3 flex justify-end">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-end gap-8">
              {[...navLinks, authLink].map((link) => (
                <Link key={link.name} to={link.path} className={getLinkClasses()}>
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[3px] rounded-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className={`p-2 transition-colors rounded-lg backdrop-blur-sm border ${
                  isScrolled || !isTransparentPage
                    ? 'text-slate-800 hover:bg-slate-100 border-slate-200'
                    : 'text-white hover:bg-white/10 border-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-3">
          {[...navLinks, authLink].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-4 text-slate-800 p-4 rounded-xl hover:bg-slate-50 border border-transparent transition-all active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2.5 bg-blue-50 rounded-lg text-blue-900">
                <link.icon size={20} />
              </div>
              <span className="font-bold text-lg tracking-wide">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

const QuantumLogo = ({ mainColor }: { mainColor: string }) => {
    const green = "#00b87c";
    const red = "#e60000";
  
    return (
      <svg
        className="h-12 w-auto transition-all duration-500"
        viewBox="0 0 300 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="underlineGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={red} />
            <stop offset="100%" stopColor={green} />
          </linearGradient>
        </defs>
  
        <text x="10" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="38" fill={mainColor}>Q</text>
        <path d="M28 36 Q 32 38 40 46" stroke={red} strokeWidth="4" strokeLinecap="round" />
        <text x="45" y="42" fontFamily="sans-serif" fontWeight="800" fontSize="36" fill={mainColor} letterSpacing="1">UANTUM</text>
        <rect x="218" y="16" width="6" height="28" fill={green} />
        <text x="12" y="62" fontFamily="sans-serif" fontWeight="600" fontSize="13" fill={mainColor} letterSpacing="6.5">CONNECT</text>
        <path d="M10 68 Q 150 72 290 66" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  };

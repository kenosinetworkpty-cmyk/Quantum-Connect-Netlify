import React, { useState, useRef, useEffect } from 'react';
import { MapPin, CheckCircle, AlertCircle, Navigation, Loader2, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Address, AvailabilityResult } from '../types';
import { checkAvailability, getAddressSuggestions } from '../services/mockApi';

interface HeroProps {
  onAvailabilityCheck: (result: AvailabilityResult, address: Address) => void;
}

export const Hero: React.FC<HeroProps> = ({ onAvailabilityCheck }) => {
  const [addressInput, setAddressInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle typing for autocomplete
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);
    
    if (value.length > 2) {
      const results = await getAddressSuggestions(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddressInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          const mockAddress = "15 Fibre Way, Sandton, Johannesburg";
          setAddressInput(mockAddress);
          setIsLocating(false);
          setShowSuggestions(false);
        }, 1500);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location. Please enter manually.");
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = async () => {
    setError('');
    setShowSuggestions(false);

    if (!addressInput.trim() || addressInput.length < 5) {
      setError('Please enter a valid address.');
      return;
    }

    setIsChecking(true);
    
    const parts = addressInput.split(',').map(s => s.trim());
    const addressObj: Address = {
      street: parts[0] || addressInput,
      suburb: parts[1] || 'Unknown Suburb',
      city: parts[2] || 'Unknown City'
    };

    try {
      const result = await checkAvailability(addressObj);
      onAvailabilityCheck(result, addressObj);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section id="fibre" className="relative w-full bg-slate-900 overflow-hidden min-h-[90vh] flex items-center justify-center pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczNuJAd5tgsAKUGlPgO7nREhKLD8Wxz7JFuqvi7tUYT7tf8XjhYd7SLecDug2-r7zLqpjy41lACR5-KEqRbjCFNW3x0VHFYwYKzv7Ct2xUf4F4WwAd_hhiumZt_fBnL1VNCAvkP-mJ4eR8_NrKX_GAg=w899-h599-s-no-gm?authuser=2" 
          alt="Connected City" 
          className="w-full h-full object-cover opacity-20 scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900"></div>
        
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-red-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-800/50 text-blue-200 text-sm font-medium border border-blue-500/30 mb-8 backdrop-blur-sm animate-in slide-in-from-top-4 duration-700 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
          Superfast Fibre Now Available
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6 max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-100 drop-shadow-2xl">
          EASY WIFI <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              CONNECTION EVERYTIME
            </span>
            <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M2.00025 6.99997C48.5002 2.49997 148 -2.49998 198 6.99997" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="2" y1="7" x2="198" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E60000"/>
                  <stop offset="0.5" stopColor="#0A254E"/>
                  <stop offset="1" stopColor="#00B87C"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200 font-light">
          Keep your home, work, and play online without interruptions. <br className="hidden sm:block" /> Hassle‑free installation, 24/7 support.
        </p>

        {/* Search Bar Component */}
        <div className="w-full max-w-3xl animate-in slide-in-from-bottom-8 duration-700 delay-300" ref={wrapperRef}>
          <div className="relative group">
            <div className="relative flex items-center w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] focus-within:shadow-[0_8px_40px_rgba(0,184,124,0.3)] transition-all duration-300 border-2 border-transparent focus-within:border-green-400/30 z-20">
              
              <div className="pl-6 md:pl-8 text-slate-400">
                <MapPin size={24} />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={addressInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Check your street address..."
                className="w-full h-16 md:h-20 bg-transparent border-none focus:ring-0 text-slate-900 text-lg md:text-xl placeholder:text-slate-400 px-4 md:px-6 outline-none font-medium"
                aria-label="Address Search"
                autoComplete="off"
              />

              <div className="pr-2 md:pr-3 py-2">
                <button 
                  onClick={handleUseLocation}
                  disabled={isLocating}
                  className="flex items-center gap-2 h-12 md:h-14 px-4 md:px-6 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-bold transition-colors group/btn whitespace-nowrap"
                  title="Use current location"
                >
                  {isLocating ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Navigation size={18} className="group-hover/btn:text-blue-600 fill-current opacity-70" />
                  )}
                  <span className="hidden sm:inline text-sm tracking-tight">
                    {isLocating ? 'LOCATING...' : 'MY LOCATION'}
                  </span>
                </button>
              </div>
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in slide-in-from-top-2">
                 <ul>
                   {suggestions.map((item, index) => (
                     <li 
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      className="px-6 py-4 hover:bg-slate-50 cursor-pointer flex items-center text-slate-700 border-b border-slate-50 last:border-none transition-colors"
                     >
                       <Search size={16} className="mr-3 text-slate-400" />
                       {item}
                     </li>
                   ))}
                 </ul>
                 <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-400 text-right uppercase font-bold tracking-wider">
                   Powered by Fibre Coverage Maps
                 </div>
              </div>
            )}

            {error && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-center shadow-lg animate-in zoom-in-95 z-0">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <Button 
              onClick={handleSubmit} 
              size="lg" 
              isLoading={isChecking}
              className="rounded-full px-12 py-5 text-lg font-bold tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-green-500/40 transform active:scale-95 transition-all duration-200 bg-gradient-to-r from-blue-900 to-slate-900 border border-white/10"
            >
              {isChecking ? 'Checking Coverage...' : 'Check Availability'}
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-slate-400 uppercase tracking-wider">
             <div className="flex items-center hover:text-white transition-colors cursor-default">
               <CheckCircle size={16} className="mr-2 text-green-400"/> Free Installation
             </div>
             <div className="flex items-center hover:text-white transition-colors cursor-default">
               <CheckCircle size={16} className="mr-2 text-red-500"/> Uncapped Data
             </div>
             <div className="flex items-center hover:text-white transition-colors cursor-default">
               <CheckCircle size={16} className="mr-2 text-blue-400"/> Month-to-Month
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[80px] z-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80V35C1440 35 1100 80 720 40C340 0 0 45 0 45V80Z" fill="#F8FAFC"/>
          <path d="M0 45C340 0 1100 80 1440 35" stroke="url(#streamGradient)" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(0,184,124,0.5)]" />
          <defs>
            <linearGradient id="streamGradient" x1="0" y1="40" x2="1440" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E60000"/>
              <stop offset="50%" stopColor="#0A254E"/>
              <stop offset="100%" stopColor="#00B87C"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

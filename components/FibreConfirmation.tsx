
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { CheckCircle, ShieldCheck, Mail, Settings, Zap } from 'lucide-react';

export const FibreConfirmation: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center text-white bg-cover bg-center relative"
      style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2)' }}
    >
      <div className="absolute inset-0 bg-gray-900/70"></div>
      
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto animate-fade-in-up">
        {/* Main Message */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4" style={{ color: '#4ade80' /* site's green */ }}>
          Congratulations!
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
          You're now on your way to faster, more reliable internet. Check your inbox for your order confirmation.
        </p>

        {/* Trust Signals */}
        <div className="flex items-center justify-center gap-6 mb-12 text-slate-300 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-400" />
            <span>SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-400" />
            <span>Payment Successfully Verified</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
          {/* What Happens Next */}
          <h2 className="text-2xl font-bold text-white mb-6">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10">
              <Mail size={24} className="text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Confirmation Email</h3>
                <p className="text-slate-300 text-sm">We've sent a summary of your order to your email address.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10">
              <Settings size={24} className="text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Preparing Setup</h3>
                <p className="text-slate-300 text-sm">Our team is processing your order and preparing for installation.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/10">
              <Zap size={24} className="text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Activation Details</h3>
                <p className="text-slate-300 text-sm">We'll email your activation details and installation schedule shortly.</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/orders">
              <Button variant="secondary" size="lg">View My Order</Button>
            </Link>
            <Link to="/">
              <Button variant="primary" size="lg" style={{ backgroundColor: '#4ade80', borderColor: '#4ade80' }}>Return to Home</Button>
            </Link>
            <Link to="/services">
               <Button variant="secondary" size="lg">Explore Other Services</Button>
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <p>Need help? Contact our support team at <a href="mailto:support@quantumconnect.click" className="underline hover:text-white">support@quantumconnect.click</a> or on WhatsApp at +27 68 054 6225.</p>
        </div>
      </div>
    </div>
  );
};

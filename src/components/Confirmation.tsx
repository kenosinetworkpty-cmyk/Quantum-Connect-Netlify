
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4"
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2')" }}
    >
      <div className="bg-black bg-opacity-60 p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto text-center animate-fade-in-up">
        <h1 className="text-5xl font-extrabold mb-4 text-green-400">Congratulations!</h1>
        <p className="text-2xl text-blue-200 mb-8">Your order has been securely processed.</p>
        
        <div className="my-12">
            <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">SSL Encrypted Checkout</span>
                <span className="text-lg">Payment Successfully Verified</span>
            </div>
        </div>

        <div className="my-12 text-left">
            <h2 className="text-3xl font-bold mb-6 text-center">What Happens Next?</h2>
            <ul className="space-y-4 text-lg list-disc list-inside bg-white/10 p-6 rounded-lg">
                <li><span className="font-semibold">Confirmation email sent:</span> Check your inbox for your order summary.</li>
                <li><span className="font-semibold">Team preparing your setup:</span> Our technicians are getting everything ready.</li>
                <li><span className="font-semibold">Activation details incoming:</span> We'll email you with setup and activation instructions.</li>
            </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button onClick={() => navigate('/dashboard')} variant="secondary" className="transition-transform transform hover:scale-105">View My Order On My Dashboard</Button>
          <Button onClick={() => navigate('/')} variant="secondary" className="transition-transform transform hover:scale-105">Return to Home</Button>
          <Button onClick={() => navigate('/shop')} variant="secondary" className="transition-transform transform hover:scale-105">Explore Other Services</Button>
        </div>

        <div className="mt-16 text-center text-sm text-gray-400">
          <p>Need help? Contact our support team anytime.</p>
          <p className="mt-2">
            <a href="mailto:support@quantumconnect.click" className="hover:text-white">support@quantumconnect.click</a>
            <span className="mx-2">|</span>
            <span>WhatsApp: +27 68 054 6225</span>
          </p>
        </div>
      </div>
    </div>
  );
};

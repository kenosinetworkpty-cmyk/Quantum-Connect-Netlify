
import React, { useEffect } from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

export const Confirmation: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.add('confirmation-page');
        return () => {
            document.body.classList.remove('confirmation-page');
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center text-white text-center px-4 overflow-hidden">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-20"
                style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2)' }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 -z-10"></div>

            <div className="relative animate-fade-in-up space-y-12 max-w-4xl mx-auto">
                <header className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg">Congratulations on your purchase.</h1>
                    <p className="text-xl md:text-2xl text-slate-200 text-shadow-md">Check your inbox for confirmation.</p>
                </header>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto text-left shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 border-b border-white/20 pb-4">What Happens Next?</h2>
                    <ul className="space-y-4 text-lg text-slate-200">
                        <li className="flex items-center gap-3"><CheckCircle className="text-green-400" /> Confirmation email sent</li>
                        <li className="flex items-center gap-3"><CheckCircle className="text-green-400" /> Our team is preparing your Order</li>
                        <li className="flex items-center gap-3"><CheckCircle className="text-green-400" /> Activation details will be emailed shortly</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-green-400" /> Your order has been securely processed.</div>
                    <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-green-400" /> SSL Encrypted Checkout</div>
                </div>

                <footer className="pt-8 space-y-6">
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => navigate('/orders')} variant="secondary" size="lg">View My Order</Button>
                        <Button onClick={() => navigate('/')} variant="outline" size="lg">Return to Home</Button>
                        <Button onClick={() => navigate('/services')} variant="outline" size="lg">Explore More Services</Button>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Need help? Contact our support team at <a href="mailto:support@yourisp.com" className="underline hover:text-white">support@yourisp.com</a>.
                    </p>
                </footer>
            </div>
        </div>
    );
};

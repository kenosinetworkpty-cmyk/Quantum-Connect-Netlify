
import React, { useEffect } from 'react';
import { CheckCircle, ShieldCheck, Mail, GitBranch, Home, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Confirmation: React.FC = () => {

    useEffect(() => {
        const mainContent = document.getElementById('confirmation-content');
        if (mainContent) {
            mainContent.classList.add('fade-in-up');
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczN0ikYKFf6US6V0BXQ7ZElSQY9AZSMMVpmf0N6A2yF5xYUT_d0qZkybYH_sHl-dART28WQ5qsek0LvLzbFeWAJQspIow7cnvjD3OSiegZQbkIEIMiiLororN01Fcvp_pN2mv6dpscLptzqrzQhwpoj8=w1063-h599-s-no-gm?authuser=2" 
                    alt="Confirmation Background" 
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Main Content */}
            <div id="confirmation-content" className="relative z-10 text-center max-w-4xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                
                {/* Main Message */}
                <CheckCircle className="mx-auto text-green-400 mb-6" size={80} />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                    Congratulations on your purchase!
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10">
                    Check your inbox for a confirmation email and next steps.
                </p>

                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-12 text-sm text-gray-400">
                    <div className="flex items-center">
                        <ShieldCheck size={16} className="mr-2 text-green-500" />
                        <span>SSL Encrypted Checkout</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-green-500" />
                        <span>Payment Successfully Verified</span>
                    </div>
                    <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-blue-400" />
                        <span>Confirmation Sent to Your Email</span>
                    </div>
                </div>

                {/* Next Steps Section */}
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">What Happens Next?</h2>
                    <div className="space-y-4 text-left max-w-md mx-auto">
                         <div className="flex items-center">
                            <GitBranch size={20} className="mr-4 text-blue-400"/>
                            <div>
                                <h3 className="font-semibold text-white">Order Preparation</h3>
                                <p className="text-gray-300 text-sm">Our team is now preparing your order for activation.</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Mail size={20} className="mr-4 text-blue-400"/>
                            <div>
                                <h3 className="font-semibold text-white">Activation Details</h3>
                                <p className="text-gray-300 text-sm">Activation details and login credentials will be emailed to you shortly.</p>
                            </div>
                        </div>
                         <div className="flex items-center">
                            <CheckCircle size={20} className="mr-4 text-blue-400"/>
                            <div>
                                <h3 className="font-semibold text-white">Confirmation Email</h3>
                                <p className="text-gray-300 text-sm">A detailed confirmation email has been sent to your inbox.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg flex items-center gap-2">
                        <Home size={18} /> Return to Home
                    </Link>
                    <Link to="/my-orders" className="bg-transparent border-2 border-blue-500 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                        <ShoppingBag size={18} /> View My Order
                    </Link>
                    <Link to="/services" className="bg-transparent text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                        Explore More Services <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Support Note */}
                <p className="mt-12 text-xs text-gray-500">Need help? Contact our support team at support@yourisp.com or on WhatsApp at +27 12 345 6789.</p>
            </div>

             <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(2rem);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

import React from 'react';
import { LifeBuoy, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mb-4">
            <LifeBuoy className="h-16 w-16 mx-auto text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Support Center
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-600">
            Your one-stop destination for help, guidance, and troubleshooting. We're here to ensure your Quantum Connect experience is seamless.
          </p>
        </div>
      </div>

      {/* Contact Options Grid */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How can we help you today?</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-xl mx-auto">Choose your preferred way to get in touch with our team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Email Support */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                 <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-4 flex-grow">Best for detailed, non-urgent queries. We'll get back to you within 24 hours.</p>
              <a href="mailto:support@quantumconnect.click" className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2">
                support@quantumconnect.click <ArrowRight size={16}/>
              </a>
            </div>

            {/* WhatsApp Support */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              <div className="p-4 bg-green-100 rounded-full mb-4">
                 <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Chat</h3>
              <p className="text-slate-600 mb-4 flex-grow">For quick questions and real-time assistance during business hours.</p>
              <a href="https://wa.me/27680546225" target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:text-green-700 flex items-center gap-2">
                Chat on WhatsApp <ArrowRight size={16}/>
              </a>
            </div>

            {/* Phone Support */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              <div className="p-4 bg-purple-100 rounded-full mb-4">
                 <Phone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600 mb-4 flex-grow">Direct line for urgent support needs. Available from 8 AM to 8 PM, Mon-Fri.</p>
              <a href="tel:+27680546225" className="font-bold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                +27 68 054 6225 <ArrowRight size={16}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

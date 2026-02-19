import React from 'react';
import { Phone, Globe, Smartphone, Server, Shield, Activity, Users, Mic, Laptop, Check } from 'lucide-react';
import { Button } from './ui/Button';

export const Voip: React.FC = () => {
  return (
    <section id="voip" className="relative bg-white font-sans scroll-mt-20">
      
      {/* 1. VoIP Hero Section - Dark Theme for visual break */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920" 
            alt="Business Meeting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Phone size={14} className="mr-2" />
              Business Telephony
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              VoIP, A Real <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Business Solution</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl font-light">
              Upgrade to a cloud-based phone system that grows with your business. 
              Crystal clear HD voice, seamless mobility, and enterprise-grade features 
              at a fraction of the cost of traditional landlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-500 border-none">
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-600 text-white hover:bg-slate-800 hover:text-white hover:border-slate-500">
                View Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Why Choose VoIP & Benefits */}
      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-slate-900 mb-4">Why make the switch?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Modern businesses need modern communication. Move away from rigid copper lines 
              to a flexible, internet-based solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Activity, 
                color: 'text-green-500', 
                bg: 'bg-green-50',
                title: 'Cost Savings', 
                desc: 'Save up to 40% on your monthly telephone bill compared to traditional landlines.' 
              },
              { 
                icon: Users, 
                color: 'text-blue-500', 
                bg: 'bg-blue-50',
                title: 'Scalability', 
                desc: 'Add or remove extensions instantly as your team grows without hardware installation.' 
              },
              { 
                icon: Mic, 
                color: 'text-purple-500', 
                bg: 'bg-purple-50',
                title: 'HD Call Quality', 
                desc: 'Experience crystal clear voice quality that makes you sound professional every time.' 
              },
              { 
                icon: Globe, 
                color: 'text-red-500', 
                bg: 'bg-red-50',
                title: 'Remote Ready', 
                desc: 'Your office number follows you. Take calls on your mobile or laptop from anywhere.' 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Key Features Grid */}
      <div className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-black text-slate-900 mb-4">Top System Features</h3>
              <p className="text-slate-500">
                Our Cloud PBX comes packed with over 40 enterprise-grade features designed 
                to improve productivity and customer experience.
              </p>
            </div>
            <Button variant="outline">Download Feature Guide</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Cloud PBX System', desc: 'Centralized management portal.' },
              { title: 'Digital Receptionist (IVR)', desc: 'Auto-attendant to route calls professionally.' },
              { title: 'Call Recording', desc: 'Securely record calls for training and compliance.' },
              { title: 'Voicemail to Email', desc: 'Receive audio voicemails directly in your inbox.' },
              { title: 'Mobile Softphone', desc: 'Turn your smartphone into your office extension.' },
              { title: 'Call Analytics', desc: 'Real-time reporting on call volumes and agent performance.' },
              { title: 'CRM Integration', desc: 'Connect with Salesforce, Zoho, Hubspot and more.' },
              { title: 'Time-Based Routing', desc: 'Different routing for business hours vs after hours.' },
              { title: 'Music on Hold', desc: 'Customizable marketing messages while clients wait.' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start p-6 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                <div className="mt-1 mr-4 text-slate-300 group-hover:text-blue-600 transition-colors">
                  <Check size={20} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{feature.title}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Compatibility & Devices */}
      <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Work from <span className="text-blue-400">Any Device</span>
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you prefer a traditional desk phone, a headset connected to your PC, 
                or the flexibility of a mobile app, our platform supports it all.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Phone className="text-blue-400 mr-4" size={28} />
                  <div>
                    <h5 className="font-bold text-lg">IP Desk Phones</h5>
                    <p className="text-sm text-slate-400">Compatible with Yealink, Fanvil, Snom & Polycom.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Smartphone className="text-green-400 mr-4" size={28} />
                  <div>
                    <h5 className="font-bold text-lg">Mobile App</h5>
                    <p className="text-sm text-slate-400">iOS and Android apps for on-the-go communication.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <Laptop className="text-purple-400 mr-4" size={28} />
                  <div>
                    <h5 className="font-bold text-lg">Desktop Softphone</h5>
                    <p className="text-sm text-slate-400">Make calls directly from your PC or Mac.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Abstract Device Graphic */}
              <div className="bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                 <div className="flex justify-between items-center mb-8 border-b border-slate-600 pb-4">
                    <span className="font-mono text-xs text-slate-400">INCOMING CALL...</span>
                    <div className="flex space-x-2">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                 </div>
                 <div className="text-center py-8">
                    <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-300">
                       JD
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1">John Doe</h4>
                    <p className="text-blue-400 mb-8">Sales Department</p>
                    
                    <div className="flex justify-center gap-6">
                       <button className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors">
                          <Phone className="rotate-[135deg]" size={24} />
                       </button>
                       <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors animate-pulse">
                          <Phone size={24} />
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA / Support */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm text-white">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-black text-white mb-6">Ready to upgrade your business voice?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 text-lg">
            Get a tailored VoIP solution for your business today. Our team will handle the porting, 
            setup, and training.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold">
               Request Free Consultation
             </Button>
             <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-900 hover:text-white">
               Check Coverage
             </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

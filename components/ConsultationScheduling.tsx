import React, { useState } from 'react';
import { Button } from './ui/Button';
import { CheckCircle, Shield, Clock, Users, Briefcase, Calendar, MessageSquare, ArrowRight, Video, BrainCircuit, Star, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const InputField = ({ icon, label, placeholder, type = 'text', name, value, onChange, required = true }) => (
    <div className="mb-5">
        <label htmlFor={name} className="font-semibold text-sm text-gray-700 pb-1 block">{label}</label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            <input 
                type={type} 
                id={name} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                required={required}
                className="border rounded-lg pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            />
        </div>
    </div>
);

const SelectField = ({ icon, label, name, value, onChange, children, required = true }) => (
    <div className="mb-5">
        <label htmlFor={name} className="font-semibold text-sm text-gray-700 pb-1 block">{label}</label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            <select 
                id={name} 
                name={name} 
                value={value} 
                onChange={onChange} 
                required={required}
                className="border rounded-lg pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 transition duration-200 appearance-none"
            >
                {children}
            </select>
        </div>
    </div>
);

const TextareaField = ({ icon, label, placeholder, name, value, onChange }) => (
    <div className="mb-5">
        <label htmlFor={name} className="font-semibold text-sm text-gray-700 pb-1 block">{label}</label>
        <div className="relative">
             <div className="absolute left-3 top-4 text-gray-400">{icon}</div>
            <textarea 
                id={name} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                rows={4}
                className="border rounded-lg pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            ></textarea>
        </div>
    </div>
);

export const ConsultationScheduling: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        businessEmail: '',
        phone: '',
        companySize: '',
        serviceType: '',
        meetingTime: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted', formData);
        window.open('https://calendar.app.google/kUzcBtBYyQnUFHUMA', '_blank');
        navigate('/confirmation');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left side: Form */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Schedule Your Free VoIP Consultation</h2>
                        <p className="text-gray-600 mb-8">Let's connect. Share your details and we'll schedule a tailored video consultation.</p>
                        <form onSubmit={handleSubmit}>
                            <InputField icon={<Users size={16} />} label="Full Name" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} />
                            <InputField icon={<Briefcase size={16} />} label="Company Name" name="companyName" placeholder="Innovate Inc." value={formData.companyName} onChange={handleInputChange} />
                            <InputField icon={<Users size={16} />} label="Business Email" name="businessEmail" placeholder="your@email.com" type="email" value={formData.businessEmail} onChange={handleInputChange} />
                            <InputField icon={<Phone size={16} />} label="Phone Number" name="phone" placeholder="+27 00 000 0000" value={formData.phone} onChange={handleInputChange} />
                            <SelectField icon={<Users size={16} />} label="Company Size" name="companySize" value={formData.companySize} onChange={handleInputChange}>
                                <option value="" disabled>Select size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201+">201+ employees</option>
                            </SelectField>
                             <SelectField icon={<Briefcase size={16} />} label="Type of VoIP Service" name="serviceType" value={formData.serviceType} onChange={handleInputChange}>
                                <option value="" disabled>Select service</option>
                                <option value="Cloud PBX">Cloud PBX</option>
                                <option value="SIP Trunking">SIP Trunking</option>
                                <option value="Call Center Solution">Call Center Solution</option>
                                <option value="Other">Other</option>
                            </SelectField>
                            <TextareaField icon={<MessageSquare size={16} />} label="Message / Requirements" name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleInputChange} />
                            
                            <div className="mt-8">
                                <Button type="submit" className="w-full flex items-center justify-center gap-2" size="lg">
                                    <Video size={18} /> Schedule Video Consultation
                                </Button>
                                <p className="text-xs text-gray-500 mt-3 text-center">We respond within 1 business hour.</p>
                            </div>
                            <div className="mt-6 flex items-center justify-center">
                                <Shield size={14} className="text-green-600"/>
                                <p className="text-xs text-gray-500 ml-2">Your information is secure and confidential. No obligation consultation.</p>
                            </div>
                        </form>
                    </div>

                    {/* Right side: Trust Panel */}
                    <div className="hidden lg:block p-8 bg-gradient-to-br from-blue-900 to-gray-800 rounded-2xl text-white shadow-2xl">
                         <div className="text-center">
                            <BrainCircuit size={48} className="mx-auto mb-4 text-blue-300"/>
                            <h3 className="text-2xl font-bold mb-4">AI-Assisted Requirement Analysis</h3>
                            <p className="text-blue-200 mb-8">Our system intelligently analyzes your submission to provide our experts with the insights needed for a productive consultation.</p>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-xl mb-6">
                             <div className="flex items-start">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Testimonial" className="w-12 h-12 rounded-full mr-4"/>
                                <div>
                                    <p className="italic text-blue-100">"The AI-powered analysis was impressive. The team came to the consultation with a clear understanding of our needs and a tailored strategy ready to go. Highly efficient!"</p>
                                    <p className="font-bold text-white mt-4">- John Smit, CEO of TechSolutions</p>
                                     <div className="flex mt-2">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <CheckCircle size={20} className="text-green-400"/>
                                <span className="font-medium">Secure Video Consultation</span>
                            </div>
                             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <CheckCircle size={20} className="text-green-400"/>
                                <span className="font-medium">Tailored VoIP Solution Strategy</span>
                            </div>
                             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <CheckCircle size={20} className="text-green-400"/>
                                <span className="font-medium">Priority Scheduling</span>
                            </div>
                        </div>
                        
                        <div className="text-center mt-10">
                            <p className="text-xs text-blue-300">Need help? Contact our support team at <a href="mailto:support@yourisp.com" className="underline">support@yourisp.com</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

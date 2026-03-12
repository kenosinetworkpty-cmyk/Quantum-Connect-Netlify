import React, { useState } from 'react';
import { Button } from './ui/Button';
import { CheckCircle, Shield, Users, Briefcase, Calendar, MessageSquare, Video, BrainCircuit, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. DEFINE TYPES FOR PROPS ---
interface InputProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: string;
    required?: boolean;
}

interface SelectProps extends Omit<InputProps, 'placeholder' | 'type'> {
    children: React.ReactNode;
}

// --- 2. TYPED HELPER COMPONENTS ---

const InputField: React.FC<InputProps> = ({ 
    icon, label, placeholder, type = 'text', name, value, onChange, required = true 
}) => (
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

const SelectField: React.FC<SelectProps> = ({ 
    icon, label, name, value, onChange, children, required = true 
}) => (
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
                className="border rounded-lg pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 transition duration-200 appearance-none bg-white"
            >
                {children}
            </select>
        </div>
    </div>
);

const TextareaField: React.FC<InputProps> = ({ 
    icon, label, placeholder, name, value, onChange 
}) => (
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
// ... (your imports and field components stay the same)

export const ConsultationScheduling: React.FC = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Added for better UX
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

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- MODIFIED SUBMIT HANDLER ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { grecaptcha } = window as any;

        if (!grecaptcha) {
            console.error("reCAPTCHA has not loaded yet.");
            setIsSubmitting(false);
            return;
        }

        grecaptcha.ready(() => {
            grecaptcha.execute('6Le2MX8sAAAAAMeWpt631FtAbJ5jjg2njmjnzE4Y', { action: 'book_consultation' })
                .then(async (token: string) => {
                    console.log('reCAPTCHA Token generated:', token);
                    
                    // Here you would typically send formData AND the token to your backend
                    // Example: await myApi.sendConsultation({...formData, recaptchaToken: token});

                    console.log('Form Submitted with Security Token', formData);
                    setSubmitSuccess(true);
                    setIsSubmitting(false);
                })
                .catch((err: any) => {
                    console.error("reCAPTCHA Error:", err);
                    setIsSubmitting(false);
                });
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                        {submitSuccess ? (
                            // ... (Success UI stays the same)
                             <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"><CheckCircle size={32} /></div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You, {formData.fullName}!</h3>
                                <p className="text-slate-600 mb-6">
                                  We've received your consultation request. Please click the button below to schedule your meeting.
                                </p>
                                <a href="https://calendar.app.google/G7EhqvLitiJWKL4eA" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full flex items-center justify-center gap-2" size="lg">
                                        <Calendar size={18} /> Schedule on Google Calendar
                                    </Button>
                                </a>
                                <Link to="/">
                                    <Button variant="secondary" className="w-full mt-2">Return to Home</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
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
                                        <Button 
                                            type="submit" 
                                            className="w-full flex items-center justify-center gap-2" 
                                            size="lg"
                                            disabled={isSubmitting} // Disable while processing reCAPTCHA
                                        >
                                            {isSubmitting ? 'Securing...' : <><Video size={18} /> Submit Consultation Request</>}
                                        </Button>
                                        
                                        {/* MANDATORY RECAPTCHA TERMS */}
                                        <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
                                            This site is protected by reCAPTCHA and the Google <br/>
                                            <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and 
                                            <a href="https://policies.google.com/terms" className="underline"> Terms of Service</a> apply.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-6">
                                        <Shield size={14} className="text-green-600"/>
                                        <p className="text-xs text-gray-500 ml-2">Your information is secure and confidential.</p>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                    {/* ... (Right-side UI stays the same) */}
                    <div className="hidden lg:block p-8 bg-gradient-to-br from-blue-900 to-gray-800 rounded-2xl text-white shadow-2xl">
                         <div className="text-center">
                            <BrainCircuit size={48} className="mx-auto mb-4 text-blue-300"/>
                            <h3 className="text-2xl font-bold mb-4">AI-Assisted Requirement Analysis</h3>
                            <p className="text-blue-200 mb-8">Our system intelligently analyzes your submission to provide our experts with the insights needed for a productive consultation.</p>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-xl mb-6">
                            <div style={{ height: '300px', width: '100%' }}>
                                <a href="https://calendar.app.google/G7EhqvLitiJWKL4eA" target="_blank" rel="noopener noreferrer" className="h-full w-full flex items-center justify-center text-white font-bold text-xl bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    Click to Schedule a Meeting
                                </a>
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
                            <p className="text-xs text-blue-300">Need help? Contact our support team at <a href="mailto:support@quantumconnect.click" className="underline">support@quantumconnect.click</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
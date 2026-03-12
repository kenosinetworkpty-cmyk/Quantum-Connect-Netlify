import React, { useState, useEffect } from 'react';
import { User } from "firebase/auth";
import { 
  collection, query, where, onSnapshot, addDoc, 
  serverTimestamp, doc 
} from "firebase/firestore";

// IMPORTANT: Ensure this path matches your firebase file exactly
import { db, auth } from "../auth/firebase"; 

// UI Components
import { PageLayout } from './ui/PageLayout';
import { Timeline } from './Timeline';

// --- 1. TYPES & INTERFACES ---
interface Service {
  id: string;
  planName: string;
  serviceType: string;
  speed?: string;
  status: string;
  installationType: "new" | "existing";
}

interface NetworkStatus {
  state: string;
  message: string;
}

// --- 2. DATA ACTIONS (Functions) ---

// THIS FIXES YOUR ERROR: The function must be defined here
export const createSupportTicket = async (subject: string, category: string, message: string, token: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to create a ticket.");

    const ticketsRef = collection(db, "tickets");
    const newTicket = await addDoc(ticketsRef, {
      userId: user.uid,
      subject,
      category,
      message,
      status: "open",
      priority: "medium",
      createdAt: serverTimestamp()
    });

    return { success: true, id: newTicket.id };
  } catch (error: any) {
    console.error("Error adding ticket: ", error);
    return { success: false, error: error.message };
  }
};

// --- 3. CUSTOM HOOKS ---

export function useMyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user: User | null) => {
      if (!user) {
        setServices([]);
        setLoading(false);
        return;
      }

      const q = query(collection(db, "services"), where("userId", "==", user.uid));
      const unsubSnapshot = onSnapshot(q, (snapshot) => {
        const servicesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            planName: data.planName || "Unknown Plan",
            serviceType: data.serviceType || "Fibre",
            speed: data.speed || "N/A",
            status: data.status || "pending",
            installationType: data.installationType === "existing" ? "existing" : "new"
          } as Service;
        });
        setServices(servicesData);
        setLoading(false);
      });
      return () => unsubSnapshot();
    });
    return () => unsubscribeAuth();
  }, []);

  return { services, loading };
}

function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>({ state: 'operational', message: 'All systems normal' });

  useEffect(() => {
    const docRef = doc(db, "network_status", "core_network");
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setStatus({
          state: data.status || 'operational',
          message: data.message || 'Systems are online'
        });
      }
    });
    return () => unsub();
  }, []);

  return status;
}

// --- 4. SUB-COMPONENTS ---

export function SupportForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("technical");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // 1. Tell TypeScript grecaptcha exists globally
    const { grecaptcha } = window as any;
  
    grecaptcha.ready(() => {
      grecaptcha.execute('reCAPTCHA_site_key', { action: 'support_ticket' }).then(async (token: string) => {
        
        // 2. Send the token to your backend along with your form data
        const result = await createSupportTicket(subject, category, message, token);
  
        if (result.success) {
          alert("Ticket submitted!");
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
        <input 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="What can we help with?" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
        <select 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="technical">Technical / No Internet</option>
          <option value="billing">Billing Query</option>
          <option value="account">Account Changes</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
        <textarea 
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[150px]"
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Please provide details..." 
          required 
        />
      </div>
      <button 
        type="submit" 
        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
      >
        Submit Ticket
      </button>
    </form>
  );
}

// --- 5. MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const { services, loading } = useMyServices();
  const network = useNetworkStatus();

  if (loading) return <PageLayout title="Dashboard"><div>Loading your dashboard...</div></PageLayout>;

  return (
    <PageLayout 
      title="Client Dashboard"
      subtitle="Manage your fibre services and support tickets in one place."
    >
      {/* Network Status Banner */}
      <div className={`mb-8 p-4 rounded-2xl flex items-center gap-4 border ${
        network.state === 'operational' 
          ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
          : 'bg-amber-50 border-amber-100 text-amber-800'
      }`}>
        <div className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            network.state === 'operational' ? 'bg-emerald-400' : 'bg-amber-400'
          }`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            network.state === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'
          }`}></span>
        </div>
        <p className="text-sm font-semibold">{network.message}</p>
      </div>

      {/* Services Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold text-slate-900">{service.planName}</h3>
                 <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-100 text-slate-500">
                    {service.status}
                 </span>
              </div>
              <p className="text-slate-500 text-sm mb-6">{service.serviceType} • {service.speed}</p>
              <Timeline installationType={service.installationType} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">No active services found.</p>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Technical Support</h2>
          <p className="text-slate-500">Our engineers are standing by to assist you.</p>
        </div>
        <SupportForm />
      </div>
    </PageLayout>
  );
}
import React, { useState, useEffect } from 'react';
// FIX 1: Try this path. If it fails, check if your file is named 'firebase.ts' instead.
import { db, auth } from "../auth/firebase"
import { User } from "firebase/auth"; // 1. Add this import at the top
import { 
  collection, query, where, onSnapshot, addDoc, 
  serverTimestamp 
} from "firebase/firestore";

import { PageLayout } from './ui/PageLayout';
import { Timeline } from './Timeline';

// --- 1. TYPES ---
interface Service {
  id: string;
  planName: string;
  serviceType: string;
  speed?: string;
  status: string;
  // FIX 2: We change 'string' to this specific union type to satisfy the Timeline component
  installationType: "new" | "existing"; 
}

export function useMyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
// ... inside useMyServices hook ...
  useEffect(() => {
    // 2. Explicitly type the user parameter as 'User | null'
    const unsubscribeAuth = auth.onAuthStateChanged((user: User | null) => {
      // 3. Handle the null case immediately
      if (!user) {
        setServices([]);
        setLoading(false);
        return;
      }
  
      // Now TypeScript knows for sure that 'user' is not null here
      const q = query(
        collection(db, "services"),
        where("userId", "==", user.uid)
      );
  
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
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
  
      return () => unsubscribeSnapshot();
    });
  
    return () => unsubscribeAuth();
  }, []);

  return { services, loading };
}

// ... createSupportTicket and SupportForm stay the same as previous version ...

export default function Dashboard() {
  const { services, loading } = useMyServices();

  if (loading) return <PageLayout title="Dashboard"><div>Loading...</div></PageLayout>;

  return (
    <PageLayout title="Dashboard">
      <div className="p-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Client Zone</h1>
        
        <div className="grid gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{service.planName}</h3>
                    <p className="text-slate-500">{service.serviceType} • {service.speed}</p>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wider">
                    {service.status.toUpperCase()}
                  </span>
                </div>

                {/* This now works perfectly because we typed installationType correctly! */}
                <Timeline installationType={service.installationType} />
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500">No active services found.</p>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Technical Support</h2>
          <p className="text-slate-400 mb-6">Experience an issue? Log a ticket with our 24/7 team.</p>
          {/* SupportForm component code here */}
        </div>
      </div>
    </PageLayout>
  );
}
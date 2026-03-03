import React, { useState, useRef } from 'react';
import { mockUser } from '../../lib/mock-data';
import { User as UserType, Invoice, UserDocument, SupportTicket } from '../../types';
import { Button } from '../ui/Button';
import { Wifi, CreditCard, Network, Download, Upload, FileText, Sun, Moon, Settings, LifeBuoy, LogOut } from 'lucide-react';
import InstallationTracker from './InstallationTracker';
import Support from './Support';
import { useAuth } from '../../auth/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState<UserType>(mockUser);
  const [isDarkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTracker, setShowTracker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploaded file:', file.name);
    }
  };

  const onFileSelect = () => {
    fileInputRef.current?.click();
  }

  const handleSubmitTicket = (subject: string, message: string) => {
    const newTicket: SupportTicket = {
        id: `tkt_${Date.now()}`,
        subject,
        message,
        status: 'open',
        date: new Date().toISOString().split('T')[0],
        replies: [],
    };
    setUser(currentUser => ({
        ...currentUser!,
        tickets: [newTicket, ...currentUser!.tickets],
    }));
  };

  const activeSubscription = user.subscriptions[0];
  const { service, dataUsage } = activeSubscription;
  const order = user.orders[0];

  const downloadSpeed = 'speedDown' in service ? service.speedDown : 'N/A';
  const uploadSpeed = 'speedUp' in service ? service.speedUp : 'N/A';
  const price = 'price' in service ? `$${service.price}/mo` : 'N/A';
  
  const renderContent = () => {
    if (showTracker) {
        return <InstallationTracker order={order} onBack={() => setShowTracker(false)} />
    }

    switch (activeTab) {
        case 'dashboard':
            return renderDashboard();
        case 'support':
            return <Support tickets={user.tickets} onSubmitTicket={handleSubmitTicket} />;
        default:
            return renderDashboard();
    }
  }

  const renderDashboard = () => (
    <>
        {activeSubscription.contractType === 'prepaid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                 <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className="text-xl font-semibold">Internet Usage</h3>
                    {/* A placeholder for the graph */}
                    <div className="h-32 mt-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex justify-between mt-4">
                        <div>
                            <p className="text-gray-400">Download</p>
                            <p className="font-bold text-lg">{dataUsage?.used} GB</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Upload</p>
                            <p className="font-bold text-lg">{dataUsage?.total} GB</p>
                        </div>
                    </div>
                </div>
                <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className="text-xl font-semibold">Remaining Days</h3>
                    <div className="flex items-center justify-center mt-4">
                         <div className="relative">
                            <svg className="w-24 h-24">
                                <circle className="text-gray-300" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                                <circle className="text-blue-500" strokeWidth="10" strokeDasharray="251" strokeDashoffset={251 - (251 * (activeSubscription.remainingDays || 0) / 30)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">{activeSubscription.remainingDays}</div>
                            </svg>
                        </div>
                    </div>
                    <Button variant="primary" className="w-full mt-4">Pay Advance</Button>
                </div>
                <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h3 className="text-xl font-semibold">Internet subscription</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="text-gray-400">Download</p>
                            <p className="font-bold text-lg">{downloadSpeed} Mbps</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Upload</p>
                            <p className="font-bold text-lg">{uploadSpeed} Mbps</p>
                        </div>
                    </div>
                    <Button variant="primary" className="w-full mt-4">Recharge Now</Button>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">Invoices</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-right p-2"></th>
                </tr>
              </thead>
              <tbody>
                {user.invoices.map((invoice: Invoice) => (
                  <tr key={invoice.id} className="border-b last:border-0">
                    <td className="p-2">{invoice.date}</td>
                    <td className="p-2">R{invoice.amount.toFixed(2)}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${invoice.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="text-right p-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(invoice.url, '_blank')}>
                        <Download size={16} className="mr-2" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">My Documents</h3>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            <Button onClick={onFileSelect} className="w-full mb-4">
              <Upload size={16} className="mr-2" />
              Upload Document
            </Button>
            <div>
              {user.documents.map((doc: UserDocument) => (
                <div key={doc.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-400">{doc.type} - {doc.uploadDate}</p>
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Download size={20} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <aside className={`w-64 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" onClick={() => setActiveTab('dashboard')} className={`flex items-center space-x-3 p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <Wifi size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" onClick={() => setActiveTab('billings')} className={`flex items-center space-x-3 p-2 rounded-lg ${activeTab === 'billings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <FileText size={20} />
            <span>Billings</span>
          </a>
          <a href="#" onClick={() => setActiveTab('support')} className={`flex items-center space-x-3 p-2 rounded-lg ${activeTab === 'support' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            <LifeBuoy size={20} />
            <span>Support</span>
          </a>
        </nav>
        <div className="mt-auto">
          <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer" onClick={() => setDarkMode(!isDarkMode)}>
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mt-4">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hi {authUser?.displayName || 'there'}, Welcome Back</h1>
          <div className="flex items-center space-x-4">
            <Button variant="primary" onClick={() => setShowTracker(true)}>Track Order</Button>
            <Button variant="secondary" onClick={handleSignOut}>
                <LogOut size={20} className="mr-2" />
                Sign Out
            </Button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;

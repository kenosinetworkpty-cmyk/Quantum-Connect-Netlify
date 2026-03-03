import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  'Dashboard',
  'Invoices & Billing',
  'Support Tickets',
  'Document Uploads',
  'Personal Details',
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item} className="mb-4">
              <a
                href="#"
                className={`block py-2 px-4 rounded ${activeTab === item ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

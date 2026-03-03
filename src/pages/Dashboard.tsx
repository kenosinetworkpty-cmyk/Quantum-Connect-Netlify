import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { FibrePrepaidDashboard } from '../components/dashboard/fibre/FibrePrepaidDashboard';
import { Invoices } from '../components/dashboard/invoices/Invoices';
import { SupportTickets } from '../components/dashboard/support/SupportTickets';
import { DocumentUploads } from '../components/dashboard/documents/DocumentUploads';
import { PersonalDetailsForm } from '../components/dashboard/personal-details/PersonalDetailsForm';
import { usePersonalDetails } from '../services/usePersonalDetails';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { personalDetails, updatePersonalDetails, isLoading, error } = usePersonalDetails();

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <FibrePrepaidDashboard />;
      case 'Invoices & Billing':
        return <Invoices />;
      case 'Support Tickets':
        return <SupportTickets />;
      case 'Document Uploads':
        return <DocumentUploads />;
      case 'Personal Details':
        if (isLoading && !personalDetails) {
          return <p>Loading personal details...</p>;
        }
        return personalDetails ? (
          <PersonalDetailsForm
            details={personalDetails}
            onSubmit={updatePersonalDetails}
            isLoading={isLoading}
          />
        ) : (
          <p>Could not load personal details.</p>
        );
      default:
        return <FibrePrepaidDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 bg-gray-100">
        {renderContent()}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
};

export default Dashboard;

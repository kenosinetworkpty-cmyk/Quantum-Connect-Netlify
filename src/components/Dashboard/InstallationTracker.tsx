import React from 'react';
import { Order } from '../../types';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface InstallationTrackerProps {
  order: Order;
  onBack: () => void;
}

const InstallationTracker: React.FC<InstallationTrackerProps> = ({ order, onBack }) => {
  const getStatusIcon = (status: 'completed' | 'pending' | 'next') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'next':
        return <Circle className="w-8 h-8 text-gray-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">{order.service.name}</h3>
          <p className="text-gray-500 dark:text-gray-400">Order ID: {order.id}</p>
          <p className="text-gray-500 dark:text-gray-400">Order Date: {order.date}</p>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="text-blue-500 hover:underline">&lt; Back</a>
      </div>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

        {order.timeline.map((step, index) => (
          <div key={index} className="flex items-start mb-8 ml-4 relative">
            <div className="absolute left-[-15px] top-0 z-10 bg-white dark:bg-gray-800">
                {getStatusIcon(step.status)}
            </div>
            <div className="ml-8">
              <h4 className="font-semibold text-lg">{step.name}</h4>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstallationTracker;

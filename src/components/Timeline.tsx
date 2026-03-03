import React from 'react';

interface TimelineProps {
  installationType: 'new' | 'existing';
}

const newInstallationSteps = [
  'Order Confirmed',
  'Installation Scheduled',
  'Router Dispatched',
  'Activation In Progress',
  'Fibre Active',
];

const existingInstallationSteps = [
  'Order Confirmed',
  'Router Dispatched',
  'Activation In Progress',
  'Fibre Active',
];

export const Timeline: React.FC<TimelineProps> = ({ installationType }) => {
  const steps = installationType === 'new' ? newInstallationSteps : existingInstallationSteps;

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Timeline</h3>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {steps.map((step, index) => (
          <li className="mb-10 ml-4" key={index}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Step {index + 1}</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
};
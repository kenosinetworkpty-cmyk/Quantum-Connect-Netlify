
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${index + 1 <= currentStep ? 'bg-green-500' : 'bg-gray-300'}`}>
              {index + 1}
            </div>
            <div className={`ml-2 ${index + 1 <= currentStep ? 'text-green-600' : 'text-gray-500'}`}>{step}</div>
          </div>
          {index < steps.length - 1 && <div className="w-12 h-1 bg-gray-300" />} 
        </React.Fragment>
      ))}
    </div>
  );
};

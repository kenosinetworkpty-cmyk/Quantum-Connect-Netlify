import React, { useState } from 'react';
import { PricingGrid } from './PricingGrid';
import { Button } from './ui/Button';
import { Package, Provider } from '../types';

interface FibrePlanSelectionProps {
  packages: Package[];
  providers: Provider[];
  filteredProviders: string[];
}

export const FibrePlanSelection: React.FC<FibrePlanSelectionProps> = ({ packages, providers, filteredProviders }) => {
  const [planType, setPlanType] = useState<'prepaid' | 'month-to-month' | null>(null);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Plan Type</h2>
        <div className="flex justify-center gap-4">
          <Button 
            variant={planType === 'prepaid' ? 'primary' : 'secondary'} 
            onClick={() => setPlanType('prepaid')}
          >
            Prepaid
          </Button>
          <Button 
            variant={planType === 'month-to-month' ? 'primary' : 'secondary'} 
            onClick={() => setPlanType('month-to-month')}
          >
            Month-to-Month
          </Button>
        </div>
      </div>

      {planType && (
        <PricingGrid
          providers={providers}
          packages={packages}
          planType={planType}
          filteredProviders={filteredProviders}
        />
      )}
    </div>
  );
};
import React from 'react';
import { FibrePrepaid } from './fibrePrepaidTypes';
import { Button } from '../../ui/Button';
import { Progress } from '../../ui/Progress';

interface PrepaidDashboardCardProps {
  prepaidData: FibrePrepaid;
  onUpgrade: () => void;
  onTopUp: () => void;
}

export const PrepaidDashboardCard = ({ prepaidData, onUpgrade, onTopUp }: PrepaidDashboardCardProps) => {
  const { remainingDays, expiryDate, creditsBalance, planSpeed } = prepaidData;

  const progressValue = (remainingDays / 30) * 100; // Assuming a 30-day cycle

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Prepaid Fibre</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-gray-900">{remainingDays}</p>
            <p className="text-lg text-gray-600">Days Remaining</p>
            <p className="text-sm text-gray-500 mt-1">Expires on: {new Date(expiryDate?.toDate()).toLocaleDateString()}</p>
          </div>
          <Progress value={progressValue} />
        </div>
        <div>
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-900">Current Plan: {planSpeed}</p>
            <p className="text-lg text-gray-600">Credits Balance: R{creditsBalance.toFixed(2)}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button onClick={onTopUp}>Top Up / Pay in Advance</Button>
            <Button onClick={onUpgrade} variant="outline">Upgrade to Month-to-Month</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

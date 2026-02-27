
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '../ui/PageLayout';

export const ShopConfirmation: React.FC = () => {
  return (
    <PageLayout title="Congratulations on your purchase">
      <div className="text-center">
        <p className="text-lg text-slate-600 mb-8">Your order has been successfully processed. You will receive a confirmation email shortly.</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300">Return to Home</Link>
          <Link to="/shop" className="bg-slate-200 text-slate-800 py-3 px-6 rounded-lg text-lg hover:bg-slate-300 transition-colors duration-300">Continue Shopping</Link>
        </div>
      </div>
    </PageLayout>
  );
};

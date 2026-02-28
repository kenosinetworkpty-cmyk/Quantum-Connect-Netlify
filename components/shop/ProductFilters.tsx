
import React from 'react';

export const ProductFilters: React.FC = () => {
  const categories = ['All', 'Compact Battery Backup', 'Portable Power Stations', 'Portable Power Banks'];
  const availability = ['In Stock', 'Out of Stock'];

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5">
      <div className="bg-slate-100 p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">{category}</a>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-slate-200" />

        <h3 className="font-bold text-lg mb-4">Availability</h3>
        <ul className="space-y-2">
          {availability.map(status => (
            <li key={status} className="flex items-center">
              <input type="checkbox" id={status} name={status} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label htmlFor={status} className="ml-2 text-slate-600">{status}</label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

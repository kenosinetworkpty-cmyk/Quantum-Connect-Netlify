import React from 'react';

interface TimelineEvent {
  name: string;
  status: 'complete' | 'in-progress' | 'pending';
}

interface TimelineETAProps {
  events: TimelineEvent[];
}

const getStatusIcon = (status: TimelineEvent['status']) => {
  switch (status) {
    case 'complete':
      return <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
    case 'in-progress':
      return <svg className="w-6 h-6 text-yellow-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>;
    case 'pending':
      return <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    default:
      return null;
  }
};

export const TimelineETA = ({ events }: TimelineETAProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Installation Timeline</h3>
      <div className="relative">
        {events.map((event, index) => (
          <div key={index} className="flex items-start mb-8">
            <div className="flex flex-col items-center mr-6">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {getStatusIcon(event.status)}
              </div>
              {index < events.length - 1 && (
                <div className="w-px h-16 bg-gray-200 mt-2"></div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{event.name}</p>
              <p className="text-sm text-gray-600 capitalize">{event.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

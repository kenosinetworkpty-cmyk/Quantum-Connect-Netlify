
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Download, Search, ChevronDown, CheckCircle, Clock, AlertTriangle, User, Building, Briefcase, Calendar, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react';

// Mock data for submissions
const mockSubmissions = [
    {
        id: 1, name: 'Alice Johnson', company: 'Innovate LLC', service: 'Cloud PBX', status: 'Analyzed', summary: 'Seeking scalable PBX for 50 users.',
        details: { email: 'alice@innovate.com', phone: '+123456789', time: '2023-10-28 10:00', notes: 'Interested in integration with our CRM.' },
        aiAnalysis: { summary: 'High-value lead seeking a comprehensive Cloud PBX solution for a mid-sized company. CRM integration is a key requirement. Urgency appears moderate.', quality: 'High Value', action: 'Prioritize and assign to senior sales rep.', intent: 'Purchase', spam: false }
    },
    {
        id: 2, name: 'Bob Williams', company: 'Solutions Corp', service: 'SIP Trunking', status: 'Pending', summary: 'Wants to connect existing PBX.', 
        details: { email: 'bob@solutions.com', phone: '+198765432', time: '2023-10-29 14:00', notes: 'Looking for better rates and reliability.' },
        aiAnalysis: null
    },
    {
        id: 3, name: 'Charlie Brown', company: 'Self-Employed', service: 'Other', status: 'Spam', summary: 'Offering SEO services.', 
        details: { email: 'charlie@seo.com', phone: '+112233445', time: 'N/A', notes: 'Guaranteed first page ranking!' },
        aiAnalysis: { summary: 'This is a solicitation for SEO services, not a genuine VoIP inquiry.', quality: 'Spam', action: 'Mark as spam and delete.', intent: 'Spam', spam: true }
    }
];

const StatusBadge = ({ status }) => {
    const styles = {
        Analyzed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Spam: 'bg-red-100 text-red-800'
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const SubmissionCard = ({ submission, onView }) => (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-gray-900">{submission.company}</h3>
                <p className="text-sm text-gray-600">{submission.name}</p>
            </div>
            <StatusBadge status={submission.status} />
        </div>
        <p className="text-sm text-gray-700 mt-3"><strong>Service:</strong> {submission.service}</p>
        <p className="text-sm text-gray-500 mt-2 italic">{submission.summary}</p>
        <div className="mt-4 flex justify-end">
            <button onClick={() => onView(submission)} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                <Eye size={16} className="mr-1" /> View Details
            </button>
        </div>
    </div>
);

const DetailView = ({ submission, onBack, onMarkContacted, onMarkSpam, onAddNote }) => (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to Submissions
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Analysis Section (Left) */}
            <div className="md:col-span-1 border-r pr-8">
                <h3 className="font-bold text-xl text-gray-800 mb-4">AI Analysis Status</h3>
                {submission.aiAnalysis ? (
                    <>
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle size={20} className="text-green-500" />
                            <span className="font-semibold text-green-700">Analyzed</span>
                        </div>
                        <div className="space-y-5 text-sm">
                            <div>
                                <h4 className="font-semibold text-gray-600">AI Summary</h4>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md mt-1">{submission.aiAnalysis.summary}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-gray-600">Lead Quality</h4>
                                <p className={`font-bold p-2 rounded-md mt-1 ${submission.aiAnalysis.quality === 'High Value' ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>{submission.aiAnalysis.quality}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-600">Recommended Action</h4>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md mt-1">{submission.aiAnalysis.action}</p>
                            </div>
                        </div>
                    </>
                ) : (
                     <div className="flex items-center gap-2 mb-4">
                        <Clock size={20} className="text-yellow-500" />
                        <span className="font-semibold text-yellow-700">Pending Analysis</span>
                    </div>
                )}
            </div>

            {/* Submission Details Section (Middle) */}
            <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-xl text-gray-800">Submission Details</h3>
                     <StatusBadge status={submission.status} />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="flex items-center"><User size={14} className="text-gray-500 mr-2"/><strong>Name:</strong> <span className="ml-2 text-gray-700">{submission.name}</span></div>
                    <div className="flex items-center"><Building size={14} className="text-gray-500 mr-2"/><strong>Company:</strong><span className="ml-2 text-gray-700">{submission.company}</span></div>
                    <div className="flex items-center"><Mail size={14} className="text-gray-500 mr-2"/><strong>Email:</strong><span className="ml-2 text-gray-700">{submission.details.email}</span></div>
                    <div className="flex items-center"><Phone size={14} className="text-gray-500 mr-2"/><strong>Phone:</strong><span className="ml-2 text-gray-700">{submission.details.phone}</span></div>
                    <div className="flex items-center"><Briefcase size={14} className="text-gray-500 mr-2"/><strong>Service:</strong><span className="ml-2 text-gray-700">{submission.service}</span></div>
                    <div className="flex items-center"><Calendar size={14} className="text-gray-500 mr-2"/><strong>Preferred Time:</strong><span className="ml-2 text-gray-700">{submission.details.time}</span></div>
                    <div className="col-span-2 flex items-start"><MessageSquare size={14} className="text-gray-500 mr-2 mt-1"/><strong>Notes:</strong><p className="ml-2 text-gray-700 bg-gray-50 p-2 rounded w-full">{submission.details.notes}</p></div>
                </div>

                {/* Internal Controls */}
                <div className="mt-8 pt-6 border-t">
                     <h4 className="font-semibold text-gray-700 mb-3">Internal Controls</h4>
                    <div className="flex gap-4 mb-4">
                        <button onClick={onMarkContacted} className="text-sm font-medium bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Mark as Contacted</button>
                        <button onClick={onMarkSpam} className="text-sm font-medium bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Mark as Spam</button>
                    </div>
                    <textarea placeholder="Add internal notes..." className="w-full border rounded-lg p-2 text-sm" rows={3}></textarea>
                     <button onClick={onAddNote} className="text-sm font-medium bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mt-2">Add Note</button>
                </div>
            </div>
        </div>
    </div>
);

export const AdminDashboard: React.FC = () => {
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [filter, setFilter] = useState('All');

    const filteredSubmissions = submissions.filter(s => filter === 'All' || s.status === filter);

    if (selectedSubmission) {
        return <DetailView 
            submission={selectedSubmission} 
            onBack={() => setSelectedSubmission(null)}
            onMarkContacted={() => { /* Logic here */ }}
            onMarkSpam={() => { /* Logic here */ }}
            onAddNote={() => { /* Logic here */ }}
        />;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">AI Consultation Dashboard</h1>
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center"><Download size={18} className="mr-2"/> Export to CSV</button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex justify-between">
                <div className="flex gap-2">
                    {['All', 'Analyzed', 'Pending', 'Spam'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}>{f}</button>
                    ))}
                </div>
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search submissions..." className="pl-10 pr-4 py-2 border rounded-lg"/>
                </div>
            </div>

            {/* Submission List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map(sub => (
                    <SubmissionCard key={sub.id} submission={sub} onView={setSelectedSubmission} />
                ))}
            </div>
        </div>
    );
};

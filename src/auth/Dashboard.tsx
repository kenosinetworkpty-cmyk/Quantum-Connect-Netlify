import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MyFiles from '../components/Dashboard/MyFiles';
import MyNotes from '../components/Dashboard/MyNotes';
import TeamMembers from '../components/Dashboard/TeamMembers';

const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('files');

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'files':
        return <MyFiles />;
      case 'notes':
        return <MyNotes />;
      case 'team':
        return <TeamMembers />;
      default:
        return <MyFiles />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">VaultFlow</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white p-4 border-r border-gray-200">
          <nav className="flex flex-col space-y-2">
            <button onClick={() => setActiveTab('files')} className={`p-2 rounded-md text-left ${activeTab === 'files' ? 'bg-gray-200' : ''}`}>My Files</button>
            <button onClick={() => setActiveTab('notes')} className={`p-2 rounded-md text-left ${activeTab === 'notes' ? 'bg-gray-200' : ''}`}>My Notes</button>
            <button onClick={() => setActiveTab('team')} className={`p-2 rounded-md text-left ${activeTab === 'team' ? 'bg-gray-200' : ''}`}>Team Members</button>
          </nav>
        </aside>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

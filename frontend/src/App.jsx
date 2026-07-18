import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTasks } from './context/TaskContext';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { error, tasks, loading } = useTasks();
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if backend server connection has failed
  // If loading has ended, we have no tasks, and there is a database/connection error, show troubleshooting
  const isConnectionOffline = !loading && tasks.length === 0 && error;

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">

        
        {/* Toast Notifier */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            className: 'text-sm font-semibold border border-slate-200/50 dark:border-slate-800/80 shadow-md backdrop-blur-md',
          }}
        />

        {/* Top Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Core Layout Grid */}
        <div className="flex flex-1 w-full max-w-8xl mx-auto">
          {/* Collapsible Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Panel Content Area */}
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 w-full min-w-0 transition-all duration-300">
            {isConnectionOffline ? (
              <ServerError />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/error" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

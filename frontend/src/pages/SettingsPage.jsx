import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';
import { FiSun, FiMoon, FiTrash2, FiTag, FiUser, FiInfo, FiSliders, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { categories, tasks, fetchTasks } = useTasks();
  const [resetting, setResetting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

  // Count of tasks per category for details
  const getCategoryCount = (catName) => {
    return tasks.filter((t) => t.category.toLowerCase() === catName.toLowerCase()).length;
  };

  const handleResetData = async () => {
    if (window.confirm('WARNING: Are you sure you want to clear all tasks in your database? This action cannot be undone.')) {
      setResetting(true);
      try {
        // Delete each task sequentially or call a delete-all route.
        // Since we don't have a direct DELETE ALL endpoint, we delete each task
        const deletePromises = tasks.map((t) => axios.delete(`${API_URL}/${t._id}`));
        await Promise.all(deletePromises);
        toast.success('Database cleared successfully!', { icon: '🧹' });
        fetchTasks();
      } catch (err) {
        console.error('Error resetting database:', err);
        toast.error('Failed to clear database tasks.');
      } finally {
        setResetting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* Title */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight margin-none">
          Application Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your theme, categories, profile details, and preferences.
        </p>
      </div>

      {/* Grid of Settings sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Navigation Sidebar inside page */}
        <div className="md:col-span-1 flex flex-col gap-2 text-left bg-white/40 dark:bg-slate-900/10 p-2 rounded-2xl border border-slate-200/30 dark:border-slate-800/30">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-1">Sections</span>
          <button className="flex items-center gap-3 px-3 py-2 bg-blue-50/50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400 rounded-xl text-sm font-bold">
            <FiSliders className="h-4 w-4" />
            <span>Preferences</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100/40 dark:hover:bg-slate-800/40 rounded-xl text-sm font-bold transition-all">
            <FiUser className="h-4 w-4" />
            <span>Account Profile</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100/40 dark:hover:bg-slate-800/40 rounded-xl text-sm font-bold transition-all">
            <FiShield className="h-4 w-4" />
            <span>Security & API</span>
          </button>
        </div>

        {/* Settings panels content */}
        <div className="md:col-span-2 space-y-6 text-left">
          {/* Theme card */}
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/20 dark:shadow-none space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiSun className="h-4 w-4" /> Appearance Theme
            </h3>
            <p className="text-xs text-slate-500">Toggle between Light mode and Dark mode layouts.</p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => { if (isDark) toggleTheme(); }}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  !isDark
                    ? 'border-blue-500 bg-blue-500/5 text-blue-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FiSun className="h-6 w-6 text-amber-500" />
                <span className="text-xs font-bold">Light Theme</span>
              </button>

              <button
                onClick={() => { if (!isDark) toggleTheme(); }}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  isDark
                    ? 'border-blue-400 bg-blue-500/10 text-blue-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55 dark:hover:bg-slate-800/30 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FiMoon className="h-6 w-6 text-indigo-400" />
                <span className="text-xs font-bold">Dark Theme</span>
              </button>
            </div>
          </div>

          {/* Categories tag management */}
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/20 dark:shadow-none space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FiTag className="h-4 w-4" /> Category Density
            </h3>
            <p className="text-xs text-slate-500">View tasks count across all category tags.</p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {categories.filter(c => c !== 'All').map((cat) => {
                const count = getCategoryCount(cat);
                return (
                  <div
                    key={cat}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/40 dark:border-slate-800/40 text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize"
                  >
                    <span>{cat}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset database card */}
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/20 dark:shadow-none space-y-4">
            <h3 className="text-base font-extrabold text-red-500 dark:text-red-400 flex items-center gap-2">
              <FiTrash2 className="h-4 w-4" /> Danger Zone
            </h3>
            <p className="text-xs text-slate-500">Permanently delete all tasks stored in the MongoDB database.</p>
            
            <div className="pt-2">
              <button
                onClick={handleResetData}
                disabled={resetting || tasks.length === 0}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-650 dark:bg-red-500/10 dark:hover:bg-red-500/25 border dark:border-red-500/30 text-white dark:text-red-300 rounded-xl text-sm font-bold shadow-md shadow-red-500/10 hover:shadow-red-500/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {resetting ? 'Resetting Database...' : 'Clear All Tasks'}
              </button>
            </div>
          </div>

          {/* App Info card */}
          <div className="bg-white/75 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/20 dark:shadow-none flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
              <FiInfo className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">System Information</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                TaskFlow Application v1.0.0. Connected to REST API on port 5000. Operating Database: MongoDB. Styling configured with Tailwind CSS v4 and dynamic layout motion handles.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;

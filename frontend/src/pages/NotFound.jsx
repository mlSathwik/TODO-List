import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiHelpCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        {/* Floating gradient rings background */}
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-purple-500/5 rounded-full blur-2xl scale-150 animate-pulse"></div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative z-10 font-extrabold text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-blue-600 via-purple-650 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent select-none"
        >
          404
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-md space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
          Lost in Space?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist, has been relocated, or is temporarily offline. Check the web address or head back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-650 hover:from-blue-600 hover:to-purple-750 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all cursor-pointer"
          >
            <FiHome className="h-4.5 w-4.5" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            to="/tasks"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHelpCircle className="h-4.5 w-4.5" />
            <span>View Tasks List</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

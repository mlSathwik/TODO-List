import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiRefreshCw, FiAlertTriangle, FiWifiOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ServerError = () => {
  const { fetchTasks } = useTasks();
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    await fetchTasks();
    // Delay slightly to feel professional
    setTimeout(() => {
      setRetrying(false);
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl scale-125"></div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-red-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-red-500/20 relative z-10 animate-float">
          <FiWifiOff className="h-8 w-8 stroke-[1.8]" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
          Connection Interrupted
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The application is unable to connect to the REST API server.
        </p>

        {/* Informative box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 text-left space-y-2">
          <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
            <FiAlertTriangle className="text-amber-500" /> Troubleshooting Tips
          </span>
          <ul className="text-[11px] text-slate-500 space-y-1 pl-4 list-disc leading-relaxed">
            <li>Ensure the backend Node.js server is started on port 5000 (`npm run dev` or `npm start`).</li>
            <li>Ensure MongoDB is running locally on `mongodb://localhost:27017` or configured via `backend/.env`.</li>
            <li>Verify your internet connection and network proxies.</li>
          </ul>
        </div>

        <div className="pt-4 flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleRetry}
            disabled={retrying}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-650 hover:from-blue-600 hover:to-purple-750 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiRefreshCw className={`h-4.5 w-4.5 ${retrying ? 'animate-spin' : ''}`} />
            <span>{retrying ? 'Reconnecting...' : 'Retry Connection'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServerError;

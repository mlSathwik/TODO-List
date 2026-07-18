import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiPlus } from 'react-icons/fi';

const EmptyState = ({ title = 'No tasks found', description = 'Get started by creating a new task to organize your day.', onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-[24px] border border-dashed border-slate-300 dark:border-slate-800 bg-white/20 dark:bg-slate-900/10 backdrop-blur-sm max-w-lg mx-auto"
    >
      <div className="relative mb-6">
        {/* Floating gradient rings background */}
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl scale-125"></div>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 relative z-10 animate-float">
          <FiCheckSquare className="h-8 w-8 stroke-[1.8]" />
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-sm">
        {description}
      </p>

      {onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-755 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all cursor-pointer"
        >
          <FiPlus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Your First Task</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;

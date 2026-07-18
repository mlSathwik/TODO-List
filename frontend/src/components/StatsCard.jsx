import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, colorClass, description }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[20px] p-6 backdrop-blur-md shadow-md shadow-slate-100/30 dark:shadow-none flex items-center justify-between text-left"
    >
      <div className="flex flex-col gap-1 w-full min-w-0">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {value}
          </span>
        </div>
        {description && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium truncate">
            {description}
          </span>
        )}
      </div>

      <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${colorClass} text-white shadow-lg shadow-blue-500/5 flex-shrink-0`}>
        <Icon className="h-6 w-6" />
      </div>
    </motion.div>
  );
};

export default StatsCard;

import React from 'react';
import { useTasks } from '../context/TaskContext';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiFlag, FiTag, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
  const { tasks, categories, getStats } = useTasks();
  const stats = getStats();

  // 1. Calculate Priority distribution
  const highTasks = tasks.filter((t) => t.priority === 'High');
  const medTasks = tasks.filter((t) => t.priority === 'Medium');
  const lowTasks = tasks.filter((t) => t.priority === 'Low');

  const priorityCounts = {
    High: highTasks.length,
    Medium: medTasks.length,
    Low: lowTasks.length,
  };

  const priorityCompleted = {
    High: highTasks.filter((t) => t.status === 'Completed').length,
    Medium: medTasks.filter((t) => t.status === 'Completed').length,
    Low: lowTasks.filter((t) => t.status === 'Completed').length,
  };

  const maxPriorityCount = Math.max(...Object.values(priorityCounts), 1);

  // 2. Calculate Category distribution
  const categoryStats = categories
    .filter((cat) => cat !== 'All')
    .map((cat) => {
      const catTasks = tasks.filter((t) => t.category.toLowerCase() === cat.toLowerCase());
      const total = catTasks.length;
      const completed = catTasks.filter((t) => t.status === 'Completed').length;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { name: cat, total, completed, rate };
    })
    // Sort by volume of tasks
    .sort((a, b) => b.total - a.total);

  const maxCategoryCount = Math.max(...categoryStats.map((c) => c.total), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Title */}
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight margin-none">
          Productivity Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics illustrating your task category volume and priority progress.
        </p>
      </div>

      {/* Grid Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Priority Analysis Card */}
        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/25 dark:shadow-none text-left space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
              <FiFlag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white">Priority Volume Breakdown</h3>
              <p className="text-[11px] text-slate-500">Tasks grouped by critical impact priority levels.</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* High Priority Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                <span className="text-red-500">High Priority</span>
                <span>{priorityCounts.High} tasks ({priorityCompleted.High} completed)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(priorityCounts.High / maxPriorityCount) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-red-400 to-red-650 rounded-full"
                />
              </div>
            </div>

            {/* Medium Priority Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                <span className="text-orange-500">Medium Priority</span>
                <span>{priorityCounts.Medium} tasks ({priorityCompleted.Medium} completed)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(priorityCounts.Medium / maxPriorityCount) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                />
              </div>
            </div>

            {/* Low Priority Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                <span className="text-slate-500 dark:text-slate-400">Low Priority</span>
                <span>{priorityCounts.Low} tasks ({priorityCompleted.Low} completed)</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(priorityCounts.Low / maxPriorityCount) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance Card */}
        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-6 backdrop-blur-md shadow-md shadow-slate-100/25 dark:shadow-none text-left space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200/40 dark:border-slate-800/40 pb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
              <FiTag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white">Category Completion Stats</h3>
              <p className="text-[11px] text-slate-500">Volume and performance percentage across tags.</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {categoryStats.length > 0 ? (
              categoryStats.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="capitalize">{cat.name}</span>
                    <span>
                      {cat.completed}/{cat.total} completed ({cat.rate}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.rate}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-650 rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-slate-500 py-10">
                Create tasks with categories to analyze tag performance.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[20px] p-5 backdrop-blur-md text-left flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
            <FiCheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tasks Completed</span>
            <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mt-0.5">{stats.completed}</h4>
            <p className="text-xs text-slate-500 mt-1">Items successfully processed and archived.</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[20px] p-5 backdrop-blur-md text-left flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
            <FiTrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Pending Backlog</span>
            <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mt-0.5">{stats.pending}</h4>
            <p className="text-xs text-slate-500 mt-1">Remaining tasks currently awaiting action.</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[20px] p-5 backdrop-blur-md text-left flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center flex-shrink-0">
            <FiBarChart2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Active Items</span>
            <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mt-0.5">{stats.total}</h4>
            <p className="text-xs text-slate-500 mt-1">Combined sum of all tasks in history.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;

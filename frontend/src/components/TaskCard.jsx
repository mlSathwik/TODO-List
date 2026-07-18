import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiEdit2, FiTrash2, FiCheck, FiAlertTriangle, FiTag } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { toggleTaskComplete } = useTasks();

  const isCompleted = task.status === 'Completed';
  
  // Calculate if task is overdue
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  const isOverdue = !isCompleted && due < now;

  // Format dates
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const priorityColors = {
    High: 'bg-red-500/10 text-red-650 dark:text-red-350 border-red-500/20 dark:border-red-500/30',
    Medium: 'bg-orange-500/10 text-orange-650 dark:text-orange-350 border-orange-500/20 dark:border-orange-500/30',
    Low: 'bg-slate-500/10 text-slate-650 dark:text-slate-400 border-slate-500/20 dark:border-slate-800',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative rounded-2xl p-5 border text-left flex flex-col justify-between h-full transition-all duration-300 ${
        isCompleted
          ? 'bg-emerald-50/15 dark:bg-emerald-950/10 border-emerald-500/25 dark:border-emerald-500/20 shadow-sm shadow-emerald-500/5'
          : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/60 shadow-md shadow-slate-100/30 dark:shadow-none'
      } backdrop-blur-md`}
    >
      <div className="flex flex-col gap-3">
        {/* Top Badges and Action Buttons */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Status Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-500/25'
                  : 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 border-amber-500/25'
              }`}
            >
              {task.status}
            </span>

            {/* Priority Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                priorityColors[task.priority] || priorityColors.Medium
              }`}
            >
              {task.priority} Priority
            </span>
          </div>

          {/* Quick Edit/Delete Buttons */}
          <div className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              title="Edit Task"
            >
              <FiEdit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              title="Delete Task"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Task Title & Description */}
        <div className="flex gap-3 items-start mt-1">
          {/* Circular Completion Checkbox */}
          <button
            onClick={() => toggleTaskComplete(task)}
            className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-transparent'
            }`}
          >
            {isCompleted && <FiCheck className="h-3.5 w-3.5 stroke-[3]" />}
          </button>

          <div className="flex flex-col gap-1 w-full min-w-0">
            <h3
              className={`font-bold text-base leading-snug break-words transition-all duration-300 ${
                isCompleted
                  ? 'text-slate-400 dark:text-slate-500 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs leading-relaxed line-clamp-3 ${
                  isCompleted
                    ? 'text-slate-400 dark:text-slate-500 line-through opacity-75'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Task Footer: Category, Date, Actions */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between gap-2">
        {/* Category Badge */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 select-none">
          <FiTag className="h-3 w-3 text-slate-400" />
          <span className="text-[11px] font-bold tracking-wide capitalize">{task.category}</span>
        </div>

        {/* Due Date Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold border ${
            isCompleted
              ? 'bg-slate-50/50 dark:bg-slate-800/10 border-transparent text-slate-400 dark:text-slate-500'
              : isOverdue
              ? 'bg-red-500/10 border-red-500/10 text-red-500 dark:text-red-400 animate-pulse'
              : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200/40 dark:border-slate-800/40 text-slate-500 dark:text-slate-400'
          }`}
          title={isOverdue ? 'This task is overdue!' : 'Due Date'}
        >
          {isOverdue ? (
            <FiAlertTriangle className="h-3 w-3 text-red-500 dark:text-red-400" />
          ) : (
            <FiCalendar className="h-3 w-3" />
          )}
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;

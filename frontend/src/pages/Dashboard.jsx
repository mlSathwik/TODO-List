import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiList, FiClock, FiCheckCircle, FiAlertTriangle, FiPlus, FiArrowRight, FiActivity } from 'react-icons/fi';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { tasks, getStats, deleteTask } = useTasks();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const stats = getStats();

  // Get up to 3 recent pending tasks
  const recentPendingTasks = tasks
    .filter((t) => t.status === 'Pending')
    .slice(0, 3);

  // Get overdue tasks to show in a warning banner
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const overdueTasksList = tasks.filter((t) => {
    if (t.status === 'Completed') return false;
    return new Date(t.dueDate) < now;
  });

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDeleteTrigger = (id) => {
    const task = tasks.find((t) => t._id === id);
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask._id);
      setIsDeleteOpen(false);
      setSelectedTask(null);
    }
  };

  // SVG Circle calculations
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.completionRate / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight margin-none text-left">
            Workspace Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-left">
            Here's an overview of your productivity metrics and task pipeline.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateOpen(true)}
          className="self-start sm:self-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-650 hover:from-blue-600 hover:to-purple-750 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <FiPlus className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>New Task</span>
        </motion.button>
      </div>

      {/* Overdue Warning Panel */}
      {overdueTasksList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-[20px] bg-red-500/10 dark:bg-red-500/5 border border-red-500/20 text-red-700 dark:text-red-400 flex items-start gap-3.5 text-left"
        >
          <FiAlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0 animate-bounce" />
          <div className="flex-1 min-w-0">
            <span className="font-extrabold text-sm">Action Required: {overdueTasksList.length} task(s) are overdue!</span>
            <p className="text-xs text-red-650/80 dark:text-red-400/80 mt-0.5">
              Review and reschedule items that have passed their target due date to keep your productivity high.
            </p>
          </div>
          <Link
            to="/tasks"
            className="text-xs font-bold underline hover:text-red-800 dark:hover:text-red-300 flex-shrink-0 self-center"
          >
            Reschedule
          </Link>
        </motion.div>
      )}

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={FiList}
          colorClass="from-blue-500 to-blue-600"
          description="In database"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={FiClock}
          colorClass="from-amber-500 to-orange-500"
          description="To be completed"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={FiCheckCircle}
          colorClass="from-emerald-500 to-green-600"
          description="Successfully finished"
        />
        <StatsCard
          title="Overdue"
          value={stats.overdue}
          icon={FiAlertTriangle}
          colorClass="from-red-500 to-red-650"
          description="Passed due date"
        />
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={FiActivity}
          colorClass="from-purple-500 to-pink-600"
          description="Average productivity"
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Recent Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Recent Pending Tasks
            </h2>
            <Link
              to="/tasks"
              className="text-xs font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
            >
              <span>View All Board</span>
              <FiArrowRight />
            </Link>
          </div>

          {recentPendingTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recentPendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTrigger}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-[20px] border border-dashed border-slate-250 dark:border-slate-800 bg-white/20 dark:bg-slate-900/10 backdrop-blur-sm">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Excellent work! You have no pending tasks.
              </p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="mt-3 text-xs font-bold text-blue-500 hover:text-blue-600"
              >
                + Add a Task
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Productivity Progress Visualizer */}
        <div className="space-y-4">
          <div className="border-b border-slate-200/50 dark:border-slate-800/50 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white text-left">
              Productivity Score
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[20px] p-6 backdrop-blur-md shadow-md shadow-slate-100/30 dark:shadow-none flex flex-col items-center justify-center gap-4 text-center">
            {/* Completion Percentage Graphic */}
            <div className="relative h-32 w-32 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90">
                {/* Track circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  strokeWidth={strokeWidth}
                  className="stroke-slate-100 dark:stroke-slate-800 fill-transparent"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  strokeWidth={strokeWidth}
                  className="stroke-blue-500 fill-transparent transition-all duration-1000 ease-out"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Central text */}
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-slate-950 dark:text-white">
                  {stats.completionRate}%
                </span>
                <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wide">
                  Complete
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-bold text-slate-850 dark:text-slate-200">
                Keep up the momentum!
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You've completed {stats.completed} out of {stats.total} total items on your list.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <TaskModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTask(null);
        }}
        taskToEdit={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={handleDeleteConfirm}
        taskTitle={selectedTask ? selectedTask.title : ''}
      />
    </motion.div>
  );
};

export default Dashboard;

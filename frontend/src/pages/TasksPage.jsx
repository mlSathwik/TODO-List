import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FiSearch, FiPlus, FiSliders, FiCalendar, FiFlag, FiTag, FiCheckCircle, FiClock, FiGrid, FiList } from 'react-icons/fi';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';

const TasksPage = () => {
  const {
    tasks,
    loading,
    categories,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    deleteTask,
  } = useTasks();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const clearFilters = () => {
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  const hasActiveFilters =
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'newest';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight margin-none">
            All Tasks
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize, update, and manage your daily tasks.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateOpen(true)}
          className="self-start sm:self-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-650 hover:from-blue-600 hover:to-purple-750 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer select-none"
        >
          <FiPlus className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>Add Task</span>
        </motion.button>
      </div>

      {/* Filter and Control Panel */}
      <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 rounded-[24px] p-5 backdrop-blur-md shadow-md shadow-slate-100/20 dark:shadow-none space-y-4">
        {/* Search & Sort Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="lg:col-span-2 relative flex items-center">
            <FiSearch className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-250 dark:border-slate-800/80 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Sort selection */}
          <div className="relative flex items-center">
            <FiSliders className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-250 dark:border-slate-800/80 rounded-xl text-sm text-slate-900 dark:text-white font-semibold cursor-pointer outline-none focus:border-blue-500 transition-all appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority Order</option>
            </select>
          </div>

          {/* Reset Filters Option */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-655 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              Clear All Filters
            </motion.button>
          )}
        </div>

        {/* Categories, Priorities & Status Filters Row */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-3 border-t border-slate-200/40 dark:border-slate-800/40">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 px-3 py-1.5 rounded-xl">
              <FiTag className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer outline-none border-none pr-1"
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 px-3 py-1.5 rounded-xl">
              <FiFlag className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer outline-none border-none pr-1"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            {['All', 'Pending', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-white dark:bg-slate-750 text-blue-600 dark:text-blue-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cards Grid Layout */}
      <div>
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : tasks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTrigger}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title={hasActiveFilters ? 'No tasks match your filters' : 'Task list is empty'}
            description={
              hasActiveFilters
                ? 'Try resetting the filters or modifying your search query.'
                : 'Click below to create your very first task and configure your day.'
            }
            onAction={hasActiveFilters ? clearFilters : () => setIsCreateOpen(true)}
            actionLabel={hasActiveFilters ? 'Reset Filters' : 'Create Task'}
          />
        )}
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

export default TasksPage;

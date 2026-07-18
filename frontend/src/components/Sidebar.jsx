import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { FiGrid, FiList, FiCheckCircle, FiClock, FiTag, FiSettings, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const {
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    categories,
    getStats,
  } = useTasks();

  const navigate = useNavigate();
  const location = useLocation();
  const stats = getStats();

  const handleNavClick = (status, category = 'All', priority = 'All') => {
    setStatusFilter(status);
    setCategoryFilter(category);
    setPriorityFilter(priority);
    
    // If not on tasks page, redirect there
    if (location.pathname !== '/tasks') {
      navigate('/tasks');
    }
    
    // Close sidebar on mobile
    if (onClose) onClose();
  };

  const menuItems = [
    {
      name: 'All Tasks',
      icon: FiList,
      count: stats.total,
      active: statusFilter === 'All' && categoryFilter === 'All' && location.pathname === '/tasks',
      onClick: () => handleNavClick('All'),
    },
    {
      name: 'Pending Tasks',
      icon: FiClock,
      count: stats.pending,
      active: statusFilter === 'Pending' && categoryFilter === 'All' && location.pathname === '/tasks',
      onClick: () => handleNavClick('Pending'),
    },
    {
      name: 'Completed Tasks',
      icon: FiCheckCircle,
      count: stats.completed,
      active: statusFilter === 'Completed' && categoryFilter === 'All' && location.pathname === '/tasks',
      onClick: () => handleNavClick('Completed'),
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-6 px-4">
      <div className="flex flex-col gap-8">
        {/* Header on mobile */}
        <div className="flex items-center justify-between lg:hidden border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
          <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Navigation Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Dashboard Link */}
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2.5">
            Core
          </span>
          <NavLink
            to="/"
            onClick={() => {
              if (onClose) onClose();
            }}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive && location.pathname === '/'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                  : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <FiGrid className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </NavLink>
        </div>

        {/* Status Filters */}
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2.5">
            Tasks Status
          </span>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
                    item.active
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                      : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.active
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories list */}
        <div>
          <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2.5">
            Categories
          </span>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => handleNavClick('All', 'All')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                categoryFilter === 'All' && location.pathname === '/tasks' && statusFilter === 'All'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                  : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <FiTag className="h-4 w-4 text-slate-400" />
              <span>All Categories</span>
            </button>

            {categories.map((cat) => {
              const isSelected = categoryFilter.toLowerCase() === cat.toLowerCase() && location.pathname === '/tasks';
              return (
                <button
                  key={cat}
                  onClick={() => handleNavClick('All', cat)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                    isSelected
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                      : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <FiTag className={`h-4 w-4 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} />
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Settings Link */}
      <div>
        <NavLink
          to="/settings"
          onClick={() => {
            if (onClose) onClose();
          }}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`
          }
        >
          <FiSettings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (Responsive Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-45 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/50 dark:border-slate-800/50 z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-slate-200/30 dark:border-slate-800/30 bg-white/20 dark:bg-slate-900/10 backdrop-blur-md sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shadow-sm">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;

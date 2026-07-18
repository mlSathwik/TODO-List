import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sorting state
  const [statusFilter, setStatusFilter] = useState('All'); // All, Pending, Completed
  const [priorityFilter, setPriorityFilter] = useState('All'); // All, Low, Medium, High
  const [categoryFilter, setCategoryFilter] = useState('All'); // All, Work, Personal, etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, dueDate, priority

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      
      // Map frontend filters to API parameters
      if (statusFilter !== 'All') {
        params.status = statusFilter;
      }
      if (priorityFilter !== 'All') {
        params.priority = priorityFilter;
      }
      if (categoryFilter !== 'All') {
        params.category = categoryFilter;
      }
      if (searchQuery.trim() !== '') {
        params.search = searchQuery;
      }
      
      // Sort config
      params.sortBy = sortBy;
      if (sortBy === 'dueDate') {
        params.order = 'asc'; // Ascending due date (closer dates first)
      } else {
        params.order = 'desc';
      }

      const response = await axios.get(API_URL, { params });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.message || 'Failed to fetch tasks from server.');
      toast.error(err.response?.data?.message || 'Connection to API failed.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, categoryFilter, searchQuery, sortBy]);

  // Fetch tasks on filter change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTasks();
    }, 150); // slight debounce for search input updates
    
    return () => clearTimeout(delayDebounce);
  }, [fetchTasks]);

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      toast.success('Task created successfully!', {
        icon: '✨',
        style: {
          borderRadius: '12px',
          background: '#1F2937',
          color: '#fff',
        },
      });
      fetchTasks(); // Reload to apply current sorting/filtering
      return true;
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error(err.response?.data?.message || 'Failed to create task.');
      return false;
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
      toast.success('Task updated successfully!', {
        icon: '📝',
        style: {
          borderRadius: '12px',
          background: '#1F2937',
          color: '#fff',
        },
      });
      fetchTasks();
      return true;
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error(err.response?.data?.message || 'Failed to update task.');
      return false;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!', {
        icon: '🗑️',
        style: {
          borderRadius: '12px',
          background: '#1F2937',
          color: '#fff',
        },
      });
      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error(err.response?.data?.message || 'Failed to delete task.');
      return false;
    }
  };

  // Toggle task complete status
  const toggleTaskComplete = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );

      if (newStatus === 'Completed') {
        toast.success('Task marked as completed!', {
          icon: '✅',
          style: {
            borderRadius: '12px',
            background: '#10B981',
            color: '#fff',
          },
        });
      } else {
        toast.success('Task marked as pending', {
          icon: '⏳',
          style: {
            borderRadius: '12px',
            background: '#1F2937',
            color: '#fff',
          },
        });
      }
      fetchTasks();
      return true;
    } catch (err) {
      console.error('Error toggling task completion:', err);
      toast.error(err.response?.data?.message || 'Failed to update task status.');
      return false;
    }
  };

  // Get list of all unique categories
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Health', 'Finance']);
  
  // Extract categories dynamically from tasks if any new exist
  useEffect(() => {
    if (tasks.length > 0) {
      const taskCategories = tasks.map(t => t.category).filter(Boolean);
      const uniqueCats = Array.from(new Set([...['Work', 'Personal', 'Shopping', 'Health', 'Finance'], ...taskCategories]));
      setCategories(uniqueCats);
    }
  }, [tasks]);

  // Statistics calculation for the Dashboard
  const getStats = () => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    
    // Check if task is past due date, status is Pending and due date is earlier than today
    const now = new Date();
    // Normalize date (set hours to 0) to compare days fairly
    now.setHours(0, 0, 0, 0);
    const overdue = tasks.filter((t) => {
      if (t.status === 'Completed') return false;
      const due = new Date(t.dueDate);
      return due < now;
    }).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      pending,
      completed,
      overdue,
      completionRate,
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
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
        categories,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

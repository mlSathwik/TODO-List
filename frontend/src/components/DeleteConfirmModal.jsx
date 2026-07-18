import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertOctagon, FiX } from 'react-icons/fi';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/50 dark:border-slate-800/60 shadow-2xl p-6 md:p-8 z-10 text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Warning Icon */}
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-red-100 dark:bg-red-500/10 text-red-650 dark:text-red-400 mb-5">
              <FiAlertOctagon className="h-8 w-8 stroke-[2]" />
            </div>

            {/* Title & Warning Message */}
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Confirm Task Deletion
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-850 dark:text-slate-200">"{taskTitle}"</strong>?
              This action is permanent and cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-750 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                No, Keep Task
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-white dark:text-red-300 border dark:border-red-500/30 rounded-xl text-sm font-bold shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all cursor-pointer"
              >
                Yes, Delete Task
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;

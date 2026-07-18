import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-5 flex flex-col justify-between h-48 animate-pulse shadow-sm"
        >
          <div className="flex flex-col gap-3">
            {/* Badges row */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                <div className="h-5 w-20 bg-slate-250 dark:bg-slate-850 rounded-full"></div>
              </div>
              <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>

            {/* Title & description */}
            <div className="flex gap-3 items-start mt-2">
              <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                <div className="h-3 w-5/6 bg-slate-150 dark:bg-slate-850 rounded-md"></div>
                <div className="h-3 w-2/3 bg-slate-150 dark:bg-slate-850 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/20 dark:border-slate-800/20 flex items-center justify-between">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

'use client';

import { motion } from 'motion/react';

export const LiveBadge = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-full text-xs font-medium text-red-600 dark:text-red-400"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span>Live</span>
    </motion.div>
  );
};

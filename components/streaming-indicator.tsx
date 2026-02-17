'use client';

import { motion } from 'motion/react';

export const StreamingIndicator = ({ isStreaming }: { isStreaming: boolean }) => {
  if (!isStreaming) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
      <motion.div
        className="w-2 h-2 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="font-medium">Live streaming response...</span>
    </div>
  );
};

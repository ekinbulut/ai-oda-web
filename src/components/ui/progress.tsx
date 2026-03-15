"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-white/5 border border-white/5",
        className
      )}
      {...props}
    >
      <motion.div
        className="h-full w-full flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        initial={{ width: "0%" }}
        animate={{ width: `${value || 0}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };

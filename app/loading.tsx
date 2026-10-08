"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* BLUE GLOW */}
      <div className="absolute h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

      {/* CONTENT */}
      <div className="relative flex flex-col items-center gap-7">
        {/* LOGO TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-[42px] font-semibold tracking-[-0.08em] text-white"
        >
          ROIS
          <span className="bg-gradient-to-r from-[#178BFF] to-blue-700 bg-clip-text text-transparent">
            .
          </span>
        </motion.h1>

        {/* LOADING BAR */}
        <div className="relative h-[3px] w-40 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-[#178BFF] to-blue-700"
          />
        </div>

        {/* LOADING TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[13px] tracking-[0.25em] text-zinc-500"
        >
          LOADING
        </motion.p>
      </div>
    </motion.div>
  );
}
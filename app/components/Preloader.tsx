"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="
            fixed inset-0 z-99999
            flex items-center justify-center
            overflow-hidden bg-black
          "
        >
          {/* GLOW */}
          <div className="absolute h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />

          {/* CONTENT */}
          <div className="relative flex flex-col items-center gap-8">
            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-[38px]
                font-semibold
                tracking-[-0.08em]
                text-white
                sm:text-[52px]
              "
            >
              ISSA.DEV
              <span className="bg-linear-to-r from-[#178BFF] to-blue-700 bg-clip-text text-transparent">
                .
              </span>
            </motion.h1>

            {/* LINE */}
            <div className="relative h-0.75 w-44 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "220%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="
                  absolute inset-y-0
                  w-1/2
                  bg-linear-to-r
                  from-[#178BFF]
                  to-blue-700
                "
              />
            </div>

            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="
                text-[10px]
                tracking-[0.22em]
                text-zinc-500
                sm:text-[12px]
                sm:tracking-[0.35em]
              "
            >
              LOADING EXPERIENCE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

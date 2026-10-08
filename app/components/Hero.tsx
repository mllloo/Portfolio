"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  slideLeft,
  slideRight,
  imageReveal,
  staggerContainer,
  fadeUp,
} from "../lib/animation";

const roles = [
  {
    first: "Web",
    second: "Designer",
  },
  {
    first: "Graphic",
    second: "Designer",
  },
  {
    first: "UI/UX",
    second: "Designer",
  },
  {
    first: "Fullstack",
    second: "Developer",
  },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) =>
        prev === roles.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="home"
      className="relative h-screen overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.35,
      }}
    >
      {/* BLUE GLOW */}
      <div className="absolute right-[8%] top-[22%] h-105 w-105 rounded-full bg-blue-600/20 blur-[140px]" />

      {/* LEFT CONTENT */}
      <motion.div
        variants={slideLeft}
        className="absolute left-17.5 top-45 z-20"
      >
        <motion.h1
          className="
            text-[100px]
            font-semibold
            leading-[1.05]
            tracking-[-0.07em]
          "
        >
          {/* CONTAINER */}
          <div className="relative min-h-70 w-175 overflow-visible">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentRole}
                className="absolute left-0 top-0"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {/* FIRST WORD */}
                <motion.div
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
                  exit={{
                    opacity: 0,
                    y: 30,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                  }}
                  className="text-white"
                >
                  {roles[currentRole].first}
                </motion.div>

                {/* SECOND WORD */}
                <motion.div
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
                  exit={{
                    opacity: 0,
                    y: 30,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 0.8,
                    delay: 0.10,
                  }}
                  className="
                    bg-linear-to-r
                    from-[#178BFF]
                    to-blue-700
                    bg-clip-text
                    text-transparent
                    pb-4
                  "
                >
                  {roles[currentRole].second}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.h1>

        {/* BLUE LINE */}
        <div className="h-1.5 w-22.5 bg-[#178BFF]" />
      </motion.div>

      {/* HERO IMAGE */}
      <motion.div
        variants={imageReveal}
        className="absolute left-[50%] top-0 z-10 -translate-x-1/2"
      >
        <Image
          src="/images/home.png"
          alt="hero"
          width={700}
          height={1000}
          preload
          className="h-auto w-180 object-contain"
        />
      </motion.div>

      {/* RIGHT INTRO */}
      <motion.div
        variants={slideRight}
        className="absolute right-22.5 top-52.5 z-20 max-w-90"
      >
        <p className="mb-6 text-[13px] italic text-zinc-400">
          ~ Introduction
        </p>

        <h2 className="mb-7 text-[30px] leading-[1.3] font-medium text-white">
          Informatics Students Who Focus On Web Design And Development
        </h2>

        <p className="text-[15px] leading-loose text-zinc-400">
          I Have A Deep Interest In Web Development And Design, Which
          Motivates Me To Continuously Improve My Skills. Committed To
          Lifelong Learning.
        </p>

        <button className="mt-10 text-[#1F8FFF] text-[16px]">
          <a href="../experience" className="hover:underline">
            My Story →
          </a>
        </button>
      </motion.div>

      {/* SOCIAL ICON */}
      <motion.div
        variants={fadeUp}
        className="absolute bottom-17.5 left-17.5 items-center mt-10 flex flex-col gap-6"
      >
        <Image
          src="/images/sosmed/instagram2.png"
          alt="instagram"
          width={20}
          height={20}
        />

        <Image
          src="/images/sosmed/linkedin2.png"
          alt="linkedin"
          width={20}
          height={20}
        />

        <Image
          src="/images/sosmed/github2.png"
          alt="github"
          width={20}
          height={20}
        />
      </motion.div>
    </motion.section>
  );
}

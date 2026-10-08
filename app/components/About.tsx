"use client";

import Link from "next/link";
import Image from 'next/image'
import { motion } from "framer-motion";
import {
   fadeUp,
   imageReveal,
   slideRight,
   staggerContainer,
} from "../lib/animation";

export default function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen px-16 py-32 flex items-center justify-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.35,
      }}
    >
      <motion.div className="grid items-center gap-20 lg:grid-cols-2 max-w-350 w-full">
        <div>
          <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-[75px] font-light text-white">
            Hello
          </motion.p>

          <motion.h2 variants={fadeUp} className="uppercase text-[50px] font-semibold text-[#1F8FFF] leading-tight mb-8">
            I’m Rois Azzam Shiddiq
          </motion.h2>

          <motion.p variants={slideRight} className="text-zinc-400 leading-8 max-w-xl mb-12 text-[15px]">
            Mahasiswa Teknik Informatika yang berfokus pada backend development dan desain grafis, dengan pengalaman kuat dalam manajemen organisasi serta produksi konten kreatif. Saya adalah pribadi yang teliti, adaptif, dan komunikatif, serta berkomitmen untuk memberikan solusi inovatif yang berdampak positif bagi tim dan proyek.
          </motion.p>

          <motion.div className="mt-10">
            <Link
              href="/experience"
              className="
                group
                inline-flex
                items-center
                gap-3
                border
                border-[#178BFF]/40
                bg-[#178BFF]/10
                px-7
                py-4
                text-[15px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:border-[#178BFF]
                hover:bg-[#178BFF]/20
              "
            >
              View Experience

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </motion.div>

          <div className="absolute right-[8%] top-[150%] h-105 w-105 rounded-full bg-blue-600/30 blur-[140px]" />
        </div>

        <div>
            <motion.div variants={imageReveal} className="relative h-175 rounded-[40px] overflow-hidden">
            <Image
            src="/images/about.png"
            alt="about"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top scale-[1.08]"
            />
            </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}

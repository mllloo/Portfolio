"use client";

import { testimonials } from "@/utils/data-testimonials";
import { motion } from "framer-motion";
import {
  slideLeft,
  slideRight,
  staggerContainer,
} from "../lib/animation";

export default function Testimonials() {
  const firstRow = [...testimonials, ...testimonials];
  const secondRow = [...testimonials].reverse();
  const secondMarqueeRow = [...secondRow, ...secondRow];

  return (
    <motion.section
      id="work"
      className="overflow-hidden px-4 py-14 sm:px-8 sm:py-18 md:px-12 md:py-24 lg:px-16 lg:py-28"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.35,
      }}
    >
      {/* TITLE */}
      <div className="flex items-end justify-start md:ml-24 lg:ml-75">
        <motion.h2
          variants={slideRight}
          className="text-[28px] font-light leading-none sm:text-[38px] md:text-6xl"
        >
          What People Say
        </motion.h2>
      </div>

      <div className="mb-6 mt-1 flex items-end justify-start sm:mb-8 md:mr-24 md:justify-end lg:mr-70">
        <motion.h3
          variants={slideLeft}
          className="text-[34px] leading-none text-[#178BFF] sm:text-[52px] md:text-[76px] lg:text-[90px]"
        >
          About Me
        </motion.h3>
      </div>

      {/* ROW 1 */}
      <motion.div variants={slideRight} className="relative mb-3 overflow-hidden sm:mb-5">
        <div className="testimonial-row flex gap-3 sm:gap-5">
          {firstRow.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="
                group
                flex
                h-[178px]
                w-[235px]
                shrink-0
                flex-col
                justify-between
                border
                border-white/10
                bg-[#1A1A1A]/60
                p-4
                backdrop-blur-sm
                sm:h-[210px]
                sm:w-[315px]
                sm:p-6
                md:h-[230px]
                md:w-[390px]
              "
            >
              <p className="line-clamp-3 text-[12px] leading-[1.7] text-zinc-300 sm:line-clamp-4 sm:text-[14px] sm:leading-[1.9]">
                “{item.message}”
              </p>

              <div>
                <h3 className="text-[14px] font-semibold text-white sm:text-[17px]">
                  {item.name}
                </h3>

                <p className="mt-1 text-[12px] text-[#178BFF] sm:text-sm">
                  {item.role}
                </p>

                <span className="text-[12px] text-zinc-500 sm:text-sm">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ROW 2 */}
      <motion.div variants={slideLeft} className="relative overflow-hidden">
        <div className="testimonial-row-reverse flex gap-3 sm:gap-5">
          {secondMarqueeRow.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="
                group
                flex
                h-[178px]
                w-[235px]
                shrink-0
                flex-col
                justify-between
                border
                border-white/10
                bg-[#1A1A1A]/60
                p-4
                backdrop-blur-sm
                sm:h-[210px]
                sm:w-[315px]
                sm:p-6
                md:h-[230px]
                md:w-[390px]
              "
            >
              <p className="line-clamp-3 text-[12px] leading-[1.7] text-zinc-300 sm:line-clamp-4 sm:text-[14px] sm:leading-[1.9]">
                “{item.message}”
              </p>

              <div>
                <h3 className="text-[14px] font-semibold text-white sm:text-[17px]">
                  {item.name}
                </h3>

                <p className="mt-1 text-[12px] text-[#178BFF] sm:text-sm">
                  {item.role}
                </p>

                <span className="text-[12px] text-zinc-500 sm:text-sm">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

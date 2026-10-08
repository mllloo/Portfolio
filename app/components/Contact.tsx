"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
   slideRight,
   imageReveal,
   staggerContainer,
   fadeUp,
} from "../lib/animation";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
      "
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.35,
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.png"
          alt="background"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-12 lg:px-17.5 lg:py-17.5">
        <div className="grid w-full max-w-362.5 grid-cols-1 items-center gap-8 lg:grid-cols-[240px_minmax(0,760px)] lg:gap-24 xl:gap-90">

          {/* LEFT SIDE */}
          <motion.div variants={slideRight} className="flex h-auto flex-col justify-between lg:h-155">
            <p className="max-w-[36rem] text-[14px] leading-[1.8] text-zinc-300 md:text-[16px] lg:mt-110 lg:max-w-72.5 lg:text-[17px]">
              &quot;Setiap Baris Kode, Setiap Desain, Dan Setiap
              Solusi Yang Dibuat Adalah Bentuk Komitmen
              Untuk Menjadi Lebih Baik Dari Hari Kemarin.&quot;
            </p>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="w-full max-w-190">
            {/* TITLE */}
            <motion.div variants={fadeUp} className="mb-10 border-b border-white/30 pb-6">
              <h2 className="text-[38px] font-light leading-none text-white sm:text-[48px] md:text-[60px]">
                Contact{" "}
                <span className="text-[#178BFF]">Us</span>
                <span className="text-zinc-400"> -</span>
              </h2>
            </motion.div>

            {/* FORM */}
            <motion.div variants={imageReveal} className="max-h-none rounded-sm bg-black/45 px-5 py-5 backdrop-blur-sm sm:px-8 sm:py-6 lg:max-h-130">
              <h3 className="mb-5 text-[24px] font-medium text-white md:text-[28px]">
                Send Message
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Name
                  </label>

                  <input
                    type="text"
                    className="
                      h-12.5
                      w-full
                      border
                      border-white/10
                      bg-[#3A3A3A]
                      px-3
                      outline-none
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Number
                  </label>

                  <input
                    type="text"
                    className="
                      h-12.5
                      w-full
                      border
                      border-white/10
                      bg-[#3A3A3A]
                      px-3
                      outline-none
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Message
                  </label>

                  <textarea
                    className="
                      h-27.5
                      w-full
                      resize-none
                      border
                      border-white/10
                      bg-[#3A3A3A]
                      p-3
                      outline-none
                    "
                  />
                </div>

                <button
                  className="
                    h-10.5
                    w-full
                    bg-[#2E2E2E]
                    text-white
                    transition
                    hover:bg-[#178BFF]
                  "
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

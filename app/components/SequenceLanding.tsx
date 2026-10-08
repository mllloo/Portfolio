"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

const currentFrame = (index: number) =>
  `/sequence/hero/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

export default function SequenceLanding() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroIntroRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const experienceButtonRef = useRef<HTMLAnchorElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ index: 1 });

  const [loaded, setLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    { first: "Web", second: "Designer" },
    { first: "Graphic", second: "Designer" },
    { first: "UI/UX", second: "Designer" },
    { first: "Fullstack", second: "Developer" },
  ];

  const aboutDesc =
    "An Informatics Engineering student focusing on backend development and graphic design, with strong experience in organizational management and creative content production. I am a meticulous, adaptable, and communicative individual, committed to delivering innovative solutions that positively impact teams and projects.";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imagesRef.current[Math.floor(frame.current.index) - 1];

    if (!canvas || !context || !image || !image.complete) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = Math.max(
      window.innerWidth / image.width,
      window.innerHeight / image.height
    );

    const x = window.innerWidth / 2 - (image.width * scale) / 2;
    const y = window.innerHeight / 2 - (image.height * scale) / 2;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.drawImage(image, x, y, image.width * scale, image.height * scale);
  };

  useEffect(() => {
    let loadedImages = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedImages += 1;

        if (i === 1) {
          renderFrame();
        }

        if (loadedImages === frameCount) {
          imagesRef.current = images;
          setLoaded(true);
          renderFrame();
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  useLayoutEffect(() => {
    if (
      !loaded ||
      !sectionRef.current ||
      !canvasRef.current ||
      !heroTextRef.current ||
      !heroIntroRef.current ||
      !socialRef.current ||
      !aboutTextRef.current ||
      !experienceButtonRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(heroTextRef.current, {
        opacity: 0,
        x: -80,
        y: 30,
        filter: "blur(14px)",
      });

      gsap.set(heroIntroRef.current, {
        opacity: 0,
        x: 80,
        y: 30,
        filter: "blur(14px)",
      });

      gsap.set(socialRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      });

      gsap.set(aboutTextRef.current, {
        opacity: 0,
        filter: "blur(18px)",
        pointerEvents: "none",
      });

      gsap.set(".about-word", {
        color: "#71717a",
        opacity: 0,
        filter: "blur(8px)",
      });

      gsap.set(experienceButtonRef.current, {
        opacity: 0,
        y: 30,
        pointerEvents: "none",
      });

      const intro = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "power3.out" },
      });

      intro.to(heroTextRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
      });

      intro.to(
        heroIntroRef.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
        },
        "-=0.7"
      );

      intro.to(
        socialRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
        },
        "-=0.6"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            window.dispatchEvent(
              new CustomEvent("cinematic-progress", {
                detail: self.progress,
              })
            );
          },
        },
      });

      tl.to(
        frame.current,
        {
          index: frameCount,
          snap: "index",
          ease: "none",
          onUpdate: renderFrame,
          duration: 1.50,
        },
        0
      );

      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          x: -180,
          y: -40,
          scale: 0.9,
          filter: "blur(14px)",
          ease: "none",
        },
        0.18
      );

      tl.to(
        heroIntroRef.current,
        {
          opacity: 0,
          x: 180,
          y: -30,
          scale: 0.92,
          filter: "blur(14px)",
          ease: "none",
        },
        0.18
      );

      tl.to(
        socialRef.current,
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
          ease: "none",
        },
        0.18
      );

      tl.to(
        aboutTextRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          pointerEvents: "auto",
          ease: "none",
        },
        0.42
      );

      tl.to(
        ".about-word",
        {
          opacity: 1,
          filter: "blur(0px)",
          color: "#ffffff",
          stagger: 0.035,
          duration: 0.35,
          ease: "none",
        },
        0.55
      );

      tl.to(
        experienceButtonRef.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "none",
        },
        1.18
      );

      setTimeout(() => ScrollTrigger.refresh(), 300);
      window.addEventListener("resize", renderFrame);
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", renderFrame);
      ctx.revert();
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#07090F] text-white md:min-h-[760px] lg:h-screen lg:min-h-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 bg-[#07090F]/35" />
      <div className="absolute right-[-20%] top-[18%] h-[280px] w-[280px] rounded-full bg-blue-600/20 blur-[110px] md:right-[8%] md:h-[420px] md:w-[420px] md:blur-[140px]" />
      <div className="absolute left-[-25%] top-[56%] h-[240px] w-[240px] rounded-full bg-blue-500/10 blur-[100px] md:left-[25%] md:h-[360px] md:w-[360px] md:blur-[130px]" />

      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#07090F] text-[#178BFF]">
          
        </div>
      )}

      <div
        ref={heroTextRef}
        className="absolute left-5 top-[128px] z-30 md:left-8 md:top-[170px] lg:left-[70px] lg:top-[180px]"
      >
        <h1 className="text-[54px] font-semibold leading-[0.82] tracking-[-0.06em] sm:text-[68px] md:text-[86px] lg:text-[100px] lg:leading-[0.78] lg:tracking-[-0.07em]">
          <div className="relative min-h-[120px] w-[calc(100vw-40px)] max-w-[700px] overflow-visible sm:min-h-[150px] md:min-h-[190px] lg:min-h-[210px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentRole}
                className="absolute left-0 top-0"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                transition={{ duration: 0.45 }}
              >
                <div className="relative">
                  {/* KATA ATAS / BACKGROUND */}
                  <div
                    className="
                      relative
                      z-10
                      text-[#178BFF]
                      [text-shadow:0_12px_18px_rgba(23,139,255,0.35)]
                    "
                  >
                    {roles[currentRole].first}
                  </div>

                  {/* KATA BAWAH / CUTTER */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 18,
                      mass: 0.8,
                      delay: 0.1,
                    }}
                    className="
                      relative
                      z-30
                      -mt-[10px]
                      text-white
                      [text-shadow:0_-10px_20px_rgba(7,9,15,0.95)]
                    "
                  >
                    {roles[currentRole].second}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </h1>

        <div className="h-1 w-16 bg-[#178BFF] md:h-[6px] md:w-[90px]" />
      </div>

      <div
        ref={heroIntroRef}
        className="absolute left-5 right-5 top-[330px] z-30 max-w-[420px] md:left-auto md:right-8 md:top-[260px] md:max-w-[330px] lg:right-[90px] lg:top-[210px] lg:max-w-[360px]"
      >
        <p className="mb-3 text-[12px] italic text-zinc-400 md:mb-5 lg:mb-6 lg:text-[13px]">
          ~ Introduction
        </p>

        <h2 className="mb-4 max-w-[19rem] text-[22px] font-medium leading-[1.25] text-white sm:text-[26px] md:mb-6 md:text-[28px] lg:mb-7 lg:max-w-none lg:text-[30px] lg:leading-[1.3]">
          Informatics Students Who Focus On Web Design And Development
        </h2>

        <p className="max-w-[22rem] text-[13px] leading-7 text-zinc-400 md:text-[14px] md:leading-8 lg:max-w-none lg:text-[15px] lg:leading-loose">
          I Have A Deep Interest In Web Development And Design, Which
          Motivates Me To Continuously Improve My Skills. Committed To
          Lifelong Learning.
        </p>

      </div>

      <div
        ref={socialRef}
        className="absolute bottom-6 left-5 z-30 flex items-center gap-5 md:bottom-10 md:left-8 md:flex-col md:gap-6 lg:bottom-[70px] lg:left-[70px]"
      >
        <Image src="/images/sosmed/instagram2.png" alt="instagram" width={20} height={20} />
        <Image src="/images/sosmed/linkedin2.png" alt="linkedin" width={20} height={20} />
        <Image src="/images/sosmed/github2.png" alt="github" width={20} height={20} />
      </div>

      <div
        ref={aboutTextRef}
        id="about"
        className="absolute bottom-7 left-5 right-5 z-30 max-w-[680px] md:bottom-12 md:left-8 md:right-auto lg:left-[70px] lg:bottom-[60px]"
      >
        <p className="text-[38px] font-light uppercase tracking-[0.18em] text-white sm:text-[48px] md:text-[62px] md:tracking-[0.24em] lg:text-[75px] lg:tracking-[0.3em]">
          Hello
        </p>

        <h2 className="mb-4 text-[24px] font-normal uppercase leading-tight text-[#1F8FFF] sm:text-[30px] md:mb-7 md:text-[36px] lg:mb-8 lg:text-[40px]">
          I&apos;m Rois Azzam Shiddiq
        </h2>

        <p className="mb-6 max-w-xl text-[12px] leading-6 text-zinc-500 sm:text-[13px] md:mb-9 md:text-[14px] md:leading-7 lg:mb-10 lg:text-[15px] lg:leading-8">
          {aboutDesc.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="about-word mr-[4px] inline-block whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </p>

        <Link
          ref={experienceButtonRef}
          href="/experience"
          className="group inline-flex items-center gap-3 border border-[#178BFF]/40 bg-[#178BFF]/10 px-5 py-3 text-[13px] font-medium text-white transition-all duration-300 hover:border-[#178BFF] hover:bg-[#178BFF]/20 md:px-7 md:py-4 md:text-[15px]"
        >
          View Experience
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            -&gt;
          </span>
        </Link>
      </div>
    </section>
  );
}

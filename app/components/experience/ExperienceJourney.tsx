"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/utils/data-experiences";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, {
        opacity: 0,
        filter: "blur(10px)",
      });

      gsap.set(".journey-hero-title, .journey-hero-line, .journey-hero-copy", {
        opacity: 0,
        y: 52,
        filter: "blur(14px)",
      });

      gsap.set(".journey-line-fill", {
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.set(".journey-entry", {
        opacity: 0,
        y: 70,
        filter: "blur(14px)",
      });

      gsap.set(".journey-dot", {
        scale: 0,
        opacity: 0,
      });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(sectionRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
        })
        .to(
          ".journey-hero-title",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 1,
          },
          "-=0.35"
        )
        .to(
          ".journey-hero-line",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
          },
          "-=0.55"
        )
        .to(
          ".journey-hero-copy",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
          },
          "-=0.45"
        );

      gsap.to(".journey-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".journey-list",
          start: "top 65%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".journey-entry").forEach((entry) => {
        const dot = entry.querySelector(".journey-dot");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 78%",
            end: "bottom 18%",
            scrub: 1,
          },
        });

        tl.to(entry, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          duration: 0.35,
        });

        tl.to(
          dot,
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            duration: 0.2,
          },
          0
        );

        tl.to({}, { duration: 0.48 });

        tl.to(entry, {
          opacity: 0,
          y: -42,
          filter: "blur(10px)",
          ease: "none",
          duration: 0.28,
        });

        tl.to(
          dot,
          {
            scale: 0,
            opacity: 0,
            ease: "none",
            duration: 0.2,
          },
          "<"
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07090F] px-5 py-20 text-white sm:px-8 md:py-28 lg:px-[70px] lg:py-32"
    >
      <div className="absolute right-[-32%] top-[6%] h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[120px] md:right-[8%] md:h-[520px] md:w-[520px] md:blur-[160px]" />

      <div className="relative z-10 mb-20 md:mb-28 lg:mb-32">
        <h1 className="journey-hero-title text-[42px] uppercase leading-[0.9] tracking-[0.16em] text-zinc-400 sm:text-[56px] md:text-[76px] md:tracking-[0.24em] lg:text-[100px] lg:leading-[0.78] lg:tracking-[0.35em]">
          Portfolio
        </h1>

        <h1 className="journey-hero-title text-[42px] uppercase leading-[0.9] tracking-[0.16em] text-zinc-400 sm:text-[56px] md:text-[76px] md:tracking-[0.24em] lg:text-[100px] lg:leading-[0.78] lg:tracking-[0.35em]">
          Journey .
        </h1>

        <div className="journey-hero-line mt-8 h-[3px] w-[90px] bg-[#178BFF] md:mt-12 md:w-[120px]" />

        <p className="journey-hero-copy mt-7 max-w-2xl text-[14px] leading-7 text-zinc-400 md:mt-10 md:text-[17px] md:leading-8">
          A deeper look into my technical abilities, organizational journey,
          and selected projects that shaped my growth as a developer and
          designer.
        </p>
      </div>

      <div className="journey-list relative z-10 mx-auto max-w-[1180px] pb-20 md:pb-28 lg:pb-36">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <div className="journey-line-fill h-full w-full bg-gradient-to-b from-[#4DA3FF] via-[#178BFF] to-transparent shadow-[0_0_25px_rgba(23,139,255,0.9)]" />
        </div>

        <div className="space-y-16 md:space-y-28 lg:space-y-48">
          {experiences.map((item) => (
            <div
              key={item.title}
              className="journey-entry relative grid gap-6 pl-10 md:min-h-[430px] md:grid-cols-[1fr_80px_1fr] md:items-center md:gap-10 md:pl-0"
            >
              <div className="relative h-[210px] overflow-hidden border border-white/10 bg-white/[0.03] sm:h-[250px] md:h-[260px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 60px), 480px"
                  className="object-cover grayscale"
                />
              </div>

              <div className="absolute left-0 top-[105px] flex items-center justify-center md:relative md:left-auto md:top-auto md:h-full">
                <div className="journey-dot h-5 w-5 rounded-full border border-[#4DA3FF] bg-[#07090F] shadow-[0_0_45px_rgba(23,139,255,1)] md:h-6 md:w-6" />
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#178BFF] md:mb-5 md:text-sm md:tracking-[0.35em]">
                  Experience / {item.year}
                </p>

                <h2 className="mb-3 text-[26px] font-semibold leading-tight sm:text-[30px] md:mb-4 md:text-[36px]">
                  {item.title}
                </h2>

                <p className="mb-4 text-sm text-zinc-500 md:mb-5 md:text-base">{item.place}</p>

                <p className="max-w-xl text-[14px] leading-7 text-zinc-400 md:text-[16px] md:leading-8">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

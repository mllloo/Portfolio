"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10+", target: 10, suffix: "+", pad: 0, label: "Clients" },
  { value: "02", target: 2, suffix: "", pad: 2, label: "Years Experience" },
  { value: "26+", target: 26, suffix: "+", pad: 0, label: "Completed Projects" },
  { value: "10", target: 10, suffix: "", pad: 0, label: "Achievements" },
];

const formatStatValue = (value: number, suffix: string, pad: number) =>
  `${String(value).padStart(pad, "0")}${suffix}`;

export default function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const textItems = ".impact-kicker, .impact-main, .impact-copy, .impact-cta";
      const statItems = ".impact-stat";
      const statValues = ".impact-stat-value";
      const statLabels = ".impact-stat-label";

      gsap.set(textItems, {
        opacity: 0,
        y: 42,
        filter: "blur(12px)",
      });

      gsap.set(statItems, {
        opacity: 0,
        y: 54,
        scale: 0.96,
        filter: "blur(14px)",
      });

      gsap.set(statValues, {
        opacity: 0,
        y: 18,
        filter: "blur(10px)",
      });

      gsap.set(statLabels, {
        opacity: 0,
        x: 18,
        filter: "blur(8px)",
      });

      const stopRunningTweens = () => {
        gsap.killTweensOf(textItems);
        gsap.killTweensOf(statItems);
        gsap.killTweensOf(statValues);
        gsap.killTweensOf(statLabels);
      };

      const scrambleValues = () => {
        gsap.utils.toArray<HTMLElement>(statValues).forEach((valueElement) => {
          const target = Number(valueElement.dataset.target || 0);
          const suffix = valueElement.dataset.suffix || "";
          const pad = Number(valueElement.dataset.pad || 0);
          const counter = { value: 0 };
          const tween = gsap.to(counter, {
            value: target,
            duration: 1,
            ease: "power3.out",
            onStart: () => {
              valueElement.textContent = formatStatValue(0, suffix, pad);
            },
            onUpdate: () => {
              const progress = tween.progress();
              const baseValue = Math.round(counter.value);
              const randomValue = Math.floor(Math.random() * (target + 12));
              const displayValue = progress < 0.82 ? randomValue : baseValue;

              valueElement.textContent = formatStatValue(
                displayValue,
                suffix,
                pad
              );
            },
            onComplete: () => {
              valueElement.textContent = formatStatValue(target, suffix, pad);
            },
          });
        });
      };

      const animateIn = () => {
        stopRunningTweens();

        gsap
          .timeline()
          .to(textItems, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.09,
            duration: 0.9,
            ease: "expo.out",
          })
          .to(
            statItems,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              stagger: 0.08,
              duration: 0.95,
              ease: "power4.out",
            },
            "-=0.55"
          )
          .to(
            statValues,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.08,
              duration: 0.35,
              ease: "power3.out",
              onStart: scrambleValues,
            },
            "-=0.45"
          )
          .to(
            statLabels,
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              stagger: 0.08,
              duration: 0.55,
              ease: "power3.out",
            },
            "+=0.35"
          );
      };

      const animateOut = (direction: "up" | "down") => {
        stopRunningTweens();

        gsap
          .timeline()
          .to(statLabels, {
            opacity: 0,
            x: direction === "up" ? -16 : 18,
            filter: "blur(8px)",
            stagger: {
              each: 0.04,
              from: direction === "up" ? "end" : "start",
            },
            duration: 0.3,
            ease: "power2.in",
          })
          .to(
            statValues,
            {
              opacity: 0,
              y: direction === "up" ? -16 : 18,
              filter: "blur(10px)",
              stagger: {
                each: 0.04,
                from: direction === "up" ? "end" : "start",
              },
              duration: 0.32,
              ease: "power2.in",
            },
            "-=0.18"
          )
          .to(statItems, {
            opacity: 0,
            y: direction === "up" ? -34 : 44,
            scale: 0.97,
            filter: "blur(12px)",
            stagger: {
              each: 0.05,
              from: direction === "up" ? "end" : "start",
            },
            duration: 0.55,
            ease: "power3.inOut",
          })
          .to(
            textItems,
            {
              opacity: 0,
              y: direction === "up" ? -28 : 38,
              filter: "blur(12px)",
              stagger: {
                each: 0.05,
                from: "end",
              },
              duration: 0.45,
              ease: "power3.in",
            },
            "-=0.35"
          );
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 72%",
        end: "bottom 18%",
        onEnter: animateIn,
        onEnterBack: animateIn,
        onLeave: () => animateOut("up"),
        onLeaveBack: () => animateOut("down"),
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#07090F] px-6 py-20 text-white sm:px-[70px] lg:py-24"
    >
      <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#178BFF]/10 blur-[140px]" />
      <div className="absolute right-[12%] top-[28%] h-[280px] w-[280px] rounded-full bg-cyan-400/[0.045] blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="impact-kicker mb-6 text-sm uppercase tracking-[0.35em] text-[#178BFF]">
            Impact Recap
          </p>

          <div className="impact-main">
            <p className="text-[96px] font-semibold leading-none tracking-[-0.04em] text-[#178BFF] drop-shadow-[0_0_22px_rgba(23,139,255,0.32)] sm:text-[132px]">
              02
            </p>
            <h2 className="mt-3 text-[24px] font-semibold leading-tight text-zinc-100 sm:text-[30px]">
              Experience
            </h2>
          </div>

          <p className="impact-copy mt-7 max-w-md text-[15px] leading-7 text-zinc-500">
            A compact snapshot of the clients, projects, and achievements
            shaped through design, development, and organizational work.
          </p>

          <Link
            href="/"
            className="impact-cta group mt-9 inline-flex items-center gap-3 border border-[#178BFF]/55 bg-[#178BFF]/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] text-white transition duration-300 hover:border-[#178BFF] hover:bg-[#178BFF]/20"
          >
            Return Home
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
              &larr;
            </span>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="impact-stat group relative flex min-h-[170px] items-center justify-between gap-7 overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] px-8 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_55px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[#178BFF]/55 hover:bg-[#178BFF]/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_22px_70px_rgba(23,139,255,0.12)] sm:min-h-[188px] sm:px-9"
            >
              <span className="absolute left-0 top-0 h-[3px] w-16 bg-[#178BFF] opacity-70 transition duration-300 group-hover:w-24 group-hover:opacity-100" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(23,139,255,0.14),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <p
                className="impact-stat-value relative shrink-0 text-[48px] font-semibold leading-none tracking-[-0.04em] text-[#178BFF] drop-shadow-[0_0_16px_rgba(23,139,255,0.24)] sm:text-[58px] lg:text-[80px]"
                data-pad={item.pad}
                data-suffix={item.suffix}
                data-target={item.target}
              >
                {item.value}
              </p>
              <p className="impact-stat-label relative max-w-[150px] text-right text-[17px] font-medium leading-6 text-zinc-300 sm:text-[18px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

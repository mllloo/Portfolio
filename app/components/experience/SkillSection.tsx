"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/utils/data-skills";

gsap.registerPlugin(ScrollTrigger);

const nodeLayout = [
  { x: 10, y: 35 },
  { x: 21, y: 52 },
  { x: 38, y: 74 },
  { x: 33, y: 42 },
  { x: 49, y: 31 },
  { x: 64, y: 46 },
  { x: 78, y: 34 },
  { x: 68, y: 72 },
  { x: 56, y: 72 },
  { x: 39, y: 28 },
  { x: 22, y: 27 },
  { x: 83, y: 24 },
  { x: 91, y: 57 },
  { x: 12, y: 68 },
] as const;

type SkillNode = (typeof nodeLayout)[number] & {
  name: string;
  icon: string;
};

function createPath(from: SkillNode, to: SkillNode) {
  const dx = to.x - from.x;
  const bow = Math.max(12, Math.abs(dx) * 0.42);
  const lift = from.y > to.y ? -bow : bow;
  const c1x = from.x + dx * 0.32;
  const c2x = from.x + dx * 0.68;
  const c1y = from.y + lift;
  const c2y = to.y + lift;

  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

export default function SkillSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const nodes = useMemo<SkillNode[]>(
    () =>
      skills.map((skill, index) => ({
        ...nodeLayout[index % nodeLayout.length],
        ...skill,
      })),
    []
  );

  const paths = useMemo(
    () =>
      nodes.slice(0, -1).map((node, index) => ({
        id: `${node.name}-${nodes[index + 1].name}`,
        d: createPath(node, nodes[index + 1]),
      })),
    [nodes]
  );

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".skill-title, .skill-copy", {
        opacity: 0,
        y: 38,
        filter: "blur(12px)",
      });

      gsap.set(".skill-network", {
        opacity: 0,
        y: 80,
        scale: 0.96,
        filter: "blur(14px)",
      });

      gsap.set(".skill-path", {
        opacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
      });

      gsap.set(".signal-path", {
        opacity: 0.95,
        strokeDasharray: "0.035 0.965",
        strokeDashoffset: 1,
      });

      gsap.set(".skill-node", {
        opacity: 0,
        scale: 0.72,
        filter: "blur(8px)",
      });

      gsap.set(".skill-logo-ring", {
        scale: 0.85,
        opacity: 0.6,
      });

      const animateIn = () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(".skill-title, .skill-copy", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.75,
          })
          .to(
            ".skill-network",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.9,
            },
            "-=0.58"
          )
          .to(
            ".skill-path",
            {
              strokeDashoffset: 0,
              duration: 1,
              stagger: 0.018,
            },
            "-=0.72"
          )
          .to(
            ".skill-node",
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.62,
              stagger: 0.025,
              ease: "back.out(1.5)",
            },
            "-=0.88"
          );
      };

      const animateOut = () => {
        gsap
          .timeline()
          .to(".skill-node", {
            opacity: 0,
            scale: 0.78,
            filter: "blur(10px)",
            duration: 0.25,
            stagger: {
              each: 0.012,
              from: "end",
            },
            ease: "power2.in",
          })
          .to(
            ".skill-network",
            {
              opacity: 0,
              y: -70,
              scale: 0.98,
              filter: "blur(14px)",
              duration: 0.45,
              ease: "power3.inOut",
            },
            "-=0.2"
          )
          .to(
            ".skill-title, .skill-copy",
            {
              opacity: 0,
              y: -34,
              filter: "blur(12px)",
              stagger: 0.04,
              duration: 0.35,
              ease: "power3.in",
            },
            "-=0.35"
          );
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        end: "bottom 18%",
        onEnter: animateIn,
        onEnterBack: animateIn,
        onLeave: animateOut,
        onLeaveBack: animateOut,
      });

      gsap.to(".signal-path", {
        strokeDashoffset: 0,
        duration: 2.25,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.12,
          repeat: -1,
        },
      });

      gsap.to(".skill-logo-ring", {
        scale: 1.16,
        opacity: 0.1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.08,
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07090F] px-5 py-28 text-white sm:px-8 lg:px-[70px] lg:py-36"
    >
      <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute bottom-[4%] right-[10%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1180px] text-center">
        <h2 className="skill-title text-[42px] font-light leading-none sm:text-[58px] lg:text-[72px]">
          Connected <span className="text-[#178BFF]">Skills</span>
        </h2>

        <p className="skill-copy mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-zinc-500 sm:text-[17px]">
          A technical map of the tools I use to move from interface ideas into
          working products.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 sm:grid-cols-4 md:hidden">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex min-h-[104px] flex-col items-center justify-center gap-3 border border-white/10 bg-black/20 px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#178BFF]/45 bg-[#07111D]/90 shadow-[0_0_28px_rgba(23,139,255,0.45)]">
              <Image
                src={skill.icon}
                alt={`${skill.name} logo`}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </span>
            <span className="max-w-full text-center text-[11px] font-medium leading-tight text-zinc-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <div className="skill-network relative z-10 mx-auto mt-16 hidden max-w-[1240px] md:block lg:mt-20">
        <div className="relative h-[720px] overflow-hidden border border-white/10 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:h-[680px] xl:h-[620px]">
          <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.55)_1px,transparent_1.5px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_74%)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="skillLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#20C7FF" stopOpacity="0.25" />
                <stop offset="48%" stopColor="#178BFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#6EE7FF" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {paths.map((path) => (
              <g key={path.id}>
                <path
                  d={path.d}
                  className="skill-path"
                  fill="none"
                  pathLength={1}
                  stroke="url(#skillLine)"
                  strokeLinecap="round"
                  strokeWidth="0.32"
                  style={{ filter: "drop-shadow(0 0 6px rgba(23,139,255,0.8))" }}
                />
                <path
                  d={path.d}
                  className="signal-path"
                  fill="none"
                  pathLength={1}
                  stroke="#7DE9FF"
                  strokeLinecap="round"
                  strokeWidth="0.48"
                  style={{ filter: "drop-shadow(0 0 10px rgba(125,233,255,1))" }}
                />
              </g>
            ))}
          </svg>

          {nodes.map((node, index) => (
            <div
              key={node.name}
              className="absolute z-20"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="skill-node group relative" data-skill-node={index}>
                <span
                  className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#178BFF]/45 bg-[#07111D]/90 shadow-[0_0_34px_rgba(23,139,255,0.62)] backdrop-blur-md transition duration-300 ease-out group-hover:scale-110 group-hover:border-[#7DE9FF]/80 group-hover:shadow-[0_0_46px_rgba(125,233,255,0.82)] max-sm:h-12 max-sm:w-12"
                  title={node.name}
                >
                  <span className="skill-logo-ring absolute inset-[-8px] rounded-full border border-[#178BFF]/50" />
                  <Image
                    src={node.icon}
                    alt={`${node.name} logo`}
                    width={38}
                    height={38}
                    className="relative z-10 h-[38px] w-[38px] object-contain transition duration-300 ease-out group-hover:scale-110 max-sm:h-7 max-sm:w-7"
                  />
                </span>

                <span className="pointer-events-none absolute left-1/2 top-[calc(100%+12px)] z-30 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full border border-white/10 bg-[#07090F]/95 px-4 py-2 text-sm font-medium text-zinc-100 opacity-0 shadow-[0_0_24px_rgba(23,139,255,0.28)] backdrop-blur-md transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 max-sm:text-xs">
                  {node.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

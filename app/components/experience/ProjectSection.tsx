"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/utils/data-projects";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLButtonElement[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const textItems = ".project-kicker, .project-title, .project-copy";
      const cardContent = ".project-card-content";

      gsap.set(textItems, {
        opacity: 0,
        y: 56,
        clipPath: "inset(0 0 100% 0)",
        filter: "blur(10px)",
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        x: 72,
        y: 22,
        scale: 0.98,
        filter: "blur(12px)",
      });

      gsap.set(cardContent, {
        opacity: 0,
        y: 28,
      });

      const stopRunningTweens = () => {
        gsap.killTweensOf(textItems);
        gsap.killTweensOf(cardsRef.current);
        gsap.killTweensOf(cardContent);
      };

      const animateIn = () => {
        stopRunningTweens();

        gsap
          .timeline()
          .to(textItems, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            filter: "blur(0px)",
            stagger: 0.14,
            duration: 1,
            ease: "expo.out",
          })
          .to(
            cardsRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              stagger: {
                each: 0.1,
                from: "start",
              },
              duration: 0.9,
              ease: "expo.out",
            },
            "-=0.5"
          )
          .to(
            cardContent,
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.75"
          );
      };

      const animateOut = (direction: "left" | "right") => {
        stopRunningTweens();

        gsap
          .timeline()
          .to(cardContent, {
            opacity: 0,
            y: -20,
            stagger: {
              each: 0.05,
              from: direction === "left" ? "start" : "end",
            },
            duration: 0.35,
            ease: "power2.in",
          })
          .to(
            cardsRef.current,
            {
              opacity: 0,
              x: direction === "left" ? -56 : 72,
              y: direction === "left" ? -18 : 22,
              scale: 0.98,
              filter: "blur(12px)",
              stagger: {
                each: 0.06,
                from: direction === "left" ? "start" : "end",
              },
              duration: 0.62,
              ease: "power3.inOut",
            },
            "-=0.1"
          )
          .to(
            textItems,
            {
              opacity: 0,
              y: direction === "left" ? -42 : 56,
              clipPath:
                direction === "left"
                  ? "inset(100% 0 0 0)"
                  : "inset(0 0 100% 0)",
              filter: "blur(10px)",
              stagger: {
                each: 0.08,
                from: "end",
              },
              duration: 0.55,
              ease: "power3.in",
            },
            "-=0.45"
          );
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 18%",
        onEnter: animateIn,
        onEnterBack: animateIn,
        onLeave: () => animateOut("left"),
        onLeaveBack: () => animateOut("right"),
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const scrollProjects = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#07090F] px-6 py-32 text-white sm:px-[70px]"
    >
      <div className="absolute left-[-18%] top-[18%] h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[160px]" />
      <div className="relative z-10 grid items-end gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-xl">
          <p className="project-kicker mb-6 text-sm uppercase tracking-[0.35em] text-[#178BFF]">
            Selected Works
          </p>

          <h2 className="project-title text-[52px] font-semibold uppercase leading-[0.9] tracking-[0.18em] text-zinc-300 sm:text-[76px]">
            Project
            <br />
            Gallery .
          </h2>

          <div className="project-copy mt-10 h-[3px] w-[120px] bg-[#178BFF]" />

          <p className="project-copy mt-9 text-[16px] leading-8 text-zinc-400">
            Scroll ke samping untuk melihat project lainnya. Klik salah satu
            kartu untuk membuka detail, tech stack, dan link project.
          </p>

          <div className="project-copy mt-9 flex gap-3">
            <button
              type="button"
              onClick={() => scrollProjects("left")}
              className="grid h-11 w-11 place-items-center border border-white/10 bg-white/[0.03] text-xl text-white transition hover:border-[#178BFF]/70 hover:bg-[#178BFF]/15"
              aria-label="Scroll projects left"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => scrollProjects("right")}
              className="grid h-11 w-11 place-items-center border border-white/10 bg-white/[0.03] text-xl text-white transition hover:border-[#178BFF]/70 hover:bg-[#178BFF]/15"
              aria-label="Scroll projects right"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x gap-5 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => setSelectedProject(project)}
              className="group relative h-[430px] w-[285px] shrink-0 snap-start overflow-hidden border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-2 hover:border-[#178BFF]/70 sm:w-[330px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 285px, 330px"
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/55 to-transparent" />
              <div className="absolute inset-0 bg-[#178BFF]/0 mix-blend-screen transition duration-500 group-hover:bg-[#178BFF]/10" />

              <div className="project-card-content absolute inset-x-0 bottom-0 p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#4DA3FF]">
                  0{index + 1} / {project.category}
                </p>

                <h3 className="text-[28px] font-semibold leading-tight text-white">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                  {project.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#030409]/85 px-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative grid max-h-[88vh] w-full max-w-5xl overflow-y-auto border border-white/10 bg-[#07090F] shadow-[0_0_80px_rgba(23,139,255,0.22)] lg:grid-cols-[0.9fr_1.1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[320px] overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] to-transparent lg:bg-gradient-to-r" />
            </div>

            <div className="p-7 sm:p-10">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-white/10 bg-black/30 text-xl text-white transition hover:border-[#178BFF]/70"
                aria-label="Close project detail"
              >
                x
              </button>

              <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#178BFF]">
                {selectedProject.category}
              </p>

              <h3
                id="project-modal-title"
                className="max-w-xl text-[38px] font-semibold leading-tight sm:text-[52px]"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-7 text-[16px] leading-8 text-zinc-400">
                {selectedProject.detail}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-3 border border-[#178BFF]/70 px-5 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:bg-[#178BFF]/15"
              >
                View Project <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hide="true"]';

export default function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!isFinePointer) {
      cursor.style.display = "none";
      dot.style.display = "none";
      return;
    }

    const render = () => {
      smoothRef.current.x += (positionRef.current.x - smoothRef.current.x) * 0.18;
      smoothRef.current.y += (positionRef.current.y - smoothRef.current.y) * 0.18;

      cursor.style.transform = `translate3d(${smoothRef.current.x}px, ${smoothRef.current.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;

      frameRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const isInteractive = target?.closest(interactiveSelector);

      cursor.dataset.hidden = isInteractive ? "true" : "false";
      dot.dataset.hidden = isInteractive ? "true" : "false";
    };

    const handleMouseLeave = () => {
      cursor.dataset.hidden = "true";
      dot.dataset.hidden = "true";
    };

    const handleMouseEnter = () => {
      cursor.dataset.hidden = "false";
      dot.dataset.hidden = "false";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        data-hidden="true"
        className="fixed left-0 top-0 z-[1000] hidden h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(125,233,255,0.22)_0%,rgba(23,139,255,0.12)_34%,transparent_68%)] opacity-0 mix-blend-screen blur-sm transition-[opacity,transform] duration-200 ease-out data-[hidden=false]:opacity-70 data-[hidden=true]:scale-75 md:block"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        data-hidden="true"
        className="fixed left-0 top-0 z-[1001] hidden h-1.5 w-1.5 rounded-full bg-[#7DE9FF]/70 opacity-0 shadow-[0_0_12px_rgba(125,233,255,0.7)] transition-[opacity,transform] duration-150 ease-out data-[hidden=false]:opacity-60 data-[hidden=true]:scale-50 md:block"
        aria-hidden="true"
      />
    </>
  );
}

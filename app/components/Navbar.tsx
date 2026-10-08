"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";

type NavMode = "hero" | "middle" | "contact";

export default function Navbar() {
  const [mode, setMode] = useState<NavMode>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleProgress = () => {
      const contact = document.getElementById("contact");
      const contactRect = contact?.getBoundingClientRect();

      if (contactRect && contactRect.top < window.innerHeight * 0.45) {
        setMode("contact");
        return;
      }

      setMode("hero");
    };

    const handleScroll = () => {
      const home = document.getElementById("home");
      const work = document.getElementById("work");
      const contact = document.getElementById("contact");

      if (!home || !work || !contact) return;

      const homeRect = home.getBoundingClientRect();
      const workRect = work.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();

      if (contactRect.top < window.innerHeight * 0.45) {
        setMode("contact");
        return;
      }

      if (workRect.top < window.innerHeight * 0.45) {
        setMode("middle");
        return;
      }

      if (homeRect.bottom > window.innerHeight * 0.2) {
        setMode("hero");
        return;
      }

      setMode("middle");
    };

    window.addEventListener("cinematic-progress", handleProgress);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("cinematic-progress", handleProgress);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = ["HOME", "ABOUT", "REVIEWS", "CONTACT"];

  const navHrefByItem: Record<(typeof navItems)[number], string> = {
    HOME: "#home",
    ABOUT: "#about",
    REVIEWS: "#work",
    CONTACT: "#contact",
  };

  const scrollToSequence = (progress: number, hash: string) => {
    const home = document.getElementById("home");

    if (!home) return;

    const sequenceTop = home.getBoundingClientRect().top + window.scrollY;
    const sequenceScrollLength = window.innerHeight * 2.5;

    window.history.pushState(null, "", hash);
    window.scrollTo({
      top: sequenceTop + sequenceScrollLength * progress,
      behavior: "smooth",
    });
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number]
  ) => {
    if (item === "HOME") {
      event.preventDefault();
      scrollToSequence(0, "#home");
      setMenuOpen(false);
      return;
    }

    if (item === "ABOUT") {
      event.preventDefault();
      scrollToSequence(0.62, "#about");
      setMenuOpen(false);
      return;
    }

    setMenuOpen(false);
  };

  return (
    <>
      {/* LOGO HERO ONLY */}
      <div
        className={`
          fixed
          left-5
          top-5
          z-[999]
          transition-all
          duration-700
          ease-[cubic-bezier(.22,1,.36,1)]
          md:left-8
          md:top-8
          lg:left-[70px]
          lg:top-[45px]
          ${
            mode === "hero"
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0 pointer-events-none"
          }
        `}
      >
        <Link href="#home">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={75}
            height={75}
            preload
            className="h-12 w-12 object-contain md:h-16 md:w-16 lg:h-[75px] lg:w-[75px]"
          />
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className={`
          fixed
          right-5
          top-5
          z-[1000]
          rounded-full
          border
          border-white/10
          bg-black/45
          px-4
          py-2.5
          text-[12px]
          font-medium
          tracking-[0.24em]
          text-white
          backdrop-blur-md
          transition
          hover:border-[#178BFF]/70
          hover:text-[#178BFF]
          md:hidden
          ${mode === "contact" ? "left-5 right-auto" : ""}
        `}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        MENU
      </button>

      {/* NAV */}
      <nav
        className={`
          fixed
          z-[999]
          hidden
          transition-all
          duration-700
          ease-[cubic-bezier(.22,1,.36,1)]
          md:flex

          ${
            mode === "hero"
              ? "left-1/2 top-6 -translate-x-1/2 flex-row items-center gap-4 rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:right-8 md:left-auto md:top-9 md:translate-x-0 md:gap-7 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none lg:right-[70px] lg:top-[55px] lg:gap-[42px]"
              : mode === "middle"
              ? "left-1/2 top-6 -translate-x-1/2 flex-row items-center gap-4 rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:top-9 md:gap-7 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none lg:top-[55px] lg:gap-[42px]"
              : "left-5 top-20 flex-col items-start gap-4 md:left-8 md:top-24 md:gap-6 lg:left-[70px] lg:top-[95px] lg:gap-7"
          }
        `}
      >
        {navItems.map((item) => (
          <Link
            key={item}
            href={navHrefByItem[item]}
            onClick={(event) => handleNavClick(event, item)}
            className="
              text-[12px]
              font-light
              tracking-[0.02em]
              text-white
              transition
              duration-300
              hover:text-[#178BFF]
              sm:text-[14px]
              md:text-[20px]
              md:tracking-[-0.02em]
              lg:text-[26px]
            "
          >
            {item}
          </Link>
        ))}
      </nav>

      <div
        className={`
          fixed
          inset-0
          z-[1001]
          bg-[#030409]/88
          px-5
          py-5
          backdrop-blur-xl
          transition
          duration-300
          md:hidden
          ${
            menuOpen
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center"
            tabIndex={menuOpen ? 0 : -1}
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[20px] text-white transition hover:border-[#178BFF]/70 hover:text-[#178BFF]"
            aria-label="Close navigation"
            tabIndex={menuOpen ? 0 : -1}
          >
            x
          </button>
        </div>

        <div className="mt-20 border-t border-white/10">
          {navItems.map((item) => (
            <Link
              key={item}
              href={navHrefByItem[item]}
              onClick={(event) => handleNavClick(event, item)}
              className="flex items-center justify-between border-b border-white/10 py-6 text-[30px] font-light leading-none tracking-[-0.03em] text-white transition hover:text-[#178BFF]"
              tabIndex={menuOpen ? 0 : -1}
            >
              {item}
              <span className="text-[16px] text-[#178BFF]">-&gt;</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

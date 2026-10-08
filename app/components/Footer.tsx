"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socials = [
    {
      href: "https://instagram.com",
      icon: "/images/sosmed/instagram2.png",
      alt: "instagram",
    },
    {
      href: "https://linkedin.com",
      icon: "/images/sosmed/linkedin2.png",
      alt: "linkedin",
    },
    {
      href: "https://github.com",
      icon: "/images/sosmed/github2.png",
      alt: "github",
    },
  ];

  return (
    <footer
      className="
        relative
        flex
        min-h-22.5
        items-center
        justify-between
        gap-5
        border-t
        border-white/10
        bg-[#171717]
        px-5
        py-5
        sm:px-8
        md:px-11.25
      "
    >
      {/* LEFT LOGO */}
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={42}
          height={42}
          className="object-contain"
        />
      </Link>

      {/* RIGHT SOCIAL */}
      <div className="flex items-center gap-5">
        {socials.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            className="
              transition-all
              duration-300
              hover:scale-110
              hover:opacity-80
            "
          >
            <Image
              src={item.icon}
              alt={item.alt}
              width={25}
              height={25}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </footer>
  );
}

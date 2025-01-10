"use client";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/app/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AudioLink } from "./audio-link";

export const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spanStyle, setSpanStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/labs", label: "Labs" },
    { href: "/now", label: "Now" },
  ];

  useEffect(() => {
    const updateSpanPosition = () => {
      const navLinks = navRef.current?.querySelectorAll("a");
      if (navLinks && navLinks[activeIndex]) {
        const link = navLinks[activeIndex] as HTMLElement;
        const { offsetLeft, offsetWidth } = link;
        setSpanStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    updateSpanPosition();
    window.addEventListener("resize", updateSpanPosition);
    return () => window.removeEventListener("resize", updateSpanPosition);
  }, [activeIndex]);

  return (
    <header className="w-full max-w-xl z-50 top-10 p-3 pr-6 flex flex-col gap-y-8 bg-white/5 rounded-full border border-white/10 shadow-lg fixed backdrop-blur-md drop-shadow-xl justify-between items-center">
      <div className="flex justify-between items-center w-full gap-x-3">
        <Link href="/" className="flex items-center gap-x-3">
          <Image
            src="/images/me.jpg"
            alt="Joe Richardson"
            width={35}
            height={35}
            className="rounded-full hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={() => setActiveIndex(0)}
          />
          <div className="flex flex-col">
            <p>{SITE_TITLE}</p>
            <p className="text-xs opacity-50">{SITE_DESCRIPTION}</p>
          </div>
        </Link>

        <nav
          ref={navRef}
          className="text-xs font-medium flex items-center gap-x-6 transform relative"
        >
          <span
            className="h-[0.4px] absolute bottom-[-24px] transition-all duration-300 bg-gradient-to-l from-transparent via-white to-transparent"
            style={{
              left: `${spanStyle.left}px`,
              width: `${spanStyle.width}px`,
            }}
          />
          {links.map((link, index) => (
            <AudioLink
              key={link.href}
              href={link.href}
              onClick={() => setActiveIndex(index)}
            >
              {link.label}
            </AudioLink>
          ))}
          <button>
            <span className="border border-light w-4 h-4 block rounded-full bg-gradient-to-r [background:linear-gradient(to_right,_transparent_0%,_transparent_50%,_white_50%,_white_100%)]" />
            <p className="sr-only">Toggle Theme</p>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

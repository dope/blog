"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type AudioLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
};

export const AudioLink = ({
  children,
  href,
  className,
  onClick,
}: AudioLinkProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/click.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audioRef.current = null;
    };
  }, []);

  const handleClick = () => {
    audioRef.current?.play();
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

"use client";
import Image from "next/image";
import Link from "next/link";
import ComingSoonOverlay from "./ComingSoonOverlay";
import { geo } from "@/utils/fonts";

interface HeaderProps {
  geoClassName: string;
}

const Header: React.FC<HeaderProps> = ({ geoClassName }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#4A7C59]/20 w-full px-6">
      <div className="flex items-center justify-between h-16 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Zhenglong"
              width={32}
              height={32}
              className="w-full h-full"
            />
          </div>
          <span
            className={`text-xl tracking-wider text-[#4A7C59] ${geoClassName}`}
          >
            ZHENGLONG
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="https://docs.zhenglong.finance"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            Docs
          </a>
          <ComingSoonOverlay>
            <a
              href="#"
              className="text-[#F5F5F5]/50 tracking-wider cursor-not-allowed whitespace-nowrap"
            >
              Governance
            </a>
          </ComingSoonOverlay>
          <a
            href="https://discord.com/invite/BW3P62vJXT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            Discord
          </a>
          <a
            href="https://litepaper.zhenglong.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors whitespace-nowrap"
          >
            Litepaper
          </a>
        </div>

        {/* Launch App Button */}
        <ComingSoonOverlay>
          <button
            className={`bg-[#4A7C59]/50 px-6 py-2 text-white/50 text-lg tracking-wider uppercase cursor-not-allowed ${geoClassName}`}
          >
            Launch App
          </button>
        </ComingSoonOverlay>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#F5F5F5] hover:text-[#F5F5F5]/80 transition-colors">
          {/* Menu Icon */}
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;

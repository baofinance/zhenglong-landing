"use client";
import { useRef, useState, useEffect } from "react";
import { geo } from "@/utils/fonts";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://zhenglong.finance/ido";

  const SHARE_MSG = `I'm now a Chief Steam Operator at Zhenglong! 🥢🧧 The home of extra tasty yield & leverage dishes. Get some STEAM!`;
  const HASHTAGS = "Zhenglong,IDO,DeFi";

  // Close popover on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent | KeyboardEvent) {
      if (
        e instanceof MouseEvent &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handle);
    };
  }, [open]);

  // Twitter share link
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    SHARE_MSG
  )}&url=${encodeURIComponent(url)}&hashtags=${HASHTAGS}`;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#4A7C59] text-[#4A7C59] font-bold uppercase tracking-wider ${geo.className} hover:bg-[#4A7C59]/10 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] transition-colors`}
        style={{ borderRadius: 0 }}
        aria-label="Share"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v16"
          />
        </svg>
        Share
      </button>
      {open && (
        <div
          ref={popoverRef}
          className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 bg-[#1A1A1A] border border-[#4A7C59] text-[#F5F5F5] shadow-xl p-4"
          style={{ borderRadius: 0 }}
        >
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4A7C59] text-white font-bold uppercase tracking-wider hover:bg-[#5A8B69] transition-colors"
            style={{ borderRadius: 0 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.485 0-4.5 2.014-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.575 1.67 4.905c-.388.666-.61 1.44-.61 2.263 0 1.563.796 2.942 2.006 3.75a4.48 4.48 0 01-2.037-.563v.057c0 2.183 1.553 4.005 3.617 4.422-.378.104-.776.16-1.187.16-.29 0-.57-.028-.844-.08.57 1.78 2.223 3.078 4.183 3.113A8.98 8.98 0 012 19.54a12.68 12.68 0 006.88 2.017c8.253 0 12.77-6.833 12.77-12.76 0-.195-.004-.39-.013-.583A9.14 9.14 0 0024 4.59a8.94 8.94 0 01-2.54.698z" />
            </svg>
            Share on Twitter
          </a>
        </div>
      )}
    </div>
  );
}

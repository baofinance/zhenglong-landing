"use client";

// Coming Soon Component
const ComingSoonOverlay = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative block group ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 w-full h-full bg-black/80 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span
          className={`text-[#4A7C59] tracking-wider whitespace-nowrap font-geo text-xl`}
        >
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default ComingSoonOverlay;

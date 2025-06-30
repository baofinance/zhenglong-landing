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
    <div className={`relative inline-block ${className}`}>
      {children}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <span
          className={`text-[#4A7C59] tracking-wider whitespace-nowrap`}
        >
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default ComingSoonOverlay; 
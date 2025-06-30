"use client";

interface UseCaseBoxProps {
  title: string;
  description: string;
}

const UseCaseBox: React.FC<UseCaseBoxProps> = ({ title, description }) => {
  return (
    <div className="flip-card relative w-full h-64 cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      <div className="flip-card-inner w-full h-full">
        {/* Front of card */}
        <div className="flip-card-front bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#4A7C59]/50 p-6 flex flex-col items-center justify-center text-center hover:border-[#4A7C59] hover:shadow-[0_0_20px_rgba(74,124,89,0.3)]">
          <h3 className="text-xl font-geo tracking-wider text-[#F5F5F5]">
            {title}
          </h3>
        </div>

        {/* Back of card */}
        <div className="flip-card-back bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#4A7C59]/50 p-6 flex flex-col items-center justify-center text-center hover:border-[#4A7C59] hover:shadow-[0_0_20px_rgba(74,124,89,0.3)]">
          <p className="text-sm text-[#F5F5F5]/80 font-light leading-relaxed mb-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCaseBox;

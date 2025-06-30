"use client";

const Footer = () => {
  const links = [
    {
      name: "X",
      url: "https://x.com/ZhenglongFi",
    },
    {
      name: "Discord",
      url: "https://discord.com/invite/BW3P62vJXT",
    },
    {
      name: "Docs",
      url: "https://docs.zhenglong.finance",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-[#4A7C59]/20 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-[#F5F5F5]/80 hover:text-[#F5F5F5] tracking-wider transition-colors font-geo"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

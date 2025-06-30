import type { Metadata } from "next";
import { spaceGrotesk, geo } from "@/utils/fonts";
import "./globals.css";
import { TransactionProvider } from "@/contexts/Transactions";
import NotificationWrapper from "@/components/NotificationWrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Zhenglong Protocol",
  description: "Create tokens pegged to real-world data feeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geo.variable}`}>
      <body className="font-sans antialiased">
        <TransactionProvider>
          <NotificationWrapper />
          {children}
          <Analytics />
        </TransactionProvider>
      </body>
    </html>
  );
}

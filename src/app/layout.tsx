import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TransactionProvider } from "@/contexts/Transactions";
import NotificationWrapper from "@/components/NotificationWrapper";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <TransactionProvider>
          <NotificationWrapper />
          {children}
        </TransactionProvider>
      </body>
    </html>
  );
}

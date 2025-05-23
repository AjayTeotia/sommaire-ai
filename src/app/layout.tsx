import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

// Component
import { Header } from "@/components/_common/Header";
import { Footer } from "@/components/_common/Footer";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sommaire - AI-Powered PDF Summarization",
  description: "Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontSans.variable} font-sans antialiased`}
        >
          <div className="relative flex flex-col min-h-screen">
            {/* Header  */}
            <Header />

            {/* Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            {/* <Footer /> */}
          </div>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

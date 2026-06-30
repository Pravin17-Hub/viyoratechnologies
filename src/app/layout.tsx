import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ParticlesBackground } from "@/components/shared/particles";
import { CustomCursor } from "@/components/shared/custom-cursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viyora Technologies | Product Development Studio",
  description: "A student-led product studio crafting premium web apps, AI integrations, and digital experiences. Built fast. Built beautiful.",
  metadataBase: new URL("https://viyoratechnologies.com"),
  openGraph: {
    title: "Viyora Technologies",
    description: "A student-led product studio crafting premium web apps, AI integrations, and digital experiences.",
    type: "website",
    locale: "en_US",
    url: "https://viyoratechnologies.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-500 overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
        <ThemeProvider>
          {/* Disabled custom cursor (simple pointer) */}
          <CustomCursor />

          {/* Global particle canvas */}
          <ParticlesBackground />

          {/* Navigation */}
          <Navbar />

          {/* Page content */}
          <main className="flex-grow flex flex-col relative z-10 w-full">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

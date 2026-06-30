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
  title: {
    default: "Viyora Technologies | Software Development & AI Solutions",
    template: "%s | Viyora Technologies"
  },
  description: "A premium software development and AI solutions product studio crafting web applications, SaaS platforms, and custom digital experiences.",
  keywords: [
    "Viyora Technologies",
    "Software Development Company",
    "Web Development Services",
    "Mobile App Development",
    "AI Solutions",
    "SaaS Development",
    "UI/UX Design",
    "Custom Software Development",
    "Digital Transformation"
  ],
  metadataBase: new URL("https://viyoratechnologies.com"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Viyora Technologies | Software Development & AI Solutions",
    description: "A premium software development and AI solutions product studio crafting web applications, SaaS platforms, and custom digital experiences.",
    type: "website",
    locale: "en_US",
    url: "https://viyoratechnologies.com",
    siteName: "Viyora Technologies",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Viyora Technologies Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viyora Technologies | Software Development & AI Solutions",
    description: "A premium software development and AI solutions product studio crafting web applications, SaaS platforms, and custom digital experiences.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

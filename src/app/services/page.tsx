import { Metadata } from "next";
import ServicesPage from "./services-client";

export const metadata: Metadata = {
  title: "Professional Web Development & AI Solutions Services",
  description: "Browse the design, custom software engineering, next-generation web application development, and AI integration services offered by Viyora Technologies.",
  alternates: {
    canonical: "https://viyoratechnologies.com/services",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Custom Web Development",
        "provider": {
          "@type": "Organization",
          "name": "Viyora Technologies",
          "url": "https://viyoratechnologies.com"
        },
        "description": "Crafting premium Next.js, React, and TypeScript web applications with responsive glassmorphism designs and smooth framer-motion animations."
      },
      {
        "@type": "Service",
        "name": "AI Solutions & Integrations",
        "provider": {
          "@type": "Organization",
          "name": "Viyora Technologies",
          "url": "https://viyoratechnologies.com"
        },
        "description": "Building next-generation intelligent systems including AI agents, vector search, automated workflows, and LLM implementations."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What web development technologies do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We specialize in modern stack solutions including Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Node.js, and Firebase."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer custom AI integrations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we build custom AI solutions, automating backend workflows, connecting LLMs, configuring vector search databases, and writing intelligent agent prompts."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPage />
    </>
  );
}

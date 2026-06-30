import { Metadata } from "next";
import HomePage from "./home-client";

export const metadata: Metadata = {
  title: "Viyora Technologies | Software Development & AI Solutions",
  description: "A premium software development and AI solutions product studio crafting web applications, SaaS platforms, and custom digital experiences.",
  alternates: {
    canonical: "https://viyoratechnologies.com/",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Viyora Technologies",
    "url": "https://viyoratechnologies.com",
    "logo": "https://viyoratechnologies.com/logo.png",
    "image": "https://viyoratechnologies.com/logo.png",
    "description": "Viyora Technologies is a premium software development & AI solutions studio crafting high-quality web applications, SaaS platforms, and digital experiences.",
    "sameAs": [
      "https://www.instagram.com/viyoratechnologies"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-93444-38685",
      "contactType": "customer service",
      "email": "viyoratechnologies@gmail.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}

import { Metadata } from "next";
import AboutPage from "./about-client";

export const metadata: Metadata = {
  title: "About Our Studio",
  description: "Learn about the story, core principles, and engineering journey of Viyora Technologies, a product development studio specializing in web design, software engineering, and AI solutions.",
  alternates: {
    canonical: "https://viyoratechnologies.com/about",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://viyoratechnologies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://viyoratechnologies.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}

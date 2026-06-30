import { Metadata } from "next";
import CareersPage from "./careers-client";

export const metadata: Metadata = {
  title: "Join Our Team | Careers",
  description: "Are you a student developer, UI/UX designer, or AI builder? Apply to join Viyora Technologies and collaborate on real-world production projects.",
  alternates: {
    canonical: "https://viyoratechnologies.com/careers",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            "name": "Careers",
            "item": "https://viyoratechnologies.com/careers"
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
      <CareersPage />
    </>
  );
}

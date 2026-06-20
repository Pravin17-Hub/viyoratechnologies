export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  techStack: string[];
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export const servicesData: Service[] = [
  {
    id: "web-dev",
    title: "Web & SaaS Development",
    shortDesc: "Developing blazing-fast web apps and responsive portfolios.",
    longDesc: "We build premium, SEO-optimized React/Next.js web products with modern rendering strategies, serverless databases, and sleek UI systems.",
    icon: "Globe",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: ["Modern Next.js Apps", "Aesthetic Responsive Portfolios", "Interactive Dashboards", "Framer Motion Animations"]
  },
  {
    id: "ai-solutions",
    title: "AI Integrations",
    shortDesc: "Integrating smart Large Language Models and custom agents.",
    longDesc: "We design and deploy generative AI features, integrating OpenAI APIs, LangChain tools, and semantic database parsers into your software.",
    icon: "Brain",
    techStack: ["Python", "OpenAI API", "LangChain", "Vector DBs"],
    features: ["Generative AI Chatbots", "Custom Prompt Workflows", "Automated Content Synthesis", "Smart Agent Pipelines"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Systems",
    shortDesc: "Crafting beautiful glassmorphic wireframes and user flows.",
    longDesc: "We design modern, premium user interfaces from high-fidelity wireframes to interactive click prototypes with detailed developer hand-off guides.",
    icon: "Compass",
    techStack: ["Figma", "Interaction Design", "Prototyping", "Aesthetics"],
    features: ["High-Fidelity UI Mockups", "Responsive Mobile Layouts", "Interactive Figma Prototypes", "Custom Vector Icon Assets"]
  }
];

// Case studies removed — managed dynamically via projects

// Team section removed — no fake member data

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2025",
    title: "Dorm Room Beginnings",
    description: "Viyora Technologies was born in a college dorm room — a group of passionate students who refused to wait to start building real things."
  },
  {
    year: "2026",
    title: "Company Officially Started",
    description: "Viyora Technologies was formally established as a product studio, ready to help startups and organizations launch premium digital products."
  }
];

export const faqsData = [
  {
    question: "Do you design and code the websites yourselves?",
    answer: "Yes! We handle the entire lifecycle: wireframing in Figma, designing interactions, coding in Next.js, and deploying to platforms like Vercel."
  },
  {
    question: "How long does a website project usually take?",
    answer: "A standard responsive landing page or MVP takes about 2 to 4 weeks to design, develop, and launch."
  },
  {
    question: "Are your services free for student initiatives?",
    answer: "We support student hackathons and non-profit student projects. Contact us with your project idea and we will gladly discuss helping out!"
  }
];

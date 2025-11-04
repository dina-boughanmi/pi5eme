export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  fullDescription: string;
  requiredSkills: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "$120k–$180k",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    description: "Build scalable React applications for millions of users",
    fullDescription: "We're looking for an experienced React developer to join our core platform team. You'll work on performance optimization, component architecture, and state management across our entire application suite.",
    requiredSkills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    title: "Full Stack JavaScript Engineer",
    company: "WebDynamics",
    location: "San Francisco, CA",
    salary: "$130k–$190k",
    skills: ["Next.js", "Node.js", "JavaScript", "MongoDB"],
    description: "Full-stack development with modern JavaScript frameworks",
    fullDescription: "Join our growing team as a full-stack engineer. You'll design and implement features across our Next.js frontend and Node.js backend, working closely with product and design teams.",
    requiredSkills: ["JavaScript", "Next.js", "Node.js", "MongoDB", "REST APIs", "Git"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    salary: "$110k–$160k",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    description: "Infrastructure and deployment automation for cloud platforms",
    fullDescription: "Build and maintain robust infrastructure on AWS. You'll work with Docker, Kubernetes, and modern CI/CD practices to ensure our systems are scalable, reliable, and secure.",
    requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$90k–$140k",
    skills: ["Figma", "CSS", "JavaScript", "React"],
    description: "Design beautiful and intuitive user interfaces",
    fullDescription: "We're seeking a talented designer to create compelling user experiences. You'll work with Figma, prototype designs, and collaborate with developers to bring your designs to life.",
    requiredSkills: ["Figma", "CSS", "Design Systems", "User Research", "Prototyping"],
  },
  {
    id: 5,
    title: "Python Backend Developer",
    company: "DataCore",
    location: "Austin, TX",
    salary: "$100k–$150k",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    description: "Build high-performance backend services with Python",
    fullDescription: "Join our backend team to develop robust APIs and services. You'll work with Python, Django, and modern database technologies to power our data platform.",
    requiredSkills: ["Python", "Django", "PostgreSQL", "Redis", "REST APIs", "Linux"],
  },
  {
    id: 6,
    title: "QA Automation Engineer",
    company: "TestLabs",
    location: "Remote",
    salary: "$80k–$130k",
    skills: ["Selenium", "JavaScript", "Jest", "CI/CD"],
    description: "Automated testing and quality assurance for web applications",
    fullDescription: "Build and maintain comprehensive automated test suites. You'll use Selenium, Jest, and other tools to ensure high code quality and reliability across our platforms.",
    requiredSkills: ["Selenium", "JavaScript", "Jest", "CI/CD", "Testing Frameworks", "Git"],
  },
];

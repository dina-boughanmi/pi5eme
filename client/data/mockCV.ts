export interface MockCV {
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  yearsOfExperience: number;
  summary: string;
}

export const mockCV: MockCV = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Node.js"],
  experience: "5 years of professional development experience",
  yearsOfExperience: 5,
  summary: "Experienced full-stack developer with a passion for building scalable web applications. Specialized in React and modern JavaScript frameworks.",
};

export const generateMockAIMatch = (jobSkills: string[], userSkills: string[]): { score: number; matchedSkills: Record<string, number> } => {
  const matchedSkills: Record<string, number> = {};
  
  jobSkills.forEach((skill) => {
    if (userSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      matchedSkills[skill] = 90 + Math.random() * 10;
    } else {
      matchedSkills[skill] = Math.random() * 50;
    }
  });

  const matchPercentages = Object.values(matchedSkills);
  const averageMatch = matchPercentages.length > 0 
    ? Math.round(matchPercentages.reduce((a, b) => a + b, 0) / matchPercentages.length)
    : 0;

  return {
    score: Math.min(100, averageMatch),
    matchedSkills,
  };
};

export const generateMockAISummary = (score: number): string => {
  if (score >= 75) {
    return "Excellent match! Your skills align well with this position. You have strong experience in the core technologies required.";
  } else if (score >= 50) {
    return "Good match! You have most of the required skills. Some additional learning in specific areas would be beneficial.";
  } else {
    return "Fair match! You have foundational knowledge but may benefit from developing expertise in key required technologies.";
  }
};

export interface ExperienceTimelineProps {
  className?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

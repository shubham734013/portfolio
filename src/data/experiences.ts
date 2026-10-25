import { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'jecrc-btech',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'JECRC University',
    location: 'Jaipur, Rajasthan, India',
    timeline: '2024 — Expected Graduation 2028',
    statusTag: 'Current Academic Focus',
    description:
      'Pursuing a comprehensive curriculum in Computer Science & Engineering with intensive work in foundational systems and full-stack software development.',
    highlights: [
      'Core academic coursework in Data Structures, Algorithms, Object-Oriented Programming (C, C++, Python)',
      'Applied full-stack software development projects utilizing modern web frameworks and databases',
      'Active participant in university tech symposiums, algorithmic challenges, and collaborative coding labs',
    ],
    technologies: ['C', 'C++', 'Python', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Data Structures & Algorithms'],
  },
  {
    id: 'xebia-internship',
    role: 'Virtual Engineering Intern',
    organization: 'Xebia',
    location: 'Remote / Virtual Program',
    timeline: 'Two-Week Intensive Program',
    statusTag: 'Industry Exposure',
    description:
      'Completed an intensive virtual internship program providing direct exposure to modern software engineering workflows, industry practices, and collaborative development standards.',
    highlights: [
      'Studied modern software lifecycle paradigms, code review cultures, and collaborative Git practices',
      'Explored industry architectural patterns for cloud-ready, maintainable software delivery',
      'Applied disciplined problem analysis to structured development prompts and engineering assignments',
    ],
    technologies: ['Software Development Lifecycle', 'Agile Principles', 'Git Workflows', 'Architecture Review'],
  },
  {
    id: 'adobe-hackathon',
    role: 'Competitive Hackathon Participant',
    organization: 'Adobe',
    location: 'Competitive Engineering Event',
    timeline: 'Engineering Sprint Event',
    statusTag: 'Competitive Sprint',
    description:
      'Participated in the competitive Adobe Hackathon, tackling time-constrained engineering problems, rapid prototyping, and collaborative solution design.',
    highlights: [
      'Collaborated under tight sprint constraints to ideate, design, and prototype a software solution',
      'Exercised rapid architectural triage: balancing feature scope against functional implementation rigor',
      'Presented technical architecture and design trade-offs under evaluation rubrics',
    ],
    technologies: ['Rapid Prototyping', 'System Design', 'Collaborative Coding', 'Presentation'],
  },
];

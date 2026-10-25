export interface ProjectFeature {
  title: string;
  description: string;
  status: 'Implemented' | 'In Development' | 'Planned';
  icon?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  slug: string;
  category: string;
  oneLiner: string;
  description: string;
  status: 'Working Prototype' | 'In Development' | 'Production';
  statusColor: 'olive' | 'amber' | 'ink';
  technologies: string[];
  verifiedFeatures: ProjectFeature[];
  previewType: 'resq-triage' | 'gym-ledger' | 'research-blueprint';
  previewImage?: string;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  columnSpan: 'large-7' | 'offset-5' | 'full';
  architectureOverview: string;
  keyHighlights: string[];
}

export interface TechDomain {
  id: string;
  number: string;
  domainName: string;
  summary: string;
  skills: {
    name: string;
    level: string;
    relatedProjects: string[];
    engineeringNote: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  timeline: string;
  statusTag: string;
  description: string;
  highlights: string[];
  technologies?: string[];
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

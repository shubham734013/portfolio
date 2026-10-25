export interface Certificate {
  id: string;
  code: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  status: 'Verified Credential' | 'Honors Certificate' | 'Participation Distinction';
  credentialId: string;
  description: string;
  skills: string[];
  verificationUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 'xebia-cert',
    code: '01',
    title: 'Virtual Software Engineering Internship',
    issuer: 'Xebia',
    issueDate: '2024',
    category: 'Industry Engineering Program',
    status: 'Verified Credential',
    credentialId: 'XEB-INT-2024-SV640',
    description:
      'Completed intensive virtual software engineering internship focused on modern Agile lifecycle, collaborative Git development standards, and cloud-ready architectures.',
    skills: ['Software Lifecycle', 'Git Workflows', 'Agile Principles', 'Collaborative Development'],
  },
  {
    id: 'adobe-hackathon-cert',
    code: '02',
    title: 'Competitive Engineering Sprint Recognition',
    issuer: 'Adobe',
    issueDate: '2024',
    category: 'Competitive Engineering Event',
    status: 'Participation Distinction',
    credentialId: 'ADB-HCK-2024-SPRINT',
    description:
      'Participated in the competitive Adobe Hackathon, tackling time-constrained engineering problems, rapid prototyping, and collaborative system design.',
    skills: ['Rapid Prototyping', 'System Design', 'Competitive Programming', 'Team Architecture'],
  },
  {
    id: 'jecrc-dsa-cert',
    code: '03',
    title: 'Data Structures & Algorithms in C/C++',
    issuer: 'JECRC University',
    issueDate: '2024',
    category: 'Academic Honors Specialization',
    status: 'Honors Certificate',
    credentialId: 'JECRC-CSE-DSA-2024',
    description:
      'Mastery in pointer arithmetic, dynamic memory allocation, complexity analysis (Big O), trees, graphs, and foundational systems programming in C and C++.',
    skills: ['C', 'C++', 'Data Structures', 'Algorithms', 'Memory Hierarchy'],
  },
  {
    id: 'fullstack-web-cert',
    code: '04',
    title: 'Full-Stack Web Engineering & REST APIs',
    issuer: 'Academic Systems Laboratory',
    issueDate: '2025',
    category: 'Full-Stack Software Architecture',
    status: 'Verified Credential',
    credentialId: 'FSD-REST-NODE-2025',
    description:
      'Comprehensive verification in architecting full-stack web applications with React client interfaces, Node.js/Express API pipelines, and MongoDB document persistence.',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'TypeScript'],
  },
  {
    id: 'python-systems-cert',
    code: '05',
    title: 'Python for Computational Systems & Scripting',
    issuer: 'JECRC University Computing Labs',
    issueDate: '2024',
    category: 'Computational Systems',
    status: 'Verified Credential',
    credentialId: 'PY-COMP-LAB-2024',
    description:
      'Applied algorithmic problem solving, computational scripting, data parsing workflows, and automation scripts using modern Python.',
    skills: ['Python 3', 'Algorithmic Problem Solving', 'Automation Scripting', 'Data Parsing'],
  },
];

import { TechDomain } from '../types';

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'languages',
    number: '01',
    domainName: 'Core Languages',
    summary: 'Strong algorithmic fundamentals grounded in systems languages and high-velocity scripting.',
    skills: [
      {
        name: 'JavaScript (ES6+)',
        level: 'Primary Language',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Applied daily for asynchronous event loops, Promise chains, DOM updates, and backend API routes in Node.js.',
      },
      {
        name: 'TypeScript',
        level: 'Type Safety & Architecture',
        relatedProjects: ['Portfolio System', 'Gym Management SaaS'],
        engineeringNote:
          'Used to enforce compile-time contracts, shared API request/response types, and strict UI component props.',
      },
      {
        name: 'Python',
        level: 'Algorithms & Automation',
        relatedProjects: ['Academic Systems', 'ResQ 2.0'],
        engineeringNote:
          'Utilized for algorithmic problem-solving, data parsing scripts, and academic computer science projects at JECRC.',
      },
      {
        name: 'C & C++',
        level: 'Systems & Data Structures',
        relatedProjects: ['Academic Foundations'],
        engineeringNote:
          'Core foundation for memory layout, pointers, runtime complexity analysis, and university DSA coursework.',
      },
    ],
  },
  {
    id: 'frontend',
    number: '02',
    domainName: 'Frontend Engineering',
    summary: 'Crafting responsive, accessible, and high-performance user interfaces with meticulous typographic hierarchy.',
    skills: [
      {
        name: 'React',
        level: 'Component Architecture',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Engineered stateful component trees, modular custom hooks, and memoized renders across single-page applications.',
      },
      {
        name: 'Semantic HTML5',
        level: 'Structure & Accessibility',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Enforcing WCAG accessibility standards, semantic landmarks, aria attributes, and clean DOM trees.',
      },
      {
        name: 'Tailwind CSS',
        level: 'Design Systems',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Constructing token-driven, hairline-bordered Swiss editorial layouts without runtime CSS bloat.',
      },
      {
        name: 'Framer Motion',
        level: 'Choreography & Transitions',
        relatedProjects: ['Portfolio System', 'Gym Management SaaS'],
        engineeringNote:
          'Delivering physics-based layout transitions, drawer gestures, and accessible reduced-motion fallbacks.',
      },
    ],
  },
  {
    id: 'backend',
    number: '03',
    domainName: 'Backend & APIs',
    summary: 'Designing predictable, stateless REST interfaces and secure request pipelines.',
    skills: [
      {
        name: 'Node.js',
        level: 'Runtime Environment',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Executing scalable asynchronous services, modular micro-handlers, and event-driven backend tasks.',
      },
      {
        name: 'Express.js',
        level: 'HTTP Framework',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Configuring robust middleware pipelines (Helmet, CORS, rate limiters) and clean route controllers.',
      },
      {
        name: 'REST APIs',
        level: 'Interface Design',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Structuring standard HTTP verbs, parameterized resource paths, consistent error envelopes, and status codes.',
      },
    ],
  },
  {
    id: 'data',
    number: '04',
    domainName: 'Data & Persistence',
    summary: 'Document-oriented modeling and persistent store management.',
    skills: [
      {
        name: 'MongoDB',
        level: 'Document Database',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS'],
        engineeringNote:
          'Schema modeling for medical dispatch logs in ResQ 2.0 and member subscription records in Gym SaaS, with indexing and aggregation.',
      },
      {
        name: 'Mongoose',
        level: 'ODM & Validation',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Enforcing strict validation schemas at the persistence boundary with timestamping and fallback-resilient connections.',
      },
    ],
  },
  {
    id: 'tools',
    number: '05',
    domainName: 'Development Tools & Workflow',
    summary: 'Modern developer tooling ensuring reproducible builds and reliable testing.',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Version Control',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS', 'Portfolio System'],
        engineeringNote:
          'Managing branch strategies, semantic commit histories, and collaborative open-source repositories.',
      },
      {
        name: 'Postman',
        level: 'API Testing & Verification',
        relatedProjects: ['ResQ 2.0', 'Gym Management SaaS'],
        engineeringNote:
          'Drafting automated endpoint test suites, verifying status codes, and validating request/response JSON payloads.',
      },
      {
        name: 'VS Code',
        level: 'Primary IDE',
        relatedProjects: ['All Workflows'],
        engineeringNote:
          'Configured with strict TypeScript checking, ESLint rules, and customized debugging profiles.',
      },
      {
        name: 'Vite',
        level: 'Build Engine',
        relatedProjects: ['Portfolio System', 'Gym Management SaaS'],
        engineeringNote:
          'Optimized ES module bundling, near-instant HMR, and production tree-shaking.',
      },
    ],
  },
];

import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'resq-2',
    index: '01 / FEATURED SYSTEM',
    title: 'ResQ 2.0',
    slug: 'resq-2',
    category: 'Emergency Assistance / Healthcare Coordination',
    oneLiner:
      'Emergency assistance and healthcare service coordination platform connecting incident triggers with nearby hospital discovery and service requests.',
    description:
      'ResQ 2.0 is a project focused on emergency assistance and healthcare service coordination, connecting critical incident triggers with nearby hospital discovery and service requests.',
    status: 'Working Prototype',
    statusColor: 'olive',
    technologies: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'JavaScript'],
    columnSpan: 'large-7',
    featured: true,
    previewType: 'resq-triage',
    repoUrl: 'https://github.com/shubhamvaishnav/resq-2.0',
    liveUrl: undefined,
    architectureOverview:
      'Modular client-server REST architecture connecting client triage interfaces to hospital node registries and structured service request queues.',
    keyHighlights: [
      'Rapid incident triage dispatch guidance with verified severity matrices',
      'Geolocation-indexed hospital discovery across urban coordinates',
      'Structured request pipeline for emergency services and transport coordination',
      'Role-segregated authentication sessions for responders and patients',
    ],
    verifiedFeatures: [
      {
        title: 'Emergency SOS Suggestions',
        description: 'Rapid triage guidance, situational prompts, and immediate emergency trigger workflows.',
        status: 'Implemented',
      },
      {
        title: 'Hospital-Related Service Requests',
        description: 'Structured dispatch and coordination request handling for incoming medical requirements.',
        status: 'Implemented',
      },
      {
        title: 'Authentication & Role Access',
        description: 'Secure user session and identity verification flows for medical responders and users.',
        status: 'Implemented',
      },
      {
        title: 'Hospital Discovery & Map Integration',
        description: 'Geolocation-aware lookup of nearby verified healthcare facilities and emergency beds.',
        status: 'Implemented',
      },
    ],
  },
  {
    id: 'gym-saas',
    index: '02 / OPERATIONS PLATFORM',
    title: 'Gym Management SaaS',
    slug: 'gym-management-saas',
    category: 'SaaS / Business Operations',
    oneLiner:
      'Digitizing front-desk gym operations by replacing physical registers with structured member directories, attendance tracking, and subscription lifecycles.',
    description:
      'A software project focused on digitizing gym management workflows, replacing manual front-desk registers with structured member, attendance, and subscription operations.',
    status: 'In Development',
    statusColor: 'amber',
    technologies: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'JavaScript'],
    columnSpan: 'offset-5',
    featured: true,
    previewType: 'gym-ledger',
    repoUrl: 'https://github.com/shubhamvaishnav/gym-management-saas',
    liveUrl: undefined,
    architectureOverview:
      'Centralized operations dashboard connecting member profile documents, daily attendance check-in streams, and plan validity states.',
    keyHighlights: [
      'Sub-second member search by membership ID, phone, or name',
      'Digital attendance logs replacing fragile paper registers',
      'QR pass generation for frictionless front-desk check-in',
      'Subscription cycle monitoring with expiration warnings',
    ],
    verifiedFeatures: [
      {
        title: 'Member Management',
        description: 'Core directory, profile records, and contact ledger.',
        status: 'Implemented',
      },
      {
        title: 'Front-Desk Lookup',
        description: 'Fast member search, status check, and profile verification.',
        status: 'Implemented',
      },
      {
        title: 'Attendance Workflows',
        description: 'Daily check-in logging and shift register tracking.',
        status: 'In Development',
      },
      {
        title: 'QR-Based Member Interaction',
        description: 'Contactless member pass scanning and turnstile workflow.',
        status: 'In Development',
      },
      {
        title: 'Subscription Management',
        description: 'Plan billing cycles, renewal tracking, and status alerts.',
        status: 'In Development',
      },
    ],
  },
];

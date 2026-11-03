/**
 * Single source of truth for the site.
 * Content is curated from the latest resume with editorial consistency.
 */

export const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Debanshu Panda',
  firstName: 'Debanshu',
  lastName: 'Panda',
  title: 'Electrical Engineering Student | Software Developer',
  tagline: 'Building Python-Based Applications and AI-Powered Solutions',
  location: 'Jajpur Road, Odisha',
  email: 'debanshupanda2003@gmail.com',
  phone: '+91-6371324303',
  phoneHref: 'tel:+916371324303',
  linkedin: 'https://www.linkedin.com/in/debanshu-panda-0b1109413',
  github: 'https://github.com/Debanshu17',
  githubHandle: 'Debanshu17',
  resumeFile: `${BASE}DebanshuPanda_Resume_2027.pdf`,
  resumeName: 'DebanshuPanda_Resume_2027.pdf',
  /** Hero intro */
  intro:
    'I develop practical software solutions using Python and Retrieval-Augmented Generation (RAG). With a foundation in Data Structures & Algorithms, OOP, computer networking, and SAP technologies, I enjoy turning ideas into useful applications and exploring new technologies.',
  /** Full "About Me" text */
  about:
    'Electrical Engineering undergraduate with hands-on experience developing Python-based applications and AI-powered solutions using Retrieval-Augmented Generation (RAG). Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, and computer networking (TCP/IP), with knowledge of SAP ABAP Cloud and SAP S/4HANA. Interested in software development, problem-solving, and building practical technology solutions.',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const highlights = [
  {
    id: 'focus',
    title: 'Professional Focus',
    body: 'Developing Python applications and AI-driven solutions powered by Retrieval-Augmented Generation (RAG), FastAPI, and React.',
    span: 'md:col-span-4',
    icon: 'code',
  },
  {
    id: 'background',
    title: 'Academic Background',
    body: 'Pursuing B.Tech in Electrical Engineering at Odisha University of Technology and Research (2023–2027).',
    span: 'md:col-span-2',
    icon: 'bolt',
  },
  {
    id: 'foundations',
    title: 'Core Foundations',
    body: 'Strong technical grounding in Data Structures & Algorithms, Object-Oriented Programming, and Computer Networking (TCP/IP).',
    span: 'md:col-span-2',
    icon: 'nodes',
  },
  {
    id: 'industry',
    title: 'Industry Experience',
    body: 'Practical industry exposure to SAP ABAP Cloud development, SAP S/4HANA architecture, and Clean Core principles.',
    span: 'md:col-span-2',
    icon: 'layers',
  },
  {
    id: 'direction',
    title: 'Career Direction',
    body: 'Focused on building scalable software, solving challenging technical problems, and delivering reliable engineering solutions.',
    span: 'md:col-span-2',
    icon: 'arrow',
  },
  {
    id: 'positions',
    title: 'Positions of Responsibility',
    body: 'Class Representative for Electrical Engineering and Creative Head of the College Photography Club at OUTR.',
    span: 'md:col-span-3',
    icon: 'people',
  },
  {
    id: 'beyond',
    title: 'Beyond Code',
    body: 'Passionate about photography, video editing, travel, and creative content creation.',
    span: 'md:col-span-3',
    icon: 'lens',
  },
] as const

export type IconName = (typeof highlights)[number]['icon']

export const experience = [
  {
    id: 'sap',
    role: 'SAP ABAP Cloud Developer Intern',
    org: 'Industry Internship',
    dates: 'May 2026 – June 2026',
    points: [
      'Developed cloud-ready applications using SAP ABAP Cloud, gaining practical exposure to SAP S/4HANA architecture and Clean Core design principles.',
    ],
    tools: ['SAP ABAP Cloud', 'SAP S/4HANA', 'Clean Core'],
  },
  {
    id: 'hal',
    role: 'Engineering Intern',
    org: 'Hindustan Aeronautics Limited (HAL), Koraput',
    dates: 'June 2025 – July 2025',
    points: [
      'Analyzed industrial power distribution systems, electrical protection schemes, and equipment reliability practices in large-scale mission-critical facilities.',
    ],
    tools: ['Power Systems', 'Protection Schemes', 'Reliability Analysis'],
  },
]

export type ProjectVisual = 'analyzer' | 'network' | 'chat' | 'lab'

export const projects: {
  id: string
  name: string
  visual: ProjectVisual
  summary: string
  tech: string[]
  points: string[]
  demo?: string
}[] = [
  {
    id: 'resume-analyzer',
    name: 'AI Resume Analyzer',
    visual: 'analyzer',
    summary:
      'Intelligent ATS evaluation platform that extracts resume content and performs semantic matching against job descriptions in real time.',
    tech: ['React', 'FastAPI', 'Google Gemini AI', 'PyMuPDF'],
    points: [
      'Integrated Google Gemini AI to evaluate candidate resumes against target job descriptions, delivering automated ATS compatibility scores and actionable recommendations.',
      'Implemented high-accuracy text extraction using PyMuPDF to parse unstructured PDF resumes into structured data for automated analysis.',
      'Architected a decoupled application using a FastAPI backend service and a responsive React client for real-time scoring feedback.',
    ],
    demo: 'https://lnkd.in/dzNbTsBy',
  },
  {
    id: 'bmw-ai-chatbot',
    name: 'BMW AI Chatbot',
    visual: 'chat',
    summary:
      'High-accuracy RAG assistant querying BMW M technical documentation with semantic similarity gating and automated regression testing.',
    tech: ['Python', 'FastAPI', 'Google Gemini', 'RAG'],
    points: [
      'Engineered a domain-specific RAG assistant over BMW M guides, increasing in-corpus answer accuracy from 53.3% to 100% compared to a closed-book baseline.',
      'Implemented a 0.72 semantic similarity gate and citation validator, eliminating out-of-scope hallucinations from 8/10 to 0/10.',
      'Developed a 30-test automated evaluation harness with execution cost tracking that rejects invalid runs and caught three latent bugs.',
    ],
    demo: 'https://bmw-ai-chatbot-v2.onrender.com',
  },
  {
    id: 'ai-lab-report-explainer',
    name: 'AI Lab Report Explainer',
    visual: 'lab',
    summary:
      'Clinical report analyzer extracting biometric parameters to generate bilingual English and Hindi explanations with safety guardrails.',
    tech: ['Python', 'FastAPI', 'RAG', 'React'],
    points: [
      'Engineered a PDF extraction pipeline in Python to identify test names, measured values, units, and clinical reference intervals.',
      'Achieved 97.12% extraction precision and 93.31% flagging agreement across 239 benchmarked test rows spanning four medical reports.',
      'Integrated knowledge-base retrieval for clear English and Hindi explanations, deterministic range classification, and strict guardrails preventing unauthorized diagnostic claims.',
    ],
    demo: 'https://debanshu17.github.io/ai-lab-report-explainer/',
  },
  {
    id: 'network-monitor',
    name: 'Network Device Health Monitoring & Automation Tool',
    visual: 'network',
    summary:
      'Automated network monitoring script that polls Cisco hardware over SSH, audits utilization metrics, and generates structured CSV diagnostics.',
    tech: ['Python', 'SSH', 'Network Automation'],
    points: [
      'Built a Python automation utility using SSH to query Cisco network devices and compile comprehensive CSV health reports.',
      'Automated recurring health audits across distributed network equipment, eliminating repetitive manual verification routines.',
      'Implemented configurable threshold monitoring and alerting to immediately flag devices experiencing abnormal CPU or memory utilization.',
    ],
  },
]

/** Skills exactly as listed in the resume, grouped for display. */
export const skillGroups = [
  { id: 'ai', title: 'AI & Machine Learning', items: ['RAG', 'Gemini AI/LLM'] },
  { id: 'lang', title: 'Languages', items: ['Python'] },
  { id: 'web', title: 'Web & APIs', items: ['React', 'FastAPI', 'REST APIs'] },
  { id: 'cs', title: 'Computer Science', items: ['Data Structures & Algorithms', 'OOP'] },
  { id: 'net', title: 'Networking', items: ['Networking (TCP/IP)'] },
  { id: 'sap', title: 'Enterprise & SAP', items: ['SAP ABAP Cloud', 'SAP S/4HANA'] },
]

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech in Electrical Engineering',
    school: 'Odisha University of Technology and Research',
    years: '2023–2027',
    score: '70%',
    featured: true,
  },
  {
    id: 'senior',
    degree: 'Senior Secondary (Class XII)',
    school: 'Gouri Shankar Residential School (CBSE)',
    years: '2019–2021',
    score: '84%',
    featured: false,
  },
  {
    id: 'secondary',
    degree: 'Secondary (Class X)',
    school: "St. Mary's School (ICSE)",
    years: '2019',
    score: '92.6%',
    featured: false,
  },
]

const CERT = 'https://debanshu17.github.io/certificates'

export const certifications = [
  {
    id: 'sap',
    group: 'SAP Certification',
    items: [
      { label: 'SAP Certified Back-End Developer – ABAP Cloud', href: `${CERT}/sap/` },
      { label: 'SAP S/4HANA & SAP ABAP Cloud Training', href: `${CERT}/sap/` },
    ],
  },
  {
    id: 'ccna',
    group: 'Cisco Networking Academy',
    items: [
      { label: 'CCNA: Introduction to Networks', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
      { label: 'CCNA: Switching, Routing, and Wireless Essentials', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
    ],
  },
  {
    id: 'python',
    group: 'Cisco Python Certification',
    items: [{ label: 'Python Essentials 1 & 2', href: `${CERT}/cisco-python/` }],
  },
  {
    id: 'cloud',
    group: 'Cloud & AI Certifications',
    items: [
      { label: 'Cloud Computing — MSME CTTC (E-SDP)', href: `${CERT}/cloud-computing/` },
      { label: 'AWS Fundamentals', href: `${CERT}/cloud-computing/` },
      { label: 'Introduction to Data Science', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
      { label: 'Introduction to Modern AI', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
      { label: 'Applied AI: Analyze Customer Reviews', href: `${CERT}/cloud-computing/` },
    ],
  },
]

/**
 * Single source of truth for the site. Everything here comes from
 * the latest resume — nothing is added, rounded up or embellished.
 * Edit this file (and swap the PDF in /public) to update the whole site.
 */

export const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Debanshu Panda',
  firstName: 'Debanshu',
  lastName: 'Panda',
  title: 'Electrical Engineering undergraduate & aspiring software developer',
  location: 'Jajpur Road, Odisha',
  email: 'debanshupanda2003@gmail.com',
  phone: '+91-6371324303',
  phoneHref: 'tel:+916371324303',
  linkedin: 'https://www.linkedin.com/in/debanshu-panda-0b1109413',
  github: 'https://github.com/Debanshu17',
  githubHandle: 'Debanshu17',
  resumeFile: `${BASE}DebanshuPanda_Resume_2027.pdf`,
  resumeName: 'DebanshuPanda_Resume_2027.pdf',
  /** Hero intro — condensed from the resume's "About Me". */
  intro:
    'I build Python-based applications and AI-powered solutions using Retrieval-Augmented Generation (RAG), on a foundation of data structures, OOP, networking, and SAP ABAP Cloud.',
  /** Full "About Me" text from the resume. */
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
    title: 'Professional focus',
    body: 'Python-based applications and AI-powered solutions developed using Retrieval-Augmented Generation (RAG), React, and FastAPI.',
    span: 'md:col-span-4',
    icon: 'code',
  },
  {
    id: 'background',
    title: 'Background',
    body: 'B.Tech in Electrical Engineering at Odisha University of Technology and Research, 2023–2027.',
    span: 'md:col-span-2',
    icon: 'bolt',
  },
  {
    id: 'foundations',
    title: 'Foundations',
    body: 'Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, and Computer Networking (TCP/IP).',
    span: 'md:col-span-2',
    icon: 'nodes',
  },
  {
    id: 'industry',
    title: 'Industry exposure',
    body: 'SAP ABAP Cloud internship covering S/4HANA architecture, cloud programming, and Clean Core principles.',
    span: 'md:col-span-2',
    icon: 'layers',
  },
  {
    id: 'direction',
    title: 'Career direction',
    body: 'Interested in software development, problem-solving, and building practical technology solutions.',
    span: 'md:col-span-2',
    icon: 'arrow',
  },
  {
    id: 'positions',
    title: 'Positions of responsibility',
    body: 'Class Representative, Electrical Engineering, OUTR. Creative Head, College Photography Club, OUTR.',
    span: 'md:col-span-3',
    icon: 'people',
  },
  {
    id: 'beyond',
    title: 'Beyond code',
    body: 'Photography, video editing, travelling, and content creation.',
    span: 'md:col-span-3',
    icon: 'lens',
  },
] as const

export type IconName = (typeof highlights)[number]['icon']

export const experience = [
  {
    id: 'sap',
    role: 'SAP ABAP Cloud Developer Intern',
    org: 'Industry internship',
    dates: 'May 2026 – June 2026',
    points: [
      'Worked on SAP ABAP Cloud development with exposure to SAP S/4HANA architecture, cloud-based programming concepts, and Clean Core principles.',
    ],
    tools: ['ABAP Cloud', 'SAP S/4HANA', 'Clean Core'],
  },
  {
    id: 'hal',
    role: 'Intern',
    org: 'Hindustan Aeronautics Limited (HAL), Koraput',
    dates: 'June 2025 – July 2025',
    points: [
      'Analyzed industrial power distribution systems, electrical protection schemes, and reliability practices in large-scale environments.',
    ],
    tools: [] as string[],
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
      'Compares a resume against a job description with Gemini and returns an ATS score with real-time scoring and improvement suggestions.',
    tech: ['React', 'FastAPI', 'Google Gemini AI', 'PyMuPDF'],
    points: [
      'Built an AI resume analyzer using Gemini to compare resumes with job descriptions and generate ATS scores.',
      'Implemented PyMuPDF-based text extraction to parse resume PDFs into structured content for automated analysis.',
      'Designed a FastAPI backend integrated with a React frontend to deliver real-time scoring and improvement suggestions.',
    ],
    demo: 'https://lnkd.in/dzNbTsBy',
  },
  {
    id: 'network-monitor',
    name: 'Network Device Health Monitoring & Automation Tool',
    visual: 'network',
    summary:
      'A Python SSH tool that monitors Cisco devices and produces automated CSV health reports, flagging abnormal CPU or memory use.',
    tech: ['Python'],
    points: [
      'Built a Python SSH tool to monitor Cisco devices and generate automated CSV health reports.',
      'Automated periodic health checks across multiple network devices, reducing manual monitoring effort.',
      'Implemented logging and threshold-based alerts to flag devices with abnormal CPU or memory utilization.',
    ],
  },
  {
    id: 'bmw-ai-chatbot',
    name: 'BMW AI Chatbot',
    visual: 'chat',
    summary:
      'A RAG chatbot over BMW M guides with in-corpus accuracy of 100%, 0.72 similarity gating, and an automated 30-test evaluation harness.',
    tech: ['Python', 'FastAPI', 'Google Gemini', 'RAG'],
    points: [
      'Built a RAG chatbot over BMW M guides; in-corpus accuracy rose from 53.3% to 100% vs. a closed-book baseline.',
      'Added a 0.72 similarity gate and citation validator, cutting out-of-scope hallucinations from 8/10 to 0/10.',
      'Built a 30-test evaluation harness with cost tracking that rejects invalid runs and exposed three bugs.',
    ],
    demo: 'https://bmw-ai-chatbot-v2.onrender.com',
  },
  {
    id: 'ai-lab-report-explainer',
    name: 'AI Lab Report Explainer',
    visual: 'lab',
    summary:
      'PDF-based lab report analyzer extracting test values and ranges with English/Hindi explanations, deterministic classification, and safety guardrails.',
    tech: ['Python', 'FastAPI', 'RAG', 'React'],
    points: [
      'Built a PDF-based lab report analyzer to extract test names, values, units, and reference ranges using Python.',
      'Achieved 97.12% extraction precision and 93.31% flagging agreement across 239 labelled rows from four reports.',
      'Integrated knowledge-base-driven English/Hindi explanations, deterministic result classification, and safety guardrails against diagnosis and medication recommendations.',
    ],
    demo: 'https://debanshu17.github.io/ai-lab-report-explainer/',
  },
]

/** Skills exactly as listed in the resume, grouped for display. No levels or scores. */
export const skillGroups = [
  { id: 'ai', title: 'AI & Machine Learning', items: ['RAG', 'Gemini AI/LLM'] },
  { id: 'lang', title: 'Languages', items: ['Python'] },
  { id: 'web', title: 'Web & APIs', items: ['React', 'FastAPI', 'REST API'] },
  { id: 'cs', title: 'Computer Science', items: ['Data Structures & Algorithms', 'OOP'] },
  { id: 'net', title: 'Networking', items: ['Networking (TCP/IP)'] },
  { id: 'sap', title: 'SAP', items: ['ABAP Cloud', 'SAP S/4HANA'] },
]

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech, Electrical Engineering',
    school: 'Odisha University of Technology and Research',
    years: '2023–2027',
    score: '70%',
    featured: true,
  },
  {
    id: 'senior',
    degree: 'Senior Secondary',
    school: 'Gouri Shankar Residential School (CBSE)',
    years: '2019–2021',
    score: '84%',
    featured: false,
  },
  {
    id: 'secondary',
    degree: 'Secondary',
    school: "St Mary's School (ICSE)",
    years: '2019',
    score: '92.6%',
    featured: false,
  },
]

const CERT = 'https://debanshu17.github.io/certificates'

export const certifications = [
  {
    id: 'sap',
    group: 'SAP',
    items: [
      { label: 'SAP Certified Back-End Developer – ABAP Cloud', href: `${CERT}/sap/` },
      { label: 'SAP S/4HANA / SAP ABAP Cloud Training', href: `${CERT}/sap/` },
    ],
  },
  {
    id: 'ccna',
    group: 'CCNA Track, Cisco Networking Academy',
    items: [
      { label: 'Introduction to Networks', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
      { label: 'Switching, Routing & Wireless Essentials', href: `${CERT}/certificates/ccna/all-ccna-certificates.pdf` },
    ],
  },
  {
    id: 'python',
    group: 'Python',
    items: [{ label: 'Python Essentials 1 & 2', href: `${CERT}/cisco-python/` }],
  },
  {
    id: 'cloud',
    group: 'Cloud & AI',
    items: [
      { label: 'AWS Fundamentals', href: `${CERT}/cloud-computing/` },
      { label: 'Introduction to Data Science', href: `${CERT}/cloud-computing/` },
      { label: 'Introduction to Modern AI', href: `${CERT}/cloud-computing/` },
      { label: 'Apply AI: Analyze Customer Reviews', href: `${CERT}/cloud-computing/` },
    ],
  },
]

export type TrackId = 'ai-workflows' | 'data-analytics' | 'product-automation';

export interface SyllabusPhase {
  weeks: string;
  title: string;
  deliverable: string;
}

export interface CohortIntake {
  id: string;
  label: string;
  schedule: string;
  seatsLeft: number;
  totalSeats: number;
}

export interface ProgrammeTrack {
  id: TrackId;
  number: string;
  title: string;
  shortTitle: string;
  audienceFit: string;
  metaLine: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  tuitionStandard: string;
  tuitionStudent: string;
  tools: string[];
  capstoneTitle: string;
  capstoneSummary: string;
  syllabus: SyllabusPhase[];
  intakes: CohortIntake[];
}

export interface KeyFact {
  metric: string;
  label: string;
  detail: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface GraduateOutcome {
  name: string;
  role: string;
  organization: string;
  track: string;
  before: string;
  outcome: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const KEY_FACTS: KeyFact[] = [
  {
    metric: '06 Weeks',
    label: 'Applied sprint format',
    detail: 'Evening & Saturday live workshops built around university and work schedules.',
  },
  {
    metric: '12 Learners',
    label: 'Maximum per studio cohort',
    detail: 'Small peer groups paired directly with a practicing industry mentor.',
  },
  {
    metric: '03 Projects',
    label: 'Portfolio-ready builds',
    detail: 'Every sprint finishes with documented workflows, dashboards, or live tools.',
  },
  {
    metric: '100% Live',
    label: 'Mentor code & logic audits',
    detail: 'Weekly line-by-line critiques replace passive pre-recorded video playlists.',
  },
];

export const PROGRAMME_TRACKS: ProgrammeTrack[] = [
  {
    id: 'ai-workflows',
    number: '01.',
    title: 'AI Workflows',
    shortTitle: 'AI Workflows',
    audienceFit: 'Final-year students, operations analysts & junior consultants',
    metaLine: '6 Weeks · 6 hrs/week · No prior coding required',
    summary:
      'Design reliable prompt architectures, structured document extraction pipelines, and human-reviewed research assistants used in modern teams.',
    imageSrc: '/images/track-ai-workflows.jpg',
    imageAlt: 'Minimalist studio workstation showing structured AI workflow diagrams beside a cobalt notebook',
    tuitionStandard: '$690',
    tuitionStudent: '$440',
    tools: ['Structured Prompting', 'JSON Schema Validation', 'RAG Knowledge Bases', 'Eval Rubrics'],
    capstoneTitle: 'Client Triage & Knowledge Extraction Assistant',
    capstoneSummary:
      'Build and benchmark an automated multi-document intake pipeline with confidence scoring, citation checks, and a human review queue.',
    syllabus: [
      {
        weeks: 'Weeks 1–2',
        title: 'Deterministic Prompting & Structured Outputs',
        deliverable: 'Reusable prompt library producing validated JSON schemas from messy PDFs and emails.',
      },
      {
        weeks: 'Weeks 3–4',
        title: 'Grounded Retrieval & Multi-Step Reasoning',
        deliverable: 'Internal policy Q&A assistant with source citations and hallucination guardrails.',
      },
      {
        weeks: 'Weeks 5–6',
        title: 'Evaluation Rubrics & Capstone Demo Day',
        deliverable: '50-case accuracy test suite and live mentor-graded presentation.',
      },
    ],
    intakes: [
      {
        id: 'ai-jan-2026',
        label: 'Jan 12 – Feb 20, 2026',
        schedule: 'Tue & Thu · 19:00–20:30 + Sat Lab',
        seatsLeft: 4,
        totalSeats: 12,
      },
      {
        id: 'ai-feb-2026',
        label: 'Feb 9 – Mar 20, 2026',
        schedule: 'Mon & Wed · 19:00–20:30 + Sat Lab',
        seatsLeft: 9,
        totalSeats: 12,
      },
    ],
  },
  {
    id: 'data-analytics',
    number: '02.',
    title: 'Data Analytics',
    shortTitle: 'Data Analytics',
    audienceFit: 'Economics, business & STEM graduates preparing for analyst roles',
    metaLine: '6 Weeks · 7 hrs/week · Spreadsheet fluency helpful',
    summary:
      'Move beyond basic spreadsheets to clean relational datasets in SQL, run cohort analyses in Python, and ship executive decision dashboards.',
    imageSrc: '/images/track-data-analytics.jpg',
    imageAlt: 'Two young professionals reviewing clean growth and retention charts in a sunlit studio room',
    tuitionStandard: '$740',
    tuitionStudent: '$480',
    tools: ['PostgreSQL', 'Python & Pandas', 'KPI Tree Modeling', 'Interactive BI Dashboards'],
    capstoneTitle: 'Retention & Unit-Economics Executive Case Study',
    capstoneSummary:
      'Transform 120,000 raw transaction rows into an executive narrative deck with SQL models, churn cohorts, and automated weekly reporting.',
    syllabus: [
      {
        weeks: 'Weeks 1–2',
        title: 'Relational Modeling & Production SQL Queries',
        deliverable: 'Window-function retention tables and clean analytical views over multi-table schemas.',
      },
      {
        weeks: 'Weeks 3–4',
        title: 'Exploratory Analysis & Anomaly Diagnostics',
        deliverable: 'Reproducible Python notebook isolating conversion drop-offs and margin drivers.',
      },
      {
        weeks: 'Weeks 5–6',
        title: 'Executive Storytelling & Live Stakeholder Critique',
        deliverable: 'Decision-ready BI dashboard paired with a concise 5-minute board walkthrough.',
      },
    ],
    intakes: [
      {
        id: 'data-jan-2026',
        label: 'Jan 19 – Feb 27, 2026',
        schedule: 'Tue & Thu · 18:30–20:00 + Sat Lab',
        seatsLeft: 3,
        totalSeats: 12,
      },
      {
        id: 'data-mar-2026',
        label: 'Mar 2 – Apr 10, 2026',
        schedule: 'Sat & Sun · 10:00–12:30 Live Studio',
        seatsLeft: 10,
        totalSeats: 12,
      },
    ],
  },
  {
    id: 'product-automation',
    number: '03.',
    title: 'Product Automation',
    shortTitle: 'Product Automation',
    audienceFit: 'Junior product managers, founders & digital operations leads',
    metaLine: '6 Weeks · 6 hrs/week · Ideal for cross-functional builders',
    summary:
      'Connect forms, databases, webhooks, and AI classification nodes into resilient internal tools without waiting on a dedicated engineering sprint.',
    imageSrc: '/images/track-product-automation.jpg',
    imageAlt: 'Young product builder standing beside a glass whiteboard with cobalt blue system flow diagrams',
    tuitionStandard: '$720',
    tuitionStudent: '$460',
    tools: ['Webhook Orchestration', 'REST Integrations', 'Relational Ops Tables', 'Error Alerting'],
    capstoneTitle: 'End-to-End Customer Onboarding & Ops Pipeline',
    capstoneSummary:
      'Ship a live multi-system workflow handling intake validation, CRM enrichment, Slack escalations, and failure recovery logs.',
    syllabus: [
      {
        weeks: 'Weeks 1–2',
        title: 'Systems Mapping & Event-Driven Triggers',
        deliverable: 'Clean state-machine blueprint and webhook receiver connecting intake forms to ops tables.',
      },
      {
        weeks: 'Weeks 3–4',
        title: 'AI Routing, Retries & Idempotency',
        deliverable: 'Resilient multi-branch automation with rate-limit handling and alert notifications.',
      },
      {
        weeks: 'Weeks 5–6',
        title: 'Internal Tool Packaging & Handover Docs',
        deliverable: 'Production runbook and live product workflow demonstrated to guest tech leads.',
      },
    ],
    intakes: [
      {
        id: 'auto-jan-2026',
        label: 'Jan 26 – Mar 6, 2026',
        schedule: 'Wed & Fri · 19:00–20:30 + Sat Lab',
        seatsLeft: 5,
        totalSeats: 12,
      },
      {
        id: 'auto-mar-2026',
        label: 'Mar 9 – Apr 17, 2026',
        schedule: 'Tue & Thu · 19:00–20:30 + Sat Lab',
        seatsLeft: 11,
        totalSeats: 12,
      },
    ],
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01.',
    title: 'Weekly Live Briefs',
    description:
      'Every Monday starts with a scoped, industry-style brief—messy customer exports, policy PDFs, or operational bottlenecks—rather than abstract textbook exercises.',
  },
  {
    number: '02.',
    title: 'Mentor Code & Workflow Audits',
    description:
      'In twice-weekly 12-person studio sessions, senior practitioners review your SQL queries, prompt schemas, and automation error handling directly.',
  },
  {
    number: '03.',
    title: 'Verified Portfolio Capstone',
    description:
      'Week six ends with a public Demo Day critique. You graduate with a documented repository, architecture notes, and measurable before/after metrics.',
  },
];

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '92%',
    label: 'Capstone completion rate',
    context: 'Across 14 studio cohorts completed in 2025–2026.',
  },
  {
    value: '4.8 hrs/wk',
    label: 'Median manual work automated',
    context: 'Self-reported by young professional alumni 60 days post-cohort.',
  },
  {
    value: '6 Weeks',
    label: 'Zero to reviewed portfolio',
    context: 'Structured evening pacing compatible with full-time study or work.',
  },
];

export const GRADUATE_OUTCOMES: GraduateOutcome[] = [
  {
    name: 'Priya Nair',
    role: 'Operations Associate',
    organization: 'Northgate Logistics',
    track: 'AI Workflows · Autumn Cohort',
    before:
      'Spent every Monday morning manually sorting 180+ carrier exception emails into spreadsheets before team standup.',
    outcome:
      'Built a structured extraction and confidence-routing workflow in Week 4 that cut Monday triage from 6 hours to 35 minutes of human review.',
  },
  {
    name: 'Daniel Okafor',
    role: 'Junior Business Intelligence Analyst',
    organization: 'FinGrid Payments',
    track: 'Data Analytics · Winter Cohort',
    before:
      'Graduated in Economics with spreadsheet experience only and struggled to pass live SQL and cohort-retention take-home tests.',
    outcome:
      'Used his Week 5 PostgreSQL and churn-dashboard capstone as his interview portfolio walkthrough and secured his analyst role three weeks after Demo Day.',
  },
];

export const ADMISSIONS_FAQS: FaqItem[] = [
  {
    id: 'faq-prereqs',
    question: 'Do I need a computer science degree or prior coding background?',
    answer:
      'No. All three tracks start from practical fundamentals. If you are comfortable working in spreadsheets and structuring clear written logic, our pre-cohort setup guide covers everything needed before Week 1.',
  },
  {
    id: 'faq-schedule',
    question: 'Can I complete a cohort alongside full-time university classes or a job?',
    answer:
      'Yes. Live studio workshops run on weekday evenings and Saturday mornings, requiring 6 to 7 hours per week including hands-on project build time. Every live critique is recorded for cohort members.',
  },
  {
    id: 'faq-student-pricing',
    question: 'How does the student concession rate work?',
    answer:
      'Full-time university students and graduates within 12 months of graduation qualify automatically for the reduced student tuition rate ($440–$480 depending on track) upon verification of a student ID or graduation date.',
  },
  {
    id: 'faq-reservation',
    question: 'Does reserving a seat require immediate payment?',
    answer:
      'No. Submitting the registration form holds a provisional seat in your chosen cohort for 72 hours while our admissions team confirms prerequisites and shares your formal syllabus and invoice options (including employer sponsorship letters).',
  },
  {
    id: 'faq-certificate',
    question: 'What proof of completion do graduates receive?',
    answer:
      'Graduates who pass their Week 6 capstone review receive a Cobalt Studio Academy verified portfolio link containing their graded project documentation, mentor evaluation summary, and public capstone showcase.',
  },
];

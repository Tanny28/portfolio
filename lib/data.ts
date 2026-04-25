export type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  problem?: string;
  solution?: string;
  impact?: string;
  status: "shipped" | "in-progress";
  year: number;
  highlight?: boolean;
  demo?: string;
  embed?: string;
};

export const projects: Project[] = [
  {
    slug: "drone-security-analyst",
    title: "Drone Security Analyst Agent",
    tagline: "Multi-agent AI system for autonomous drone surveillance.",
    stack: [
      "LangChain",
      "Groq Llama 3.3 70B",
      "CLIP",
      "ChromaDB",
      "Moondream2 VLM",
      "Streamlit",
      "Python",
    ],
    problem:
      "Drone surveillance footage produces too much data for human operators. Existing systems either miss threats (low recall) or hallucinate them (low precision when relying purely on LLM judgment).",
    solution:
      "Built a hybrid agentic architecture — VLM (Moondream2) for perception, CLIP embeddings stored in ChromaDB for vector memory of recurring entities, a deterministic Python rules engine for alert logic (loitering, after-hours, repeat visitors), and a LangChain tool-routing agent on Groq Llama 3.3 70B for natural-language operator queries. Critically, alerts are rule-fired, not LLM-decided — the LLM never directly triggers a security alert.",
    impact:
      "5/5 correct on benchmark Q&A suite · 8/8 pytest tests passing · End-to-end deployed.",
    status: "shipped",
    year: 2025,
    highlight: true,
  },
  {
    slug: "review-intelligence",
    title: "Enterprise Review Intelligence System",
    tagline: "Live Gen-AI NLP platform spanning 4 industries.",
    stack: [
      "Gemini LLM API",
      "spaCy",
      "distilBERT",
      "VADER",
      "TextBlob",
      "Flask",
      "Streamlit",
      "HuggingFace",
    ],
    problem:
      "Enterprise review data is noisy, multi-aspect, and domain-specific. Single-model sentiment systems miss nuance across industries (banking vs FMCG vs pharma vs fragrance).",
    solution:
      "Built a 3-layer ensemble sentiment engine combining VADER, TextBlob, and distilBERT. Layered a spaCy NER + TF-IDF aspect classifier with industry-specific keyword sets across 4 verticals. Integrated Gemini LLM API for auto-generated executive summaries. Added anomaly detection for crisis alerts. Exposed as Flask REST API with side-by-side competitor comparison mode.",
    impact:
      "Live on Streamlit Cloud · 4 industry domains · Used as enterprise feedback intelligence reference.",
    status: "shipped",
    year: 2025,
    highlight: true,
    demo: "https://review-intelligence.streamlit.app/",
    embed: "https://review-intelligence.streamlit.app/?embed=true",
  },
  {
    slug: "image-weather",
    title: "Image-Based Weather Prediction System",
    tagline: "CNN pipeline that placed Runner-Up nationally.",
    stack: ["TensorFlow", "CNN", "Python", "Deep Learning"],
    problem:
      "Predict weather conditions directly from image inputs without relying on sensor data.",
    solution:
      "End-to-end CNN pipeline — preprocessing, augmentation, training, evaluation, and inference.",
    impact: "Runner-Up · GFG x Vultr Hackathon · 200+ teams nationwide.",
    status: "shipped",
    year: 2024,
  },
  {
    slug: "voice-assistant",
    title: "AI Voice Assistant System",
    tagline: "Modular Flask backend for speech + LLM.",
    stack: ["Flask", "Speech-to-Text", "LLM APIs", "Python"],
    problem:
      "Voice AI services need clean separation between transport, ASR, and LLM layers.",
    solution:
      "Designed modular backend with structured API request-response pipelines for scalable speech + LLM integration.",
    status: "shipped",
    year: 2024,
  },
];

export type SkillCategory =
  | "Gen AI"
  | "NLP & ML"
  | "Deep Learning"
  | "Backend"
  | "Data"
  | "Cloud";

export type Skill = {
  name: string;
  category: SkillCategory;
  level: "core" | "working";
};

export const skills: Skill[] = [
  // Gen AI
  { name: "LangChain", category: "Gen AI", level: "core" },
  { name: "Groq API", category: "Gen AI", level: "core" },
  { name: "Gemini API", category: "Gen AI", level: "core" },
  { name: "HuggingFace Transformers", category: "Gen AI", level: "core" },
  { name: "Prompt Engineering", category: "Gen AI", level: "core" },
  { name: "RAG", category: "Gen AI", level: "core" },
  { name: "Tool-Use Agents", category: "Gen AI", level: "core" },
  { name: "ChromaDB", category: "Gen AI", level: "core" },
  // NLP & ML
  { name: "NLTK", category: "NLP & ML", level: "core" },
  { name: "spaCy", category: "NLP & ML", level: "core" },
  { name: "VADER", category: "NLP & ML", level: "working" },
  { name: "TextBlob", category: "NLP & ML", level: "working" },
  { name: "Scikit-learn", category: "NLP & ML", level: "core" },
  { name: "TF-IDF", category: "NLP & ML", level: "working" },
  { name: "CLIP", category: "NLP & ML", level: "working" },
  { name: "Vector Search", category: "NLP & ML", level: "working" },
  { name: "OpenCV", category: "NLP & ML", level: "working" },
  { name: "distilBERT", category: "NLP & ML", level: "working" },
  // Deep Learning
  { name: "TensorFlow", category: "Deep Learning", level: "working" },
  { name: "PyTorch", category: "Deep Learning", level: "working" },
  { name: "Keras", category: "Deep Learning", level: "working" },
  { name: "CNN", category: "Deep Learning", level: "working" },
  { name: "RNN", category: "Deep Learning", level: "working" },
  { name: "LSTM", category: "Deep Learning", level: "working" },
  { name: "VLM (Moondream2)", category: "Deep Learning", level: "working" },
  // Backend
  { name: "Python", category: "Backend", level: "core" },
  { name: "Flask", category: "Backend", level: "core" },
  { name: "REST APIs", category: "Backend", level: "core" },
  { name: "SQLite", category: "Backend", level: "working" },
  { name: "Streamlit", category: "Backend", level: "core" },
  // Data
  { name: "Pandas", category: "Data", level: "working" },
  { name: "NumPy", category: "Data", level: "working" },
  { name: "Matplotlib", category: "Data", level: "working" },
  { name: "BeautifulSoup", category: "Data", level: "working" },
  { name: "Selenium", category: "Data", level: "working" },
  { name: "Web Scraping", category: "Data", level: "working" },
  // Cloud
  { name: "Git", category: "Cloud", level: "working" },
  { name: "GitHub", category: "Cloud", level: "working" },
  { name: "Linux", category: "Cloud", level: "working" },
  { name: "AWS", category: "Cloud", level: "working" },
  { name: "Google Vertex AI", category: "Cloud", level: "working" },
];

export type TimelineKind =
  | "Education"
  | "Internship"
  | "Award"
  | "Hackathon"
  | "Certifications";

export type TimelineEntry = {
  period: string;
  title: string;
  org?: string;
  type: TimelineKind;
  description?: string;
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "Aug 2023 — Present",
    title: "B.Tech, Artificial Intelligence & Machine Learning",
    org: "Pimpri Chinchwad University, Pune  ·  CGPA: 8.24",
    type: "Education",
  },
  {
    period: "May 2025 — Jun 2025",
    title: "Python Developer Intern",
    org: "Virtunexa (Remote)",
    type: "Internship",
    description:
      "Built Flask REST APIs serving production traffic. Optimized data pipelines (35% runtime reduction via vectorization).",
    tags: ["Flask", "Python", "REST APIs", "Production"],
  },
  {
    period: "2025",
    title: "Best Research Paper Award",
    org: "ICCTVB-25",
    type: "Award",
    description:
      "Hybrid ML ensemble models for renewable energy forecasting — outperformed baselines on RMSE/MAE/R².",
    tags: ["Research", "ML", "Ensembles"],
  },
  {
    period: "2024",
    title: "GFG x Vultr Hackathon — Runner-Up",
    type: "Hackathon",
    description:
      "Built CNN-based weather prediction from images. Placed against 200+ teams nationwide.",
    tags: ["CNN", "TensorFlow", "Hackathon"],
  },
  {
    period: "Ongoing",
    title: "Certifications",
    type: "Certifications",
    description:
      "AWS Academy Cloud Architecting · NVIDIA Fundamentals of Deep Learning · Oracle Cloud AI Foundations · Google Prompt Design in Vertex AI",
  },
];

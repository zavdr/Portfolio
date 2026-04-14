export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    company: "Royal Bank of Canada",
    role: "Data Science Intern",
    period: "2026",
    description:
      "building data pipelines and machine learning systems on large-scale financial data, focused on forecasting, anomaly detection, and classification in production environments.",
  },
  {
    company: "Xenix AI",
    role: "Machine Learning Engineer Intern",
    period: "2025",
    description:
      "built end-to-end machine learning pipelines for job-market data, including data ingestion, transformation, and deployment through production-ready apis.",
  },
  {
    company: "Toyota",
    role: "Software Engineer Intern",
    period: "2024",
    description:
      "developed python and sql workflows to automate financial data processing, along with backend services to improve system reliability and internal communication.",
  },
];

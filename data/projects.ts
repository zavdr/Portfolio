export type Project = {
  title: string;
  description: string;
  bullets: string[];
  stack: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "CourtIQ",
    description:
      "NBA game prediction system powered by machine learning, with an LLM-based explanation agent that narrates predictions in plain English.",
    bullets: [
      "Achieved 70% prediction accuracy and 78% AUC across test seasons.",
      "Served predictions via a Flask REST API connected to a JavaScript frontend.",
      "Integrated an LLM explanation agent to surface reasoning behind each prediction.",
    ],
    stack: ["Python", "Flask", "scikit-learn", "JavaScript", "LLM"],
    github: "https://github.com/zavdr/CourtIQ",
  },
  {
    title: "NeuroScan",
    description:
      "MRI brain scan classification model using a fine-tuned CNN + MobileNet architecture for detecting neurological conditions.",
    bullets: [
      "Achieved 92% validation accuracy on MRI classification benchmarks.",
      "Applied transfer learning with MobileNet and custom augmentation for generalization.",
      "Optimized training loop to reduce overfitting across limited medical datasets.",
    ],
    stack: ["Python", "TensorFlow", "Keras", "MobileNet", "CNN"],
    github: "https://github.com/zavdr/NeuroScan",
  },
  {
    title: "Tutoroo",
    description:
      "Adaptive AI study companion that acts like a real learning partner, prompting reasoning and switching into tutoring when help is needed.",
    bullets: [
      "supports co-student and tutor modes for different stages of problem solving.",
      "uses multimodal inputs including voice, camera, screen context, gaze, and emotion signals.",
      "adapts feedback, pacing, and hinting based on evolving learner behavior.",
    ],
    stack: [
      "TypeScript",
      "Python",
      "Next.js",
      "React",
      "Tailwind",
      "PyTorch",
    ],
    github: "https://github.com/zavdr/Tutoroo",
  },
  {
    title: "LingoLeap",
    description:
      "Language learning mobile app focused on interactive lessons, pronunciation practice, quizzes, with goals and reminders.",
    bullets: [
      "combines mini lessons, spaced repetition, and quizzes for daily learning.",
      "includes pronunciation practice with feedback and progress tracking.",
      "designed around consistent usage with goals, streaks, and reminders.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Python", "Firebase"],
    github: "https://github.com/zavdr/LingoLeap",
  },
];

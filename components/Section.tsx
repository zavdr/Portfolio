"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Section({
  children,
  delay = 0,
  className = "",
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

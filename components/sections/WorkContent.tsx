import type { Metadata } from "next";
import Section from "@/components/Section";
import ExperienceItem from "@/components/ExperienceItem";
import { experience } from "@/data/experience";

type WorkContentProps = {
  id?: string;
};

export const workMetadata: Metadata = {
  title: "Work — Zaviar Durrani",
};

export default function WorkContent({ id }: WorkContentProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Section delay={0} className="mb-10 sm:mb-12">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-soft">
          Experience
        </p>
        <h1 className="text-3xl font-medium tracking-quiet text-text sm:text-4xl">
          Work
        </h1>
        <p className="mt-4 max-w-xl text-sm lowercase leading-7 text-text-muted">
          internship experience in software development, data science, and machine learning.
        </p>
      </Section>

      <div className="space-y-6">
        {experience.map((exp, i) => (
          <Section key={exp.company} delay={0.05 * (i + 1)}>
            <ExperienceItem experience={exp} />
          </Section>
        ))}
      </div>
    </section>
  );
}

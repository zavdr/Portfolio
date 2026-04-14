import type { Metadata } from "next";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import { projects } from "@/data/projects";

type ProjectsContentProps = {
  id?: string;
};

export const projectsMetadata: Metadata = {
  title: "Projects — Zaviar Durrani",
};

export default function ProjectsContent({ id }: ProjectsContentProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Section delay={0} className="mb-10 sm:mb-12">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-soft">
          Selected Work
        </p>
        <h1 className="text-3xl font-medium tracking-quiet text-text sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl text-sm lowercase leading-7 text-text-muted">
          Selected personal and side projects.
        </p>
      </Section>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <Section key={project.title} delay={0.05 * (i + 1)}>
            <ProjectItem project={project} />
          </Section>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Project } from "@/data/projects";

type ProjectItemProps = {
  project: Project;
};

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="group surface-card p-5 sm:p-6">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-medium leading-tight tracking-quiet text-text">
            {project.title}
          </h3>
          <p className="max-w-xl text-sm lowercase leading-[1.9] text-white/60">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft"
            >
              GitHub ↗
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft"
            >
              Demo ↗
            </Link>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-soft transition-colors duration-200 group-hover:border-white/12 group-hover:bg-white/[0.045]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

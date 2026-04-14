import { Experience } from "@/data/experience";

type ExperienceItemProps = {
  experience: Experience;
};

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="group rounded-2xl border border-white/6 bg-white/[0.02] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <span className="text-base font-medium text-text">
            {experience.company}
          </span>
          <span className="mx-2 text-sm text-text-soft">·</span>
          <span className="text-sm lowercase text-text-muted">{experience.role}</span>
        </div>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
          {experience.period}
        </span>
      </div>

      <p className="max-w-xl text-sm lowercase leading-7 text-text-muted">
        {experience.description}
      </p>
    </div>
  );
}

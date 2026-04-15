import { Experience } from "@/data/experience";

type ExperienceItemProps = {
  experience: Experience;
};

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="group surface-card p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <span className="text-base font-medium tracking-quiet text-text">
            {experience.company}
          </span>
          <span className="mx-2 text-sm text-text-soft">·</span>
          <span className="text-sm lowercase text-white/58">{experience.role}</span>
        </div>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
          {experience.period}
        </span>
      </div>

      <p className="max-w-xl text-sm lowercase leading-[1.9] text-white/60">
        {experience.description}
      </p>
    </div>
  );
}

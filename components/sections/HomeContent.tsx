import Link from "next/link";
import Section from "@/components/Section";
import { site } from "@/data/site";

type HomeContentProps = {
  id?: string;
};

export default function HomeContent({ id }: HomeContentProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Section delay={0} className="mb-10 sm:mb-14">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-soft">
          University of Waterloo
        </p>
        <h1 className="max-w-2xl text-4xl font-medium tracking-quiet text-text sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-text-muted sm:text-[15px]">
          {site.tagline}
        </p>
      </Section>

      <Section delay={0.1} className="mb-12 space-y-5 border-t border-white/6 pt-8">
        <p className="max-w-2xl text-base leading-8 text-text">{site.intro}</p>
        <p className="max-w-2xl text-sm leading-7 text-text-muted">{site.focus}</p>
        <p className="max-w-2xl text-sm leading-7 text-text-muted">
          {site.currentRole}
        </p>
      </Section>

      <Section delay={0.2} className="border-t border-white/6 pt-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft hover:text-text"
          >
            GitHub ↗
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft hover:text-text"
          >
            LinkedIn ↗
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft hover:text-text"
          >
            Email ↗
          </Link>
        </div>
      </Section>
    </section>
  );
}

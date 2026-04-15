import Link from "next/link";
import AnimatedSphere from "@/components/AnimatedSphere";
import Section from "@/components/Section";
import { site } from "@/data/site";

type HomeContentProps = {
  id?: string;
};

export default function HomeContent({ id }: HomeContentProps) {
  return (
    <section id={id} className="relative z-10 scroll-mt-24">
      <Section delay={0} className="mb-14 sm:mb-[4.5rem]">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-soft sm:mb-5">
          University of Waterloo
        </p>
        <h1 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.03em] text-text sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-[1.9] text-white/62 sm:mt-5 sm:text-[15px]">
          {site.tagline}
        </p>

        <div className="mt-12 lg:hidden">
          <AnimatedSphere />
        </div>
      </Section>

      <Section delay={0.1} className="mb-14 space-y-6 border-t border-white/6 pt-9 sm:pt-10">
        <p className="max-w-2xl text-[15px] leading-[1.95] text-text sm:text-base">
          {site.intro}
        </p>
        <p className="max-w-2xl text-sm leading-[1.9] text-white/60">{site.focus}</p>
        <p className="max-w-2xl text-sm leading-[1.9] text-white/60">
          {site.currentRole}
        </p>
      </Section>

      <Section delay={0.2} className="border-t border-white/6 pt-9 sm:pt-10">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link inline-link-hover-only font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft"
          >
            GitHub ↗
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link inline-link-hover-only font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft"
          >
            LinkedIn ↗
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="inline-link inline-link-hover-only font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft"
          >
            Email ↗
          </Link>
        </div>
      </Section>
    </section>
  );
}

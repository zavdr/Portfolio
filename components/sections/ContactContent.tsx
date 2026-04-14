import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { site } from "@/data/site";

type ContactContentProps = {
  id?: string;
};

export const contactMetadata: Metadata = {
  title: "Contact — Zaviar Durrani",
};

export default function ContactContent({ id }: ContactContentProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <Section delay={0} className="mb-10 sm:mb-12">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-soft">
          Reach Out
        </p>
        <h1 className="text-3xl font-medium tracking-quiet text-text sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 max-w-xl text-sm lowercase leading-7 text-text-muted">
          Feel free to reach out for opportunities, collaborations, or just to connect.
        </p>
      </Section>

      <Section delay={0.1}>
        <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-20 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
                Email
              </span>
              <Link
                href={`mailto:${site.email}`}
                className="text-sm lowercase text-text-muted hover:text-text"
              >
                {site.email}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
                GitHub
              </span>
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lowercase text-text-muted hover:text-text"
              >
                github.com/zavdr ↗
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
                LinkedIn
              </span>
              <Link
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lowercase text-text-muted hover:text-text"
              >
                linkedin.com/in/zaviardurrani ↗
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}

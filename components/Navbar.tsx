"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

const TARGET_SECTION_KEY = "portfolio-target-section";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      const threshold = 180;
      let currentSection = "home";

      for (const item of navigation) {
        const element = document.getElementById(item.sectionId);

        if (!element) {
          break;
        }

        if (element.getBoundingClientRect().top <= threshold) {
          currentSection = item.sectionId;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    href: string
  ) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    if (pathname === "/") {
      window.history.replaceState(null, "", href);
      setActiveSection(sectionId);
      window.dispatchEvent(
        new CustomEvent("portfolio:reveal-section", {
          detail: { sectionId, behavior: "smooth" },
        })
      );
      return;
    }

    sessionStorage.setItem(TARGET_SECTION_KEY, sectionId);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-transparent bg-canvas">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="brand-link text-sm font-medium tracking-quiet text-text"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-5 sm:gap-6">
          {navigation.map((link) => {
            const isActive =
              pathname === "/"
                ? activeSection === link.sectionId
                : pathname === link.routePath;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleSectionClick(event, link.sectionId, link.href)}
                data-active={isActive}
                className="nav-link text-sm"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

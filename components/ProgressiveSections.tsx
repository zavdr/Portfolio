"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const REVEAL_SCROLL_DELTA = 120;
const TARGET_SECTION_KEY = "portfolio-target-section";

type RevealSectionDetail = {
  sectionId: string;
  behavior?: ScrollBehavior;
};

type ProgressiveSectionsProps = {
  children: ReactNode;
  sectionIds: string[];
};

export default function ProgressiveSections({
  children,
  sectionIds,
}: ProgressiveSectionsProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [sentinelVisible, setSentinelVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lastRevealScrollY = useRef(0);

  const revealSection = useCallback(
    (sectionId: string, behavior: ScrollBehavior = "smooth") => {
      const targetIndex = sectionIds.findIndex((currentId) => currentId === sectionId);

      if (targetIndex === -1) {
        return;
      }

      setSentinelVisible(false);
      lastRevealScrollY.current = window.scrollY;
      setUnlockedCount((current) => Math.max(current, targetIndex + 1));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior,
            block: "start",
          });
        });
      });
    },
    [sectionIds]
  );

  useEffect(() => {
    if (unlockedCount >= items.length || !sentinelRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        setSentinelVisible(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [items.length, unlockedCount]);

  useEffect(() => {
    if (!sentinelVisible || unlockedCount >= items.length) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < lastRevealScrollY.current + REVEAL_SCROLL_DELTA) {
        return;
      }

      setSentinelVisible(false);
      lastRevealScrollY.current = window.scrollY;
      setUnlockedCount((current) => Math.min(current + 1, items.length));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items.length, sentinelVisible, unlockedCount]);

  useEffect(() => {
    const revealFromUrlOrSession = (behavior: ScrollBehavior = "smooth") => {
      const sessionTarget = sessionStorage.getItem(TARGET_SECTION_KEY);
      const hashTarget = window.location.hash.replace("#", "");
      const targetSection = sessionTarget || hashTarget;

      if (!targetSection) {
        return;
      }

      sessionStorage.removeItem(TARGET_SECTION_KEY);
      revealSection(targetSection, behavior);
    };

    const handleRevealEvent = (event: Event) => {
      const customEvent = event as CustomEvent<RevealSectionDetail>;

      if (!customEvent.detail?.sectionId) {
        return;
      }

      revealSection(customEvent.detail.sectionId, customEvent.detail.behavior ?? "smooth");
    };

    const handleHashChange = () => {
      revealFromUrlOrSession("smooth");
    };

    revealFromUrlOrSession("auto");
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("portfolio:reveal-section", handleRevealEvent as EventListener);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(
        "portfolio:reveal-section",
        handleRevealEvent as EventListener
      );
    };
  }, [revealSection]);

  return (
    <>
      <AnimatePresence initial={false}>
        {items.slice(0, unlockedCount).map((item, index) => (
          <motion.div
            key={sectionIds[index]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>

      {unlockedCount < items.length && (
        <div aria-hidden="true" className="relative min-h-[340px] h-[56vh]">
          <div ref={sentinelRef} className="absolute bottom-0 left-0 h-14 w-full" />
        </div>
      )}
    </>
  );
}

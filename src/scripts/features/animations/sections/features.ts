import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";

export function initFeatures() {
  // Section
  const section = document.querySelector<HTMLElement>("#features-section");
  if (!section) return;

  let hasAnimated = false;

  // Match media
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobileP: `(max-width: ${customProp("--bp-small")})`,
      isMobileL: `(min-width: ${customProp("--bp-small")})`,
      isTablet: `(min-width: ${customProp("--bp-medium")})`,
      isDesktop: `(min-width: ${customProp("--bp-large")})`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
        context.conditions ?? {};
      const defaults = {
        duration: cssTime("--motion-slow"),
        ease: "back",
      };

      // Context
      return gsap.context(() => {
        if (hasAnimated) return;

        const tl = gsap
          .timeline({
            // Defaults
            defaults,
            // Scrolltrigger
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          })
          .from("#features-title", {
            y: reduceMotion ? 0 : isTablet ? 20 : 0,
            scale: reduceMotion ? 1 : 0.95,
            opacity: 0,
          })
          .from(
            "#features-list > li",
            {
              scale: reduceMotion ? 1 : 0.9,
              opacity: 0,
            },
            "<40%",
          );

        hasAnimated = true;
      }, section);
    },
  );
}

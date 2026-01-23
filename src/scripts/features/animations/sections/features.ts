import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";

export function initFeatures() {
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
      const { isReverted } = context;
      const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
        context.conditions ?? {};

      const duration = isReverted ? 0 : cssTime("--motion-slow");

      const tl = gsap.timeline({
        // Defaults
        defaults: { duration: duration, ease: "back" },
        // Scrolltrigger
        scrollTrigger: {
          trigger: "#features-section",
          start: "top 70%",
        },
      });

      tl.from("#features-title", {
        y: reduceMotion ? 0 : isTablet ? 20 : 0,
        scale: reduceMotion ? 1 : 0.95,
        opacity: 0,
      }).from(
        "#features-list > li",
        {
          scale: reduceMotion ? 1 : 0.9,
          opacity: 0,
        },
        "<40%",
      );
    },
  );
}

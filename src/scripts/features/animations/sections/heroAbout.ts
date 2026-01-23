import { customProp, cssTime } from "@/lib/helper";
import { gsap } from "../gsap";

export function initHeroAbout() {
  // Section
  const section = document.querySelector<HTMLElement>("#hero-about-section");
  if (!section) return;

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
      const { isReverted } = context;
      const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
        context.conditions ?? {};
      const duration = isReverted ? 0 : cssTime("--motion-slow");

      // Context
      return gsap.context(() => {
        const tl = gsap
          .timeline({
            // Defaults
            defaults: { duration: duration, ease: "back" },
          })
          .set(".layout", { perspective: 900 })
          .set(".visual", {
            transformOrigin: "50% 50% -250px",
          })
          .to("#hero-about-section", { autoAlpha: 1, duration: 0.1 })
          .from(".content > *", {
            y: reduceMotion ? 0 : isTablet ? 20 : 0,
            scale: reduceMotion ? 1 : 0.9,
            opacity: 0,
            stagger: 0.2,
          })
          .from(
            ".visual",
            {
              x: reduceMotion ? 0 : isTablet ? 50 : 0,
              rotateY: reduceMotion ? 0 : isTablet ? -10 : 0,
              rotateX: reduceMotion ? 0 : isTablet ? 5 : 0,
              rotateZ: reduceMotion ? 0 : isTablet ? 5 : 0,
              opacity: 0,
              filter: reduceMotion ? "none" : "blur(16px)",
              duration: 0.8,
              // repeat: -1,
              // yoyo: true,
            },
            "<40%",
          );
      }, section);
    },
  );
}

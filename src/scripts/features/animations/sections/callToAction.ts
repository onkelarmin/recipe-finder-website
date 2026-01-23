import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";

export function initCallToAction() {
  // Section
  const section = document.querySelector<HTMLElement>(
    "#call-to-action-section",
  );
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

        const forkTl = gsap
          .timeline({ defaults })
          .set(".fork-svg .fork", {
            stroke: reduceMotion ? "#D0DCD9" : "#FE9F6B",
          })
          .from(".fork-svg .squiggle", {
            opacity: 0,
            ease: "none",
          })
          .fromTo(
            ".fork-svg .fork",
            { drawSVG: "80% 80%" },
            {
              drawSVG: "80% 180%",
              duration: reduceMotion ? 0 : 1,
              ease: "power2.out",
            },
            "<",
          )
          .fromTo(
            ".fork-svg .fork",
            {
              fill: "transparent",
            },
            {
              fill: "#D0DCD9",
              stroke: "#D0DCD9",
              duration: reduceMotion ? 0 : 0.6,
              ease: "power2.inOut",
            },
          );

        const knifeTl = gsap
          .timeline({ defaults })
          .set(".knife-svg .knife", {
            stroke: reduceMotion ? "#D0DCD9" : "#49AC9B",
          })
          .from(".knife-svg .squiggle", {
            opacity: 0,
            ease: "none",
          })
          .fromTo(
            ".knife-svg .knife",
            { drawSVG: "90% 90%" },
            {
              drawSVG: "90% 190%",
              duration: reduceMotion ? 0 : 1,
              ease: "power2.out",
            },
            "<",
          )
          .fromTo(
            ".knife-svg .knife",
            {
              fill: "transparent",
            },
            {
              fill: "#D0DCD9",
              stroke: "#D0DCD9",
              duration: reduceMotion ? 0 : 0.6,
              ease: "power2.inOut",
            },
          );

        const tl = gsap
          .timeline({
            // Defaults
            defaults,
            // ScrollTrigger
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
            },
          })
          .from(".layout", { opacity: 0 })
          .from(
            ".content > *",
            {
              y: reduceMotion ? 0 : isTablet ? 20 : 0,
              scale: reduceMotion ? 1 : 0.9,
              opacity: 0,
              stagger: 0.2,
            },
            "<40%",
          )
          .add(forkTl, "<")
          .add(knifeTl, "<");

        hasAnimated = true;
      }, section);
    },
  );
}

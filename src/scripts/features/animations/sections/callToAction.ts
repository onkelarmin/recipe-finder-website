import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";
import { GSDevTools } from "../gsap";

export function initCallToAction() {
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

      const forkTl = gsap
        .timeline()
        .set("#call-to-action-section .fork-svg .fork", {
          stroke: "#FE9F6B",
        })
        .from("#call-to-action-section .fork-svg .squiggle", {
          opacity: 0,
          ease: "none",
        })
        .fromTo(
          "#call-to-action-section .fork-svg .fork",
          { drawSVG: "80% 80%" },
          {
            drawSVG: reduceMotion ? "80% 80%" : "80% 180%",
            duration: 1,
            ease: "power2.out",
          },
          "<",
        )
        .fromTo(
          "#call-to-action-section .fork-svg .fork",
          {
            fill: "transparent",
            stroke: "#FE9F6B",
          },
          {
            fill: "#D0DCD9",
            stroke: "#D0DCD9",
            ease: "power2.inOut",
          },
        );

      const knifeTl = gsap
        .timeline()
        .set("#call-to-action-section .knife-svg .knife", {
          stroke: "#49AC9B",
        })
        .from("#call-to-action-section .knife-svg .squiggle", {
          opacity: 0,
          ease: "none",
        })
        .fromTo(
          "#call-to-action-section .knife-svg .knife",
          { drawSVG: "90% 90%" },
          {
            drawSVG: reduceMotion ? "90% 90%" : "90% 190%",
            duration: 1,
            ease: "power2.out",
          },
          "<",
        )
        .fromTo(
          "#call-to-action-section .knife-svg .knife",
          {
            fill: "transparent",
            stroke: "#49AC9B",
          },
          {
            fill: "#D0DCD9",
            stroke: "#D0DCD9",
            ease: "power2.inOut",
          },
        );

      const tl = gsap
        .timeline({
          // Defaults
          defaults: { duration: duration, ease: "back" },
          // ScrollTrigger
          scrollTrigger: {
            trigger: "#call-to-action-section",
            start: "top 60%",
          },
        })
        .from("#call-to-action-section .layout", { opacity: 0 })
        .from(
          "#call-to-action-section .content > *",
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
    },
  );
}

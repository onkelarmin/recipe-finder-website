import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";
import { GSDevTools } from "../gsap";

export function initHeroHome() {
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

      const squiggleTL = gsap
        .timeline()
        .fromTo(
          "#hero-home-section .visual svg path",
          {
            drawSVG: "25% 25%",
          },
          {
            drawSVG: reduceMotion ? "25% 25%" : "25% 125%",
            duration: isDesktop ? 1.5 : 0.5,
            ease: "power2.inOut",
          },
        )
        .to("#hero-home-section .visual svg path", { fill: "#697DDB" });

      const tl = gsap
        .timeline({
          defaults: { duration: duration, ease: "back" },
        })
        .set("#hero-home-section .visual svg path", { fill: "transparent" })
        .to("#hero-home-section", { autoAlpha: 1, duration: 0.1 })
        .from("#hero-home-section .content > *", {
          y: reduceMotion ? 0 : isTablet ? 20 : 0,
          scale: reduceMotion ? 1 : 0.9,
          opacity: 0,
          stagger: 0.2,
        })
        .from(
          "#hero-home-section .content .highlighted",
          {
            "--scaleX-value": reduceMotion ? 1 : 0,
            duration: 0.25,
            ease: "power1.out",
          },
          "<40%",
        )
        .from(
          "#hero-home-section .visual img",
          {
            scale: reduceMotion ? 1 : 0.95,
            opacity: 0,
            duration: isReverted ? 0 : 0.8,
          },
          "<40%",
        )
        .add(squiggleTL, "<");
    },
  );
}

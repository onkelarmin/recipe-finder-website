import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";

export function initHeroHome() {
  // Section
  const section = document.querySelector<HTMLElement>("#hero-home-section");
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

        const squiggleTl = gsap
          .timeline({ defaults })
          .fromTo(
            ".visual svg path",
            {
              drawSVG: "25% 25%",
            },
            {
              drawSVG: reduceMotion ? "25% 25%" : "25% 125%",
              duration: reduceMotion ? 0 : isDesktop ? 1.5 : 0.5,
              ease: "power2.inOut",
            },
          )
          .to(".visual svg path", { fill: "#697DDB" });

        const tl = gsap
          .timeline({
            defaults,
            onComplete: () => section.classList.remove("gsap-auto-alpha"),
          })
          .set(".visual", { perspective: isTablet ? 900 : 300 })
          .set(".visual img", { transformOrigin: "50% 50% -250px" })
          .set(".visual svg path", { fill: "transparent" })
          .to(section, { autoAlpha: 1, duration: 0.1 })
          .from(".content > *", {
            y: reduceMotion ? 0 : isTablet ? 20 : 0,
            scale: reduceMotion ? 1 : 0.9,
            opacity: 0,
            stagger: 0.2,
          })
          .from(
            ".content .highlighted",
            {
              "--scaleX-value": reduceMotion ? 1 : 0,
              duration: 0.25,
              ease: "power1.out",
            },
            "<40%",
          )
          .from(
            ".visual img",
            {
              rotateX: reduceMotion ? 0 : 10,
              scale: reduceMotion ? 1 : 0.9,
              filter: reduceMotion ? "none" : "blur(16px)",
              opacity: 0,
              duration: 0.8,
            },
            "<40%",
          )
          .add(squiggleTl, "<20%");

        hasAnimated = true;
      }, section);
    },
  );
}

import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initHeroHome() {
  // Section
  const section = document.querySelector<HTMLElement>("#hero-home-section");
  if (!section) return;

  // Match media
  const mm = gsap.matchMedia();
  mm.add(MEDIA, (context) => {
    const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
      context.conditions ?? {};
    const { isReverted } = context;

    if (isReverted) return;

    // Context
    return gsap.context(() => {
      // Squiggle
      const squiggleTl = gsap
        .timeline()
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

      // Master
      const masterTl = gsap
        .timeline({
          onComplete: () => {
            section.classList.remove("gsap-auto-alpha");
            masterTl.invalidate();
          },
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
    }, section);
  });
}

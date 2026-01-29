import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initHeroAbout() {
  // Section
  const section = document.querySelector<HTMLElement>("#hero-about-section");
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
      const tl = gsap
        .timeline({
          // Callback
          onComplete: () => {
            section.classList.remove("gsap-auto-alpha");
            tl.invalidate();
          },
        })
        .set(".layout", { perspective: 900 })
        .set(".visual", {
          transformOrigin: "50% 50% -250px",
        })
        .to(section, { autoAlpha: 1, duration: 0.1 })
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
          },
          "<40%",
        );
    }, section);
  });
}

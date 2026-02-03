import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initRecipe() {
  // Section
  const section = document.querySelector<HTMLElement>("#recipe-section");
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
      const masterTl = gsap
        .timeline({
          onComplete: () => {
            section.classList.remove("gsap-auto-alpha");
            masterTl.invalidate();
          },
        })
        .to(section, { autoAlpha: 1, duration: 0.1 })
        .from(".breadcrumb", { opacity: 0 }, "<40%")
        .from(
          ".visual",
          {
            scale: reduceMotion ? 1 : 0.9,
            filter: reduceMotion ? "none" : "blur(16px)",
            opacity: 0,
          },
          "<40%",
        )
        .from(".content > *", {
          y: reduceMotion ? 0 : isTablet ? 20 : 0,
          scale: reduceMotion ? 1 : 0.9,
          opacity: 0,
          stagger: 0.2,
        });
    }, section);
  });
}

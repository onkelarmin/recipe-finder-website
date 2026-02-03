import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initHeroRecipes() {
  // Section
  const section = document.querySelector<HTMLElement>("#hero-recipes-section");
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
        .to(section, { autoAlpha: 1, duration: 0.1 })
        .from(".heading, p", {
          y: reduceMotion ? 0 : isTablet ? 20 : 0,
          scale: reduceMotion ? 1 : 0.95,
          opacity: 0,
          stagger: 0.2,
        });
    }, section);
  });
}

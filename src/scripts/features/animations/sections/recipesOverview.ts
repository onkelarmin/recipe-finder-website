import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initRecipesOverview() {
  // Section
  const section = document.querySelector<HTMLElement>(
    "#recipes-overview-section",
  );
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
      // Controls
      const controlsTl = gsap
        .timeline({
          onComplete: () => {
            section.classList.remove("gsap-auto-alpha");
            controlsTl.invalidate();
          },
        })
        .to(section, { autoAlpha: 1, duration: 0.1 })
        .from(".controls button, .controls label", {
          y: reduceMotion ? 0 : isTablet ? -50 : 0,
          scale: reduceMotion ? 1 : 0.95,
          opacity: 0,
        });

      // Recipe list
      gsap.utils
        .toArray<HTMLUListElement>(".recipe-list > li")
        .forEach((el) => {
          gsap.from(el, {
            scale: reduceMotion ? 1 : 0.9,
            filter: reduceMotion ? "none" : "blur(16px)",
            opacity: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          });
        });
    }, section);
  });
}

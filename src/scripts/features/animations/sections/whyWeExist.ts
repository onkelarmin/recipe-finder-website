import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initWhyWeExist() {
  // Section
  const section = document.querySelector<HTMLElement>("#why-we-exist-section");
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
      gsap.from(".heading", {
        y: reduceMotion ? 0 : isTablet ? 20 : 0,
        scale: reduceMotion ? 1 : 0.95,
        opacity: 0,
        scrollTrigger: {
          trigger: ".heading",
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLUListElement>("ul > li").forEach((el) => {
        gsap.from(el, {
          y: reduceMotion ? 0 : isTablet ? 20 : 0,
          scale: reduceMotion ? 1 : 0.95,
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

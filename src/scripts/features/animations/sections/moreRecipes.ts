import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initMoreRecipes() {
  // Section
  const section = document.querySelector<HTMLElement>("#more-recipes-section");
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
      // Heading
      gsap.from(".heading", {
        y: reduceMotion ? 0 : isTablet ? 20 : 0,
        scale: reduceMotion ? 1 : 0.9,
        opacity: 0,
        scrollTrigger: {
          trigger: ".heading",
          start: "top 80%",
        },
      });

      //   More recipes list
      gsap.utils
        .toArray<HTMLUListElement>(".more-recipes-list > li")
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

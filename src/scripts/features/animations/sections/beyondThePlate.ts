import { gsap } from "../gsap";
import { MEDIA } from "../media";

export function initBeyondThePlate() {
  // Section
  const section = document.querySelector<HTMLElement>(
    "#beyond-the-plate-section",
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
      // Content
      gsap.utils
        .toArray<HTMLElement>(".heading, .content p, .content ul")
        .forEach((el) => {
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

      // Visual
      gsap.set(".layout", {
        perspective: 900,
      });
      gsap.set(".visual", {
        transformOrigin: "50% 50% -250px",
      });

      gsap.from(".visual", {
        x: reduceMotion ? 0 : isTablet ? 50 : 0,
        rotateY: reduceMotion ? 0 : isTablet ? -10 : 0,
        rotateX: reduceMotion ? 0 : isTablet ? 5 : 0,
        rotateZ: reduceMotion ? 0 : isTablet ? 5 : 0,
        opacity: 0,
        filter: reduceMotion ? "none" : "blur(16px)",
        duration: 0.8,
        scrollTrigger: {
          trigger: ".visual",
          start: "center 80%",
        },
      });
    }, section);
  });
}

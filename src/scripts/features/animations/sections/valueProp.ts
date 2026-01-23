import { gsap } from "../gsap";
import { cssTime, customProp } from "@/lib/helper";

export function initValueProp() {
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

      const tl = gsap.timeline({
        // Defaults
        defaults: { duration: duration, ease: "back" },
        // ScrollTrigger
        scrollTrigger: {
          trigger: "#value-prop-section",
          start: "top 60%",
        },
      });

      tl.set("#value-prop-section .layout", {
        perspective: 900,
      })
        .set("#value-prop-section .visual", {
          transformOrigin: "50% 50% -250px",
        })
        .from(
          "#value-prop-section .content .heading, #value-prop-section .content p",
          {
            y: reduceMotion ? 0 : isTablet ? 20 : 0,
            scale: reduceMotion ? 1 : 0.95,
            opacity: 0,
            stagger: 0.2,
          },
        )
        .from(
          "#value-prop-section .text-heighlight-half",
          {
            "--scaleX-value": reduceMotion ? 1 : 0,
            duration: 0.25,
            ease: "power1.out",
          },
          "<40%",
        )
        .from(
          "#value-prop-section .visual",
          {
            rotateY: reduceMotion ? 0 : isTablet ? -10 : 0,
            rotateX: reduceMotion ? 0 : isTablet ? 5 : 0,
            rotateZ: reduceMotion ? 0 : isTablet ? 5 : 0,
            opacity: 0,
            filter: reduceMotion ? "none" : "blur(16px)",
            duration: 0.8,
          },
          "<40%",
        );
    },
  );
}

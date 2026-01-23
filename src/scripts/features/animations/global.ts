import { gsap } from "./gsap";
import { ScrollTrigger } from "./gsap";

// Refresh ScrollTrigger on resize
let resizeTimeout: number;

export function initScrollTriggerRefresh() {
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });
}

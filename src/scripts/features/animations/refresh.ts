import { ScrollTrigger } from "./gsap";

let resizeTimeout: number;

export function initScrollTriggerRefresh() {
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });
}

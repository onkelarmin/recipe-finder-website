import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let resizeTimeout: number;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

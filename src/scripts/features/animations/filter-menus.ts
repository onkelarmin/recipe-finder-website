import { ScrollTrigger } from "./gsap";

export function initFilterMenus() {
  // Elements
  const header = document.querySelector<HTMLElement>(".site-header");
  const filterMenus = document.querySelectorAll<HTMLDivElement>(".filter-menu");

  // GSAP ("sticky" behaviour of Filter menus)
  filterMenus.forEach((menu) => {
    ScrollTrigger.create({
      trigger: menu,
      start: () => `top ${header?.offsetHeight}`,
      end: "max",
      onEnter: () => menu.classList.add("sticky"),
      onLeaveBack: () => menu.classList.remove("sticky"),
    });
  });
}

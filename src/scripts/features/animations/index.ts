import { initFilterMenus } from "./filter-menus";
import "./gsap";
import { initScrollTriggerRefresh } from "./refresh";

export function initAnimations() {
  initScrollTriggerRefresh();
  initFilterMenus();
}

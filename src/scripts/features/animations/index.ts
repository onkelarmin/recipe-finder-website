import { initFilterMenus } from "./filter-menus";
import "./gsap";
import { initScrollTriggerRefresh } from "./global";

export function initAnimations() {
  initScrollTriggerRefresh();
  initFilterMenus();
}

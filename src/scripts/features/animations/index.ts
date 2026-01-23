import "./gsap";
import { initFilterMenus } from "./filter-menus";
import { initScrollTriggerRefresh } from "./global";
import { initHeroHome } from "./sections/heroHome";
import { initFeatures } from "./sections/features";
import { initValueProp } from "./sections/valueProp";
import { initCallToAction } from "./sections/callToAction";

export function initAnimations() {
  initScrollTriggerRefresh();
  initFilterMenus();
  initHeroHome();
  initFeatures();
  initValueProp();
  initCallToAction();
}

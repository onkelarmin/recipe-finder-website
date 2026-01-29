import "./gsap";
import { initFilterMenus } from "./filter-menus";
import { initGsapDefaults, initScrollTriggerRefresh } from "./global";
import { initHeroHome } from "./sections/heroHome";
import { initFeatures } from "./sections/features";
import { initValueProp } from "./sections/valueProp";
import { initCallToAction } from "./sections/callToAction";
import { initHeroAbout } from "./sections/heroAbout";
import { initWhyWeExist } from "./sections/whyWeExist";
import { initPhilosophy } from "./sections/philosophy";
import { initBeyondThePlate } from "./sections/beyondThePlate";

export function initAnimations() {
  initScrollTriggerRefresh();
  initGsapDefaults();
  initFilterMenus();
  initHeroHome();
  initFeatures();
  initValueProp();
  initCallToAction();
  initHeroAbout();
  initWhyWeExist();
  initPhilosophy();
  initBeyondThePlate();
}

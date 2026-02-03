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
import { initHeroRecipes } from "./sections/heroRecipes";
import { initRecipesOverview } from "./sections/recipesOverview";
import { initRecipe } from "./sections/recipe";
import { initMoreRecipes } from "./sections/moreRecipes";

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
  initHeroRecipes();
  initRecipesOverview();
  initRecipe();
  initMoreRecipes();
}

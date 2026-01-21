import { initAnimations } from "./features/animations";
import { initMobileNav } from "./features/nav";
import { initRecipesFeature } from "./features/recipes";

document.addEventListener("DOMContentLoaded", () => {
  initRecipesFeature();
  initAnimations();
  initMobileNav();
});

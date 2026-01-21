import { initAnimations } from "@scripts/features/animations";
import { initMobileNav } from "@scripts/features/nav";
import { initRecipesFeature } from "@scripts/features/recipes";
import { initLenis } from "@scripts/features/scroll";

document.addEventListener("DOMContentLoaded", () => {
  initRecipesFeature();
  initAnimations();
  initMobileNav();
  initLenis();
});

import { initAnimations } from "./features/animations";
import { initRecipesFeature } from "./features/recipes";

document.addEventListener("DOMContentLoaded", () => {
  initRecipesFeature();
  initAnimations();
});

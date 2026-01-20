import type { RecipeIndexItem } from "./indexer";
import { shouldShowRecipe } from "./visibility";
import { updateNoResults } from "@/scripts/ui/no-results";

export function renderRecipes(index: RecipeIndexItem[]) {
  let visibleCount = 0;

  index.forEach((recipe) => {
    const shouldShow = shouldShowRecipe(recipe);

    recipe.li?.toggleAttribute("hidden", !shouldShow);

    if (shouldShow) visibleCount++;
  });

  updateNoResults(visibleCount);
}

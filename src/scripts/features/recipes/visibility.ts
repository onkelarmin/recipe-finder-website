import type { RecipeIndexItem } from "./indexer";
import { filters, search } from "./state";

export function shouldShowRecipe(recipe: RecipeIndexItem) {
  // Filter logic
  if (filters.prep !== null && recipe.prep > filters.prep) return false;
  if (filters.cook !== null && recipe.cook > filters.cook) return false;

  // Search logic
  if (search.query && !recipe.searchText.includes(search.query)) return false;
  return true;
}

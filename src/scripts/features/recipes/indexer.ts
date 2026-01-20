export type RecipeIndexItem = {
  element: HTMLElement;
  li: HTMLLIElement | null;
  prep: number;
  cook: number;
  searchText: string;
};

export function buildRecipeIndex(): RecipeIndexItem[] {
  const recipes = [...document.querySelectorAll<HTMLElement>(".recipe-card")];

  return recipes.map((recipe) => {
    const title =
      recipe
        .querySelector<HTMLHeadingElement>(".heading")
        ?.textContent?.toLowerCase() ?? "";
    const ingredients = recipe.dataset.ingredients
      ? JSON.parse(recipe.dataset.ingredients).join(" ").toLowerCase()
      : "";

    return {
      element: recipe,
      li: recipe.closest("li"),
      prep: Number(recipe.dataset.prep),
      cook: Number(recipe.dataset.cook),
      searchText: `${title} ${ingredients}`,
    };
  });
}

import { isVariant } from "@/domain/filters";
import { buildRecipeIndex } from "./indexer";
import { filters, search } from "./state";
import { renderRecipes } from "./render";

export function initRecipesFeature() {
  const recipeIndex = buildRecipeIndex();

  // Filters
  const filterGroups = document.querySelectorAll<HTMLFieldSetElement>(
    ".filter-menu > fieldset",
  );

  filterGroups.forEach((group) => {
    group.addEventListener("change", (e) => {
      // Guard clauses
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== "radio") return;
      if (!isVariant(target.name)) return;

      const variant = target.name;
      const value = target.value;

      filters[variant] = value !== null ? Number(value) : null;

      renderRecipes(recipeIndex);
    });
  });

  //   Clear buttons
  const clearButtons =
    document.querySelectorAll<HTMLButtonElement>(".clear-button");

  clearButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // update UI
      const variant = btn.dataset.variant;
      if (!variant || !isVariant(variant)) return;

      filters[variant] = null;

      renderRecipes(recipeIndex);

      // Uncheck radio buttons
      btn
        .closest(".filter-menu")
        ?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
        .forEach((i) => {
          i.checked = false;
        });
    });
  });

  //   Search
  const searchBar = document.querySelector<HTMLInputElement>("#search-bar");

  searchBar?.addEventListener("input", (e) => {
    // Guard clauses
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    search.query = e.currentTarget.value.trim().toLowerCase();

    renderRecipes(recipeIndex);
  });
}

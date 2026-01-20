// Type imports
import { isVariant, type Variant } from "@/domain/filters";

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Type declarations
type Filters = {
  [K in Variant]: number | null;
};

// ScrollTrigger refresh when resizing
let resizeTimeout: number;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

// Elements
const filterGroups = document.querySelectorAll<HTMLFieldSetElement>(
  ".filter-menu > fieldset",
);
const allRecipes = [...document.querySelectorAll<HTMLElement>(".recipe-card")];
const clearButtons =
  document.querySelectorAll<HTMLButtonElement>(".clear-button");
const searchBar = document.querySelector<HTMLInputElement>("#search-bar");
const noResults = document.querySelector<HTMLParagraphElement>("#no-results");

// Variables
const filters: Filters = {
  prep: null,
  cook: null,
};

const search = {
  query: "",
};

// Recipe-index
const recipeIndex = allRecipes.map((recipe) => {
  const title = recipe;
  document
    .querySelector<HTMLHeadingElement>(".heading")
    ?.textContent?.toLowerCase() ?? "";
  const ingredients = recipe.dataset.ingredients
    ? JSON.parse(recipe.dataset.ingredients).join(" ").toLowerCase()
    : "";

  return {
    element: recipe,
    li: recipe.closest("li"),
    searchText: `${title} ${ingredients}`,
    prep: Number(recipe.dataset.prep),
    cook: Number(recipe.dataset.cook),
  };
});

// Determine whether recipe should be shown
function shouldShowRecipe(recipe: (typeof recipeIndex)[number]) {
  // Filter logic
  if (filters.prep !== null && recipe.prep > filters.prep) return false;
  if (filters.cook !== null && recipe.cook > filters.cook) return false;

  // Search logic
  if (search.query && !recipe.searchText.includes(search.query)) return false;
  return true;
}

// Render
function renderRecipes() {
  let visibleCount = 0;

  recipeIndex.forEach((recipe) => {
    const shouldShow = shouldShowRecipe(recipe);

    recipe.li?.toggleAttribute("hidden", !shouldShow);

    if (shouldShow) visibleCount++;
  });

  noResults?.toggleAttribute("hidden", visibleCount > 0);
}

// Filter-groups
filterGroups.forEach((el) => {
  el.addEventListener("change", (e) => {
    // Guard clauses
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== "radio") return;
    if (!isVariant(target.name)) return;

    const variant = target.name;
    const value = target.value;

    filters[variant] = value !== null ? Number(value) : null;

    renderRecipes();
  });
});

// Searchbar
searchBar?.addEventListener("input", (e) => {
  // Guard clauses
  if (!(e.currentTarget instanceof HTMLInputElement)) return;

  search.query = e.currentTarget.value.trim().toLowerCase();

  renderRecipes();
});

// Clear buttons
clearButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // update UI
    const variant = btn.dataset.variant;
    if (!variant || !isVariant(variant)) return;

    filters[variant] = null;

    renderRecipes();

    // Uncheck radio buttons
    btn
      .closest(".filter-menu")
      ?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
      .forEach((i) => {
        i.checked = false;
      });
  });
});

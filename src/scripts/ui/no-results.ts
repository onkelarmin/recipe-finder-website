const noResults = document.querySelector<HTMLParagraphElement>("#no-results");

export function updateNoResults(visibleCount: number) {
  if (!noResults) return;

  noResults.toggleAttribute("hidden", visibleCount > 0);
}

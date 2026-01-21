// Imports
import { customProp } from "@/lib/helper";

export function initMobileNav() {
  // Variables
  const btnToggle = document.querySelector<HTMLButtonElement>(
    "#primary-nav-toggle",
  );
  const primaryNav = document.querySelector<HTMLElement>(".primary-nav");
  const primaryNavMenu =
    primaryNav?.querySelector<HTMLElement>("#primary-nav-menu");
  const mobileNavOverlay = document.querySelector<HTMLDivElement>(
    "#mobile-nav-overlay",
  );
  const main = document.querySelector<HTMLElement>("main");

  if (!btnToggle || !primaryNav || !primaryNavMenu || !main) return;

  const primaryNavLinks = Array.from(
    primaryNavMenu.querySelectorAll<HTMLAnchorElement>("li > a"),
  );

  const media = window.matchMedia(`(width < ${customProp("--bp-large")})`);

  function isOpen() {
    return btnToggle?.getAttribute("aria-expanded") === "true";
  }

  function setupPrimaryNav(isMobile: boolean) {
    if (isMobile) {
      // is mobile
      primaryNavMenu?.setAttribute("inert", "");
      primaryNavLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
      });
    } else {
      // is tablet/desktop
      primaryNavMenu?.removeAttribute("inert");
    }
  }

  function openMobileMenu() {
    btnToggle?.setAttribute("aria-expanded", "true");
    primaryNavMenu?.setAttribute("data-open", "true");
    primaryNavMenu?.removeAttribute("inert");
    main?.setAttribute("inert", "");
    document.addEventListener("keydown", onEscape);
  }

  function closeMobileMenu() {
    btnToggle?.setAttribute("aria-expanded", "false");
    primaryNavMenu?.setAttribute("data-open", "false");
    primaryNavMenu?.setAttribute("inert", "");
    main?.removeAttribute("inert");
    document.removeEventListener("keydown", onEscape);
  }

  function onEscape(e: KeyboardEvent) {
    if (e.key === "Escape") closeMobileMenu();
  }

  // EventListeners
  btnToggle.addEventListener("click", () => {
    isOpen() ? closeMobileMenu() : openMobileMenu();
  });

  mobileNavOverlay?.addEventListener("click", closeMobileMenu);

  media.addEventListener("change", (e) => {
    setupPrimaryNav(e.matches);
  });

  setupPrimaryNav(media.matches);
}

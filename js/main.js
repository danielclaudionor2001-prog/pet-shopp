const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!mainNav || !menuToggle || !mainNav.classList.contains("is-open")) return;
  if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;

  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

const catalogTabs = document.querySelectorAll(".catalog-tab");
const catalogPanels = document.querySelectorAll(".catalog-panel");
const catalogLinks = document.querySelectorAll("[data-catalog]");
const catalogSection = document.getElementById("catalogo");

function openCatalog(category, shouldScroll = false) {
  catalogTabs.forEach((tab) => {
    const isActive = tab.dataset.category === category;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  catalogPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === category;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  if (shouldScroll) {
    catalogSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

catalogTabs.forEach((tab) => {
  tab.addEventListener("click", () => openCatalog(tab.dataset.category));
});

catalogLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openCatalog(link.dataset.catalog, true);
  });
});

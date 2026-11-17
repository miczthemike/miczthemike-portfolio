document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("is-open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelector("[data-dismiss]")?.addEventListener("click", () => {
    document.querySelector("[data-demo-banner]")?.remove();
  });

  const menuFilterButtons = [...document.querySelectorAll("[data-menu-filter]")];
  const menuCategories = [...document.querySelectorAll("[data-menu-category]")];
  const menuSearch = document.querySelector("[data-menu-search]");
  const menuEmpty = document.querySelector("[data-menu-empty]");

  const updateMenu = () => {
    const activeFilter = menuFilterButtons.find((button) => button.getAttribute("aria-pressed") === "true")?.dataset.menuFilter ?? "all";
    const query = menuSearch?.value.trim().toLowerCase() ?? "";
    let visibleItems = 0;

    menuCategories.forEach((category) => {
      let matchingItems = 0;
      category.querySelectorAll("[data-menu-item]").forEach((item) => {
        const matchesSearch = item.textContent.toLowerCase().includes(query);
        item.hidden = !matchesSearch;
        if (matchesSearch) matchingItems += 1;
      });

      const matchesCategory = activeFilter === "all" || category.dataset.menuCategory === activeFilter;
      category.hidden = !matchesCategory || matchingItems === 0;
      if (!category.hidden) visibleItems += matchingItems;
    });

    if (menuEmpty) menuEmpty.hidden = visibleItems > 0;
  };

  menuFilterButtons.forEach((button) => button.addEventListener("click", () => {
    menuFilterButtons.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
    updateMenu();
  }));
  menuSearch?.addEventListener("input", updateMenu);
  updateMenu();

  // Floating Chat Widget Toggle
  const chatWidget = document.getElementById("floatingChatWidget");
  const chatTrigger = document.getElementById("chatTriggerBtn");
  const chatOptions = document.getElementById("chatOptions");

  const closeWidget = () => {
    if (!chatWidget) return;
    chatWidget.classList.remove("is-open");
    chatTrigger?.setAttribute("aria-expanded", "false");
    if (chatOptions) chatOptions.setAttribute("aria-hidden", "true");
  };

  chatTrigger?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!chatWidget) return;
    const isOpen = chatWidget.classList.toggle("is-open");
    chatTrigger.setAttribute("aria-expanded", String(isOpen));
    if (chatOptions) chatOptions.setAttribute("aria-hidden", String(!isOpen));
  });

  // Open external links (Messenger) via window.open so the page never navigates away
  chatWidget?.querySelectorAll("[data-external]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeWidget();
      window.open(link.href, "_blank", "noopener");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (event) => {
    if (chatWidget && chatWidget.classList.contains("is-open") && !chatWidget.contains(event.target)) {
      closeWidget();
    }
  });
});

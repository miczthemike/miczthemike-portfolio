document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  }));
  document.querySelector("[data-dismiss]")?.addEventListener("click", () => document.querySelector("[data-demo-banner]")?.remove());
  const filters = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-category]");
  filters.forEach((button) => button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.toggle("active", filter === button));
    items.forEach((item) => { item.hidden = button.dataset.filter !== "all" && item.dataset.category !== button.dataset.filter; });
  }));
  document.querySelector("[data-call]")?.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("section#contact, section#location")?.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelectorAll("[data-inquiry]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = `Diagnostic service inquiry for Cliniqua Alaminos\n${[...values.entries()].map(([key, value]) => `${key}: ${value}`).join("\n")}`;
    const result = form.querySelector("[data-result]");
    result.replaceChildren(document.createTextNode("Your inquiry is ready. This preview has no verified recipient connected. "));
    const link = document.createElement("a");
    link.href = `sms:?body=${encodeURIComponent(message)}`;
    link.textContent = "Open SMS draft";
    result.append(link);
  }));
});

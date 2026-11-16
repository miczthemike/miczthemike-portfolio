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
  document.querySelector("[data-call]")?.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    document.querySelector("[data-inquiry] input")?.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-inquiry]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const lines = [...values.entries()].map(([key, value]) => `${key}: ${value}`);
    const message = `Booking inquiry for Marie's Sleep House\n${lines.join("\n")}`;
    const result = form.querySelector("[data-result]");
    result.replaceChildren();
    result.append(document.createTextNode("Your message is ready. This preview has no verified recipient connected. "));
    const link = document.createElement("a");
    link.href = `sms:?body=${encodeURIComponent(message)}`;
    link.textContent = "Open SMS draft";
    result.append(link);
  }));
});

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
  const pax = document.querySelector("[data-pax]");
  const paxCount = document.querySelector("[data-pax-count]");
  const groupTotal = document.querySelector("[data-group-total]");
  const updateEstimate = () => {
    if (!pax || !paxCount || !groupTotal) return;
    paxCount.textContent = pax.value;
    groupTotal.firstChild.textContent = `₱${(Number(pax.value) * 800).toLocaleString("en-PH")} `;
  };
  pax?.addEventListener("input", updateEstimate);
  updateEstimate();
  document.querySelector("[data-call]")?.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    document.querySelector("[data-inquiry] input")?.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-inquiry]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = `Availability inquiry for Carribean Transient House\n${[...values.entries()].map(([key, value]) => `${key}: ${value}`).join("\n")}`;
    const result = form.querySelector("[data-result]");
    result.replaceChildren(document.createTextNode("Your message is ready. This preview has no verified recipient connected. "));
    const link = document.createElement("a");
    link.href = `sms:?body=${encodeURIComponent(message)}`;
    link.textContent = "Open SMS draft";
    result.append(link);
  }));
});

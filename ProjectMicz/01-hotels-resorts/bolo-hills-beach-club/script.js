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
  const guests = document.querySelector("[data-guests]");
  const guestCount = document.querySelector("[data-guest-count]");
  const total = document.querySelector("[data-total]");
  const updateEstimate = () => {
    if (!guests || !guestCount || !total) return;
    guestCount.textContent = guests.value;
    total.textContent = `₱${(Number(guests.value) * 350 + 3500).toLocaleString("en-PH")}`;
  };
  guests?.addEventListener("input", updateEstimate);
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
    const message = `Reservation inquiry for Bolo Hills Beach Club\n${[...values.entries()].map(([key, value]) => `${key}: ${value}`).join("\n")}`;
    const result = form.querySelector("[data-result]");
    result.replaceChildren(document.createTextNode("Your message is ready. This preview has no verified recipient connected. "));
    const link = document.createElement("a");
    link.href = `sms:?body=${encodeURIComponent(message)}`;
    link.textContent = "Open SMS draft";
    result.append(link);
  }));
});

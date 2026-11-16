document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("is-open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });

      document.querySelectorAll(".service-card[data-category]").forEach((card) => {
        card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      });
    });
  });

  const messengerToggle = document.querySelector("[data-messenger-toggle]");
  const messengerPanel = document.querySelector("#messenger-panel");
  const messengerClose = document.querySelector("[data-messenger-close]");

  function setMessengerOpen(open) {
    if (!messengerToggle || !messengerPanel) return;
    messengerToggle.setAttribute("aria-expanded", String(open));
    messengerPanel.hidden = !open;
    if (open) messengerClose?.focus();
    else messengerToggle.focus();
  }

  messengerToggle?.addEventListener("click", () => {
    setMessengerOpen(messengerToggle.getAttribute("aria-expanded") !== "true");
  });
  messengerClose?.addEventListener("click", () => setMessengerOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && messengerToggle?.getAttribute("aria-expanded") === "true") {
      setMessengerOpen(false);
    }
  });
});

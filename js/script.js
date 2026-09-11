document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const setVisible = (element) => {
    element.classList.add("is-visible");
  };

  const revealObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = Number(element.dataset.delay || 0);
        element.style.transitionDelay = `${delay}ms`;
        setVisible(element);
        observer.unobserve(element);
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(revealObserver, {
      threshold: 0.18,
      rootMargin: "0px 0px -60px 0px",
    });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => {
      const delay = Number(element.dataset.delay || 0);
      element.style.transitionDelay = `${delay}ms`;
      setVisible(element);
    });
  }

  const currentYear = document.getElementById("ano-atual");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

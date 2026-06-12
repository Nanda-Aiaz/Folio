const themeToggle = document.querySelector("#themeToggle");
const topBtn = document.querySelector("#topBtn");
const revealItems = document.querySelectorAll(".reveal");

// Dark Mode

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkModeOn = document.body.classList.contains("dark");
  themeToggle.textContent = darkModeOn ? "Light" : "Dark";

  localStorage.setItem(
    "theme",
    darkModeOn ? "dark" : "light"
  );
});

// Back To Top Button

window.addEventListener("scroll", () => {
  if (window.scrollY > 320) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Reveal Animation

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// Load Projects

fetch("projects.json")
  .then((response) => response.json())
  .then((projects) => {

    const container =
      document.getElementById("projects-container");

    if (!container) return;

    container.innerHTML = "";

    projects.forEach((project) => {

      const card = document.createElement("article");

      card.className = "card reveal visible";

      card.innerHTML = `
        <span class="card-tag">${project.language || "Project"}</span>

        <h3>${project.name}</h3>

        <p>${project.description || "No description available"}</p>

        <a
          class="project-link"
          href="${project.url}"
          target="_blank"
          rel="noopener"
        >
          View Repository →
        </a>
      `;

      container.appendChild(card);
    });

  })
  .catch((error) => {
    console.error("Error loading projects:", error);
  });
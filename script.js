const themeToggle = document.querySelector("#themeToggle");
const topBtn = document.querySelector("#topBtn");
const revealItems = document.querySelectorAll(".reveal");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkModeOn = document.body.classList.contains("dark");
  themeToggle.textContent = darkModeOn ? "Light" : "Dark";
  localStorage.setItem("theme", darkModeOn ? "dark" : "light");
});

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

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});
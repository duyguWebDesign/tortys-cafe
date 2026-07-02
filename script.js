// Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 700);
  }
});

// Navbar + Progress Bar
const navbar = document.querySelector(".navbar");
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (navbar) {
    navbar.classList.toggle("scrolled", scrollTop > 80);
  }
});

// Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Menu Tabs
const tabs = document.querySelectorAll(".tab");
const menuLists = document.querySelectorAll(".menu-list");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    menuLists.forEach((list) => {
      list.classList.remove("active");

      if (list.id === category) {
        list.classList.add("active");
      }
    });
  });
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <span>&times;</span>
  <img src="" alt="Galerie Bild">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector("span");

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightbox.classList.add("active");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// Hero Parallax
const heroBg = document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {
  if (heroBg) {
    heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.12}px)`;
  }
});

// Mouse Glow auf Highlight Cards
const highlightCards = document.querySelectorAll(".highlight-card");

highlightCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

// Escape schließt Lightbox
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }
});
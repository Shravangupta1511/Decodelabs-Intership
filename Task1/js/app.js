//  MOBILE MENU TOGGLE

const menuBtn = document.querySelector("#menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");

    const current = +counter.innerText;

    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);

      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCounter();
});

/* =========================
   CONTACT FORM VALIDATION
========================= */

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();

  const email = document.querySelector("#email").value.trim();

  const subject = document.querySelector("#subject").value.trim();

  const message = document.querySelector("#message").value.trim();

  if (name === "" || email === "" || subject === "" || message === "") {
    alert("Please fill all fields.");

    return;
  }

  alert("Message Sent Successfully!");

  form.reset();
});

/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("current");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("current");
    }
  });
});

/* =========================
   CLOSE MOBILE MENU
   AFTER CLICKING LINK
========================= */

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

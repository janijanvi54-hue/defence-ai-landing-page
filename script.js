
(function () {
  "use strict";

  /* ---------- 1. Sticky Header: add shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    function onScrollHeader() {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* ---------- 2. Mobile Menu Toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function toggleMenu(forceClose) {
    var isOpen = mobileMenu.classList.toggle("open", !forceClose || !mobileMenu.classList.contains("open"));
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      toggleMenu();
    });

    // Close menu when a mobile link is clicked
    var mobileLinks = mobileMenu.querySelectorAll(".mobile-link");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on resize back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 3. Active Nav Link on Scroll ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- 4. Contact Form Handling ---------- */
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      // Validate
      if (!name) {
        showStatus("Please enter your full name.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      if (!message) {
        showStatus("Please enter a message.", "error");
        return;
      }

      // Simulate successful submission (no backend here)
      // In production, replace with a fetch() POST to your endpoint.
      showStatus("Thank you, " + name + ". Your message has been received. We will be in touch shortly.", "success");
      form.reset();
    });

    function isValidEmail(value) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(value);
    }

    function showStatus(message, type) {
      statusEl.textContent = message;
      statusEl.className = "form-status " + type;
    }
  }

  /* ---------- 5. Footer Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

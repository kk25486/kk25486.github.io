(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Year ---------------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* Scroll reveal ------------------------------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach(function (el, index) {
      var group = el.closest(".activity-grid, .contact-grid, .timeline");
      if (group) {
        var siblings = Array.prototype.slice.call(group.querySelectorAll("[data-reveal]"));
        var position = siblings.indexOf(el);
        el.style.setProperty("--reveal-delay", position * 55 + "ms");
      } else if (index < 6) {
        el.style.setProperty("--reveal-delay", index * 60 + "ms");
      }
      observer.observe(el);
    });
  }

  /* Copy to clipboard --------------------------------------------------- */
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text);
      });
    }

    return legacyCopy(text);
  }

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();

    var copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(area);
    return copied ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      copyText(value).then(
        function () {
          showToast("已複製 " + value);
        },
        function () {
          showToast("複製失敗，請手動選取：" + value);
        }
      );
    });
  });

  /* Highlight the current section in the nav ---------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();

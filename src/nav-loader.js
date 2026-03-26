/**
 * nav-loader.js
 * 
 * Usage: add to every page —
 *   <div id="nav-root"></div>
 *   <script src="../src/nav-loader.js" data-page="flight_training" data-depth="1"></script>
 *
 * data-page  : matches [data-page] attributes in nav.html to set .active
 * data-depth : 0 = root (index), 1 = one folder deep (all sub-pages)
 */

(function () {
  const script   = document.currentScript;
  const activePage = script.getAttribute("data-page") || "";
  const depth    = parseInt(script.getAttribute("data-depth") || "0", 10);
  const srcBase  = script.src.replace(/nav-loader\.js$/, ""); // e.g. "../src/"
  const navUrl   = srcBase + "nav.html";

  fetch(navUrl)
    .then(r => {
      if (!r.ok) throw new Error("Could not load nav.html: " + r.status);
      return r.text();
    })
    .then(html => {
      // Insert HTML into placeholder
      const placeholder = document.getElementById("nav-root");
      if (!placeholder) {
        console.warn("[nav-loader] #nav-root element not found.");
        return;
      }
      placeholder.innerHTML = html;

      // ── 1. Fix hrefs based on depth ──────────────────────────────────────
      // nav.html uses data-root-href for root-relative paths.
      // For depth=0 (index), we use data-root-href as-is (./page/).
      // For depth=1 (sub-page), we prefix with ../  (../page/).
      // placeholder.querySelectorAll("[data-root-href]").forEach(el => {
      //   const rootHref = el.getAttribute("data-root-href");
      //   if (depth === 0) {
      //     el.setAttribute("href", rootHref);
      //   } else {
      //     // Strip leading "./" and go up one level
      //     const adjusted = "../" + rootHref.replace(/^\.\//, "");
      //     el.setAttribute("href", adjusted);
      //   }
      // });

      // ── 2. Mark active menu item ─────────────────────────────────────────
      if (activePage) {
        // Desktop: <li data-page="...">
        placeholder.querySelectorAll(`li[data-page="${activePage}"]`).forEach(li => {
          li.classList.add("active");
          const a = li.querySelector(":scope > a");
          if (a) a.classList.add("active");
        });

        // Mobile: <details data-page="...">
        placeholder.querySelectorAll(`details[data-page="${activePage}"]`).forEach(det => {
          det.open = true;
          const summary = det.querySelector("summary");
          if (summary) summary.classList.add("active");
        });
      }

      // ── 3. Hamburger toggle ───────────────────────────────────────────────
      const ham = document.getElementById("ham");
      const mob = document.getElementById("mobileMenu");
      if (ham && mob) {
        ham.addEventListener("click", () => {
          ham.classList.toggle("open");
          mob.classList.toggle("open");
        });
      }
    })
    .catch(err => {
      console.error("[nav-loader]", err);
    });
})();

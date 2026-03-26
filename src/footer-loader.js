/**
 * footer-loader.js
 *
 * Usage: add to every page —
 *   <div id="footer-root"></div>
 *   <script src="../src/footer-loader.js" data-depth="1"></script>
 *
 * data-depth : 0 = root (index), 1 = one folder deep (all sub-pages)
 */

(function () {
  const script  = document.currentScript;
  const depth   = parseInt(script.getAttribute("data-depth") || "0", 10);
  const srcBase = script.src.replace(/footer-loader\.js$/, "");
  const footerUrl = srcBase + "footer.html";

  fetch(footerUrl)
    .then(r => {
      if (!r.ok) throw new Error("Could not load footer.html: " + r.status);
      return r.text();
    })
    .then(html => {
      const placeholder = document.getElementById("footer-root");
      if (!placeholder) {
        console.warn("[footer-loader] #footer-root element not found.");
        return;
      }
      placeholder.innerHTML = html;

      // Fix hrefs based on depth (same logic as nav-loader)
      placeholder.querySelectorAll("[data-root-href]").forEach(el => {
        const rootHref = el.getAttribute("data-root-href");
        if (depth === 0) {
          el.setAttribute("href", rootHref);
        } else {
          const adjusted = "../" + rootHref.replace(/^\.\//, "");
          el.setAttribute("href", adjusted);
        }
      });
    })
    .catch(err => {
      console.error("[footer-loader]", err);
    });
})();

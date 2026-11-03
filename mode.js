(function () {
  var KEY = "tema", root = document.documentElement;
 
  // Terapkan pilihan tema yang tersimpan sedini mungkin
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}
 
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
 
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".Nav-Atas");
    var panel = document.querySelector(".nav-konten");
    var list = document.querySelector(".nav-link");
    if (!header || !panel || !list) return;
 
    // Tombol ganti tema (di samping kiri tombol menu)
    var themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "tema-btn";
 
    function updateTheme() {
      var dark = isDark();
      themeBtn.textContent = dark ? "\u2600\uFE0F" : "\uD83C\uDF19";
      themeBtn.setAttribute("aria-label", dark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
    }
 
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      updateTheme();
    });
    updateTheme();
 
    // Tombol menu garis tiga
    panel.id = panel.id || "menu-utama";
    var menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "menu-btn";
    menuBtn.setAttribute("aria-controls", panel.id);
 
    var svgA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="';
    var ICON_OPEN = svgA + 'M4 7h16M4 12h16M4 17h16"/></svg>';
    var ICON_CLOSE = svgA + 'M6 6l12 12M18 6L6 18"/></svg>';
 
    function setOpen(open) {
      header.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      menuBtn.innerHTML = open ? ICON_CLOSE : ICON_OPEN;
    }
 
    menuBtn.addEventListener("click", function () {
      setOpen(!header.classList.contains("menu-open"));
    });
    document.addEventListener("click", function (e) {
      // composedPath dipakai karena ikon di dalam tombol diganti saat diklik
      var path = e.composedPath ? e.composedPath() : [];
      var didalam = path.indexOf(header) !== -1 || header.contains(e.target);
      if (!didalam) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setOpen(false); menuBtn.focus(); }
    });
 
    var aksi = document.createElement("div");
    aksi.className = "aksi-kanan";
    aksi.appendChild(themeBtn);
    aksi.appendChild(menuBtn);
    header.appendChild(aksi);
    header.classList.add("js-menu"); // menu baru disembunyikan kalau JS jalan
    setOpen(false);
  });
})();
 
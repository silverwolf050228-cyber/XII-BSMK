(function () {
  var KEY = "tema", root = document.documentElement;

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.querySelector(".nav-link");
    if (!list) return;

    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tema-toggle";
    li.appendChild(btn);
    list.appendChild(li);

    function update() {
      var dark = isDark();
      btn.textContent = dark ? "\u2600\uFE0F" : "\uD83C\uDF19";
      btn.setAttribute("aria-label", dark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
    }

    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      update();
    });

    update();
  });
})();
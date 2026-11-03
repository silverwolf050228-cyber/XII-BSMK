<script>
  (function () {
    const now = new Date();
    const hariIni =
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      String(now.getDate()).padStart(2, "0");
    const preview = location.search.includes("ultah");

    document.querySelectorAll("[data-ulang]").forEach(function (el) {
      if (preview || el.dataset.ulang === hariIni) {
        el.classList.add("card-ultah");
      }
    });
  })();
</script>
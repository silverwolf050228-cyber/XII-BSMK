const searchInput = document.getElementById("studentSearch");
const noResult = document.getElementById("noResult");
const cards = document.querySelectorAll("#studentList .card");

function searchStudents() {
  const keyword = searchInput.value.toLowerCase().trim();
  let found = 0;

  cards.forEach(card => {
    const title = card.querySelector("h3");
    if (!title.dataset.name) title.dataset.name = title.textContent;
    const name = title.dataset.name;

    const item = card.closest(".card-link") || card;
    const match = name.toLowerCase().startsWith(keyword);

    item.style.display = match ? "" : "none";

    // Beri warna pada huruf yang cocok
    if (match && keyword) {
      title.innerHTML =
        '<span class="hl">' + name.slice(0, keyword.length) + "</span>" +
        name.slice(keyword.length);
    } else {
      title.textContent = name;
    }

    if (match) found++;
  });

  noResult.style.display = found === 0 ? "block" : "none";
}

searchInput.addEventListener("input", searchStudents);
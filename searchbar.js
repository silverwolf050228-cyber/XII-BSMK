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
    const index = name.toLowerCase().indexOf(keyword);
    const match = index !== -1;

    item.style.display = match ? "" : "none";

    // Yang diawali keyword tampil paling atas, sisanya di bawahnya
    item.style.order = keyword && index > 0 ? 1 : 0;

    // Beri warna pada huruf yang cocok, di posisi mana pun
    if (match && keyword) {
      title.innerHTML =
        name.slice(0, index) +
        '<span class="hl">' + name.slice(index, index + keyword.length) + "</span>" +
        name.slice(index + keyword.length);
    } else {
      title.textContent = name;
    }

    if (match) found++;
  });

  noResult.style.display = found === 0 ? "block" : "none";
}

searchInput.addEventListener("input", searchStudents);
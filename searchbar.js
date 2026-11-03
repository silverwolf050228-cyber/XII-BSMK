const searchInput = document.getElementById("studentSearch");
const noResult = document.getElementById("noResult");
const cards = document.querySelectorAll("#studentList .card");

function searchStudents() {
  const keyword = searchInput.value.toLowerCase().trim();
  let found = 0;

  cards.forEach(card => {
    const item = card.closest(".card-link") || card;
    const match = card.textContent.toLowerCase().includes(keyword);
    item.style.display = match ? "" : "none";
    if (match) found++;
  });

  noResult.style.display = found === 0 ? "block" : "none";
}

searchInput.addEventListener("input", searchStudents);
function filterCommandCards() {
  const searchInput = document.getElementById("commandSearch");
  const filterInput = document.getElementById("commandFilter");
  const status = document.getElementById("commandStatus");
  const cards = document.querySelectorAll(".command-card");

  if (!searchInput || !filterInput || !status || !cards.length) {
    return;
  }

  const searchValue = searchInput.value.trim().toLowerCase();
  const filterValue = filterInput.value;
  let visibleCount = 0;

  cards.forEach((card) => {
    const topic = card.dataset.topic || "";
    const keywords = card.dataset.keywords || "";
    const text = `${card.textContent} ${keywords}`.toLowerCase();
    const matchesTopic = filterValue === "all" || topic === filterValue;
    const matchesSearch = !searchValue || text.includes(searchValue);
    const isVisible = matchesTopic && matchesSearch;

    card.classList.toggle("is-hidden-card", !isVisible);

    if (isVisible) {
      visibleCount++;
    }
  });

  status.textContent = visibleCount
    ? `Showing ${visibleCount} command card${visibleCount === 1 ? "" : "s"}.`
    : "No commands matched your search.";
}

async function copyCommand(button) {
  const commandText = button.dataset.copy || "";

  try {
    await navigator.clipboard.writeText(commandText);
    button.textContent = "Copied";
  } catch (error) {
    button.textContent = "Unavailable";
  }

  window.setTimeout(() => {
    button.textContent = "Copy";
  }, 1200);
}

function initializeCommandCenter() {
  const searchInput = document.getElementById("commandSearch");
  const filterInput = document.getElementById("commandFilter");
  const copyButtons = document.querySelectorAll(".copy-command-btn");

  if (!searchInput || !filterInput) {
    return;
  }

  searchInput.addEventListener("input", filterCommandCards);
  filterInput.addEventListener("change", filterCommandCards);

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => copyCommand(button));
  });

  filterCommandCards();
}

document.addEventListener("DOMContentLoaded", initializeCommandCenter);

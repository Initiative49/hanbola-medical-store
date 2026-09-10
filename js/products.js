function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  const q = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
  const cat = document.getElementById("categoryFilter")?.value || "all";

  const filtered = products.filter(p => {
    const matchesText = !q || p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
    const matchesCat = cat === "all" || p.category === cat;
    return matchesText && matchesCat;
  });

  grid.innerHTML = filtered.map(productCard).join("");
  empty.classList.toggle("hidden", filtered.length !== 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("categoryFilter");
  filter.innerHTML = `<option value="all">كل الأقسام</option>` + categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

  const params = new URLSearchParams(location.search);
  if (params.get("category")) filter.value = params.get("category");

  document.getElementById("searchInput").addEventListener("input", renderProducts);
  filter.addEventListener("change", renderProducts);
  renderProducts();
});
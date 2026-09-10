function imagePath(number) {
  return STORE.imageFolder + String(number).padStart(STORE.imageDigits, "0") + ".jpg";
}

function money(value) {
  return Number(value).toLocaleString("ar-YE") + " " + STORE.currency;
}

function getCategory(id) {
  return categories.find(c => c.id === id);
}

function getCart() {
  try { return JSON.parse(localStorage.getItem("hanbola_cart") || "[]"); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem("hanbola_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  showToast("تمت إضافة المنتج إلى السلة");
}

function showToast(text) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function productCard(p) {
  const cat = getCategory(p.category);
  return `<article class="product-card">
    <a href="product.html?id=${p.id}" class="product-image"><img src="${imagePath(p.image)}" alt="${p.name}" onerror="this.parentElement.classList.add('image-placeholder');this.style.display='none'"><span>${cat?.name || ""}</span></a>
    <div class="product-info">
      <p class="product-category">${cat?.name || ""}</p>
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-bottom"><strong>${money(p.price)}</strong><button class="add-btn" onclick="addToCart(${p.id})">+ للسلة</button></div>
    </div>
  </article>`;
}

function renderNav() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  nav.innerHTML = `<a href="index.html">الرئيسية</a><a href="products.html">المنتجات</a>` +
    categories.map(c => `<a href="products.html?category=${c.id}">${c.name}</a>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  updateCartCount();

  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  const categoryGrid = document.getElementById("categoryGrid");
  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(c => `<a class="category-card" href="products.html?category=${c.id}"><span>${c.icon}</span><h3>${c.name}</h3><small>تصفح القسم ←</small></a>`).join("");
  }

  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    featuredGrid.innerHTML = products.filter(p => p.featured).slice(0, 4).map(productCard).join("");
  }
});
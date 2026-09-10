document.addEventListener("DOMContentLoaded", () => {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const p = products.find(x => x.id === id);
  const box = document.getElementById("productDetails");

  if (!p) {
    box.innerHTML = `<div class="empty">المنتج غير موجود.</div>`;
    return;
  }

  const cat = getCategory(p.category);
  box.innerHTML = `<div class="product-detail">
    <div class="detail-image"><img src="${imagePath(p.image)}" alt="${p.name}" onerror="this.parentElement.classList.add('image-placeholder');this.style.display='none'"></div>
    <div class="detail-content">
      <p class="eyebrow">${cat?.name || ""}</p>
      <h1>${p.name}</h1>
      <div class="detail-price">${money(p.price)}</div>
      <p class="detail-description">${p.description || ""}</p>
      <div class="qty-row"><button id="minus">−</button><input id="qty" value="1" min="1" type="number"><button id="plus">+</button></div>
      <button id="addProduct" class="primary-btn full">أضف إلى السلة</button>
      <a class="secondary-btn full" href="products.html">متابعة التسوق</a>
    </div>
  </div>`;

  const qty = document.getElementById("qty");
  document.getElementById("minus").onclick = () => qty.value = Math.max(1, Number(qty.value) - 1);
  document.getElementById("plus").onclick = () => qty.value = Number(qty.value) + 1;
  document.getElementById("addProduct").onclick = () => addToCart(p.id, Math.max(1, Number(qty.value)));
});
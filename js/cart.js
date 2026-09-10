function renderCart() {
  const box = document.getElementById("cartLayout");
  const cart = getCart();

  if (!cart.length) {
    box.innerHTML = `<div class="empty"><div class="empty-icon">🛒</div><h2>السلة فارغة</h2><p>أضف بعض المنتجات للمتابعة.</p><a class="primary-btn" href="products.html">تصفح المنتجات</a></div>`;
    return;
  }

  let total = 0;
  const rows = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return "";
    const line = p.price * item.qty;
    total += line;
    return `<div class="cart-row">
      <img src="${imagePath(p.image)}" alt="${p.name}" onerror="this.style.visibility='hidden'">
      <div class="cart-name"><h3>${p.name}</h3><small>${money(p.price)}</small></div>
      <div class="qty-row compact"><button onclick="changeQty(${p.id}, -1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id}, 1)">+</button></div>
      <strong>${money(line)}</strong>
      <button class="remove" onclick="removeItem(${p.id})">حذف</button>
    </div>`;
  }).join("");

  box.innerHTML = `<div class="cart-layout"><div class="cart-items">${rows}</div>
    <aside class="order-box">
      <h2>ملخص الطلب</h2><div class="summary-line"><span>الإجمالي</span><strong>${money(total)}</strong></div>
      <hr>
      <label>الاسم<input id="customerName" placeholder="اسم العميل"></label>
      <label>رقم الهاتف<input id="customerPhone" type="tel" placeholder="رقم الهاتف"></label>
      <label>العنوان<input id="customerAddress" placeholder="المدينة / العنوان"></label>
      <label>ملاحظات<textarea id="customerNotes" placeholder="ملاحظات إضافية"></textarea></label>
      <button class="whatsapp-btn" onclick="sendWhatsApp()">إتمام الطلب عبر WhatsApp</button>
    </aside></div>`;
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeItem(id);
  saveCart(cart); renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter(x => x.id !== id));
  renderCart();
}

function sendWhatsApp() {
  const cart = getCart();
  if (!cart.length) return;
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();

  let total = 0;
  let text = `السلام عليكم، أريد طلبًا من متجر حنبولة:%0A%0A`;
  cart.forEach((item, i) => {
    const p = products.find(x => x.id === item.id);
    if (!p) return;
    total += p.price * item.qty;
    text += `${i + 1}. ${p.name} × ${item.qty} — ${money(p.price * item.qty)}%0A`;
  });
  text += `%0Aالإجمالي: ${money(total)}%0A`;
  text += `الاسم: ${name || "غير مذكور"}%0Aرقم الهاتف: ${phone || "غير مذكور"}%0Aالعنوان: ${address || "غير مذكور"}`;
  if (notes) text += `%0Aملاحظات: ${notes}`;

  window.open(`https://wa.me/${STORE.whatsapp}?text=${text}`, "_blank");
}

document.addEventListener("DOMContentLoaded", renderCart);
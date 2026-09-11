function imagePath(n){return STORE.imageFolder+String(n).padStart(STORE.imageDigits,"0")+".jpg"}
function money(v){return STORE.currencySymbol+Number(v).toFixed(2)}
function moneyYER(v){return Number(v*STORE.exchangeRate).toLocaleString("en-US")+" ر.ي"}
function getCategory(id){return categories.find(c=>c.id===id)}
function getCart(){try{return JSON.parse(localStorage.getItem("hanbola_cart")||"[]")}catch(e){return[]}}
function saveCart(c){localStorage.setItem("hanbola_cart",JSON.stringify(c));updateCartCount()}
function updateCartCount(){let n=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll("#cartCount").forEach(e=>e.textContent=n)}
function addToCart(id,qty=1){let c=getCart(),x=c.find(i=>i.id===id);x?x.qty+=qty:c.push({id,qty});saveCart(c);toast("تمت إضافة المنتج إلى السلة")}
function toast(t){let e=document.getElementById("toast");if(!e){e=document.createElement("div");e.id="toast";e.className="toast";document.body.appendChild(e)}e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1600)}
function goSearch(){let q=(document.getElementById("homeSearch")?.value||"").trim();location.href="products.html"+(q?"?q="+encodeURIComponent(q):"")}
function card(p){let c=getCategory(p.category);return `<article class="product-card"><a class="product-image" href="product.html?id=${p.id}"><img src="${imagePath(p.image)}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.classList.add('placeholder')"><span>${c?.name||""}</span></a><div class="product-info"><small>${c?.name||""}</small><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="product-bottom"><strong>${money(p.price)}</strong><button onclick="addToCart(${p.id})">أضف للسلة</button></div></div></article>`}
document.addEventListener("DOMContentLoaded",()=>{updateCartCount();let nav=document.getElementById("mainNav"),mb=document.getElementById("mobileMenuBtn");if(mb&&nav)mb.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  mb.setAttribute("aria-expanded",open?"true":"false");
});
let cg=document.getElementById("categoryGrid");if(cg)cg.innerHTML=categories.map(c=>`<a class="category-card" href="products.html?category=${c.id}"><div class="cat-icon">${c.icon}</div><h3>${c.name}</h3><span>تصفح القسم ←</span></a>`).join("");
let fg=document.getElementById("featuredGrid");if(fg)fg.innerHTML=products.filter(p=>p.featured).slice(0,4).map(card).join("");
let s=document.getElementById("homeSearch");if(s)s.addEventListener("keydown",e=>{if(e.key==="Enter")goSearch()})});
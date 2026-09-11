document.addEventListener("DOMContentLoaded",()=>{
 const slides=[...document.querySelectorAll("#heroSlider .slide")]; if(!slides.length)return;
 let i=0,timer;
 const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle("active",k===i));};
 const restart=()=>{clearInterval(timer);timer=setInterval(()=>show(i+1),4000)};
 document.getElementById("nextSlide")?.addEventListener("click",()=>{show(i+1);restart()});
 document.getElementById("prevSlide")?.addEventListener("click",()=>{show(i-1);restart()});
 restart();
});
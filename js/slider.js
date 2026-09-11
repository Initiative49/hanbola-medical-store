document.addEventListener("DOMContentLoaded",()=>{
  const slider=document.getElementById("heroSlider");
  const slides=slider?[...slider.querySelectorAll(".slide")]:[];
  const dots=[...document.querySelectorAll("#heroDots button")];
  if(!slider||slides.length<2)return;

  let index=0, timer=null, startX=0, dragging=false;
  const show=(n)=>{
    index=(n+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("active",i===index));
    dots.forEach((d,i)=>d.classList.toggle("on",i===index));
  };
  const start=()=>{clearInterval(timer);timer=setInterval(()=>show(index+1),5000)};
  const stop=()=>clearInterval(timer);

  dots.forEach((d,i)=>d.addEventListener("click",()=>{show(i);start()}));
  slider.addEventListener("mouseenter",stop);
  slider.addEventListener("mouseleave",start);
  slider.addEventListener("touchstart",e=>{startX=e.changedTouches[0].clientX;dragging=true;stop()},{passive:true});
  slider.addEventListener("touchend",e=>{
    if(!dragging)return; const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>45) show(index+(dx<0?1:-1));
    dragging=false; start();
  },{passive:true});
  document.addEventListener("visibilitychange",()=>document.hidden?stop():start());
  show(0); start();
});
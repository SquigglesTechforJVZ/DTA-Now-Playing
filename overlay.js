const $=s=>document.querySelector(s);
const viz=$("#visualizer");
for(let i=0;i<34;i++){const b=document.createElement("b");b.style.animationDelay=(-((i*0.083)%0.9))+"s";viz.appendChild(b)}
const fmt=n=>{n=Math.max(0,Math.floor(Number(n)||0));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0")};
let hideTimer;
function render(d){
  $("#title").textContent=d.title||"Unknown track";
  $("#artist").textContent=d.artist||"Unknown artist";
  $("#source").textContent=(d.source||"").toUpperCase();
  if(d.art&&$("#art").src!==d.art)$("#art").src=d.art;
  const pct=d.duration?Math.min(100,Math.max(0,d.position/d.duration*100)):0;
  $("#progress").style.width=pct+"%";
  $("#time").textContent=fmt(d.position)+" / "+fmt(d.duration);
  clearTimeout(hideTimer);
  if(d.playing&&d.title)$("#card").classList.add("on");
  else hideTimer=setTimeout(()=>$("#card").classList.remove("on"),2500);
}
async function poll(){try{const r=await fetch("/now-playing",{cache:"no-store"});render(await r.json())}catch{}}
setInterval(poll,750);poll();

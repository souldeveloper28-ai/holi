const colorBtn = document.getElementById("colorBtn");
const musicBtn = document.getElementById("musicBtn");
const rainBtn  = document.getElementById("rainBtn");
const music    = document.getElementById("music");

const nameInput = document.getElementById("nameInput");
const setName   = document.getElementById("setName");
const fromText  = document.getElementById("fromText");

/* ===== COLOR CHANGE ===== */
colorBtn.onclick = ()=>{
  document.body.style.background =
   `linear-gradient(135deg,
    hsl(${Math.random()*360},100%,60%),
    hsl(${Math.random()*360},100%,60%),
    hsl(${Math.random()*360},100%,60%))`;
};

/* ===== MUSIC ===== */
let playing=false;
musicBtn.onclick=()=>{
  playing ? music.pause() : music.play();
  playing=!playing;
};

/* ===== SPLASH EFFECT ===== */
document.addEventListener("click",e=>{
  const s=document.createElement("span");
  s.className="splash";
  s.style.left=e.clientX+"px";
  s.style.top=e.clientY+"px";
  s.style.background=`hsl(${Math.random()*360},100%,60%)`;
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),900);
});

/* ===== GULAL RAIN ===== */
rainBtn.onclick=()=>{
  for(let i=0;i<60;i++){
    const g=document.createElement("div");
    g.className="gulal";
    g.style.left=Math.random()*100+"vw";
    g.style.background=`hsl(${Math.random()*360},100%,60%)`;
    g.style.animationDuration=2+Math.random()*3+"s";
    document.body.appendChild(g);
    setTimeout(()=>g.remove(),5000);
  }
};

/* ===== NAME SET ===== */
setName.onclick=()=>{
  if(nameInput.value.trim()!==""){
    fromText.textContent="— From "+nameInput.value;
  }
};

/* ===== CANVAS BACKGROUND ===== */
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];
for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*3+1,
    dx:(Math.random()-0.5),
    dy:(Math.random()-0.5),
    c:`hsl(${Math.random()*360},100%,60%)`
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c;
    ctx.fill();
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();
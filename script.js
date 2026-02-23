/* =========================================================
   HOLI X — EXTREME FESTIVAL ENGINE
   Author: Yash
   Engine Type: Pure JS (No Library)
========================================================= */

/* =========================================================
   GLOBAL SELECTORS
========================================================= */
const canvas = document.getElementById("fxCanvas");
const ctx = canvas.getContext("2d");

const loader = document.getElementById("loader");
const bgMusic = document.getElementById("bgMusic");

const btnColors = document.getElementById("btnColors");
const btnMusic = document.getElementById("btnMusic");
const btnSmoke = document.getElementById("btnSmoke");
const btnFireworks = document.getElementById("btnFireworks");
const btnRain = document.getElementById("btnRain");
const btnShare = document.getElementById("btnShare");

const nameInput = document.getElementById("nameInput");
const setNameBtn = document.getElementById("setName");
const fromText = document.getElementById("fromText");

const countdownEl = document.getElementById("countdown");
const scoreEl = document.getElementById("score");

/* =========================================================
   CANVAS RESIZE
========================================================= */
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* =========================================================
   LOADER CONTROL
========================================================= */
window.addEventListener("load", ()=>{
  setTimeout(()=>{
    loader.style.display = "none";
  },1500);
});

/* =========================================================
   ENGINE CONFIG
========================================================= */
const ENGINE = {
  gravity: 0.12,
  friction: 0.985,
  maxParticles: 1400,
  smokeEnabled: true,
  musicPlaying: false,
  score: 0
};

/* =========================================================
   UTILITY FUNCTIONS
========================================================= */
function rand(min,max){
  return Math.random()*(max-min)+min;
}

function randomColor(){
  return `hsl(${Math.random()*360},100%,60%)`;
}

/* =========================================================
   PARTICLE CLASS
========================================================= */
class Particle{
  constructor(x,y,size,color,vx,vy,life){
    this.x=x;
    this.y=y;
    this.size=size;
    this.color=color;
    this.vx=vx;
    this.vy=vy;
    this.life=life;
  }

  update(){
    this.vy += ENGINE.gravity;
    this.vx *= ENGINE.friction;
    this.vy *= ENGINE.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
  }
}

/* =========================================================
   PARTICLE STORAGE
========================================================= */
const particles = [];

/* =========================================================
   EMITTER
========================================================= */
function emitParticles(x,y,count,type="normal"){
  for(let i=0;i<count;i++){
    if(particles.length > ENGINE.maxParticles) break;

    let size = type==="firework" ? rand(2,4) : rand(1,3);
    let speed = type==="firework" ? rand(-8,8) : rand(-4,4);

    particles.push(
      new Particle(
        x,
        y,
        size,
        randomColor(),
        speed,
        speed,
        type==="firework" ? 120 : 80
      )
    );
  }
}

/* =========================================================
   FIREWORK EXPLOSION
========================================================= */
function firework(x,y){
  emitParticles(x,y,180,"firework");
}

/* =========================================================
   GULAL RAIN
========================================================= */
function gulalRain(){
  for(let i=0;i<120;i++){
    particles.push(
      new Particle(
        rand(0,canvas.width),
        -20,
        rand(2,4),
        randomColor(),
        rand(-1,1),
        rand(2,5),
        200
      )
    );
  }
}

/* =========================================================
   COLOR BACKGROUND ANIMATION
========================================================= */
function randomBackground(){
  document.body.style.background =
   `linear-gradient(135deg,
     ${randomColor()},
     ${randomColor()},
     ${randomColor()})`;
}

/* =========================================================
   MUSIC CONTROL
========================================================= */
btnMusic.addEventListener("click",()=>{
  if(!ENGINE.musicPlaying){
    bgMusic.play();
    ENGINE.musicPlaying=true;
  }else{
    bgMusic.pause();
    ENGINE.musicPlaying=false;
  }
});

/* =========================================================
   BUTTON EVENTS
========================================================= */
btnColors.onclick = randomBackground;

btnSmoke.onclick = ()=>{
  ENGINE.smokeEnabled = !ENGINE.smokeEnabled;
};

btnFireworks.onclick = ()=>{
  firework(rand(100,canvas.width-100),rand(100,canvas.height/2));
};

btnRain.onclick = gulalRain;

btnShare.onclick = ()=>{
  const msg = encodeURIComponent("🎨 Happy Holi! Check this extreme Holi website 🌈");
  const url = encodeURIComponent(location.href);
  window.open(`https://wa.me/?text=${msg}%0A${url}`);
};

/* =========================================================
   NAME SET
========================================================= */
setNameBtn.onclick = ()=>{
  if(nameInput.value.trim()!==""){
    fromText.textContent = "— From " + nameInput.value;
  }
};

/* =========================================================
   URL NAME AUTO
========================================================= */
const params = new URLSearchParams(location.search);
if(params.get("name")){
  fromText.textContent = "— From " + params.get("name");
}

/* =========================================================
   COUNTDOWN
========================================================= */
const holiDate = new Date("March 14, 2026 00:00:00").getTime();

setInterval(()=>{
  const now = Date.now();
  const diff = holiDate - now;

  if(diff <= 0){
    countdownEl.textContent = "🎉 HAPPY HOLI 🎉";
    return;
  }

  const d = Math.floor(diff/(1000*60*60*24));
  const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((diff%(1000*60*60))/(1000*60));

  countdownEl.textContent = `Holi in ${d}d ${h}h ${m}m`;
},1000);

/* =========================================================
   MINI GAME (CLICK TO SCORE)
========================================================= */
window.addEventListener("click",(e)=>{
  ENGINE.score++;
  scoreEl.textContent = ENGINE.score;
  emitParticles(e.clientX,e.clientY,50);
});

/* =========================================================
   CURSOR SMOKE
========================================================= */
window.addEventListener("mousemove",(e)=>{
  if(!ENGINE.smokeEnabled) return;
  emitParticles(e.clientX,e.clientY,6);
});

/* =========================================================
   MAIN LOOP
========================================================= */
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    p.update();
    p.draw();

    if(p.life<=0 || p.y>canvas.height+50){
      particles.splice(i,1);
    }
  }

  requestAnimationFrame(animate);
}

animate();

/* =========================================================
   PERFORMANCE ADAPTATION
========================================================= */
let frames=0;
let last=performance.now();

setInterval(()=>{
  const now=performance.now();
  const fps = Math.round(frames/((now-last)/1000));
  frames=0;
  last=now;

  if(fps<40){
    ENGINE.maxParticles = Math.max(400,ENGINE.maxParticles-200);
  }else if(fps>55){
    ENGINE.maxParticles = Math.min(1800,ENGINE.maxParticles+100);
  }
},2000);

(function fpsCounter(){
  frames++;
  requestAnimationFrame(fpsCounter);
})();

/* =========================================================
   ENGINE END
========================================================= */

let i=0;
const screens=document.querySelectorAll(".screen");
const music=document.getElementById("bgm");

function next(){
  screens[i].classList.remove("active");
  i++;
  screens[i].classList.add("active");
  music.play();
}

function fill(c){
  document.getElementById("heart").style.background=c;
}

const hug=document.getElementById("hug");
const text=document.getElementById("hugText");
let t;

hug.addEventListener("mousedown",()=>{
  t=setTimeout(()=>text.innerText="Hug Received! Happy Holi ❤️",1200);
});
hug.addEventListener("mouseup",()=>clearTimeout(t));

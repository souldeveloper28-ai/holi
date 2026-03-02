let current=1;
const music=document.getElementById("bgMusic");

function next(){
document.getElementById("s"+current).classList.remove("active");
current++;
document.getElementById("s"+current).classList.add("active");
music.play();
}

function fill(color){
document.getElementById("heart").style.background=color;
}

const hug=document.getElementById("hugCircle");
const hugText=document.getElementById("hugText");
let timer;

hug.addEventListener("mousedown",()=>{
timer=setTimeout(()=>{
hugText.innerText="Hug Received! Happy Holi ❤️";
},1500);
});

hug.addEventListener("mouseup",()=>{
clearTimeout(timer);
});

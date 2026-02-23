const colorBtn = document.getElementById("colorBtn");
const musicBtn = document.getElementById("musicBtn");
const rainBtn  = document.getElementById("rainBtn");
const shareBtn = document.getElementById("shareBtn");

const nameInput = document.getElementById("nameInput");
const setName   = document.getElementById("setName");
const fromText  = document.getElementById("fromText");

colorBtn.onclick = ()=>{
  document.body.style.background =
   `linear-gradient(135deg,
    hsl(${Math.random()*360},100%,60%),
    hsl(${Math.random()*360},100%,60%))`;
};

rainBtn.onclick=()=>{
  for(let i=0;i<50;i++){
    const g=document.createElement("div");
    g.className="gulal";
    g.style.left=Math.random()*100+"vw";
    g.style.background=`hsl(${Math.random()*360},100%,60%)`;
    g.style.animationDuration=2+Math.random()*3+"s";
    document.body.appendChild(g);
    setTimeout(()=>g.remove(),5000);
  }
};

setName.onclick=()=>{
  if(nameInput.value.trim()!==""){
    fromText.textContent="— From "+nameInput.value;
  }
};

/* ✅ WHATSAPP SHARE */
shareBtn.onclick = ()=>{
  const name = nameInput.value || "Your Friend";
  const text =
`🌈 Happy Holi 🌈

May this Holi bring colors of joy, love and happiness in your life.

— From ${name}`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url,"_blank");
};

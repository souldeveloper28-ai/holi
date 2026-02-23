const nameInput = document.getElementById("nameInput");
const setName = document.getElementById("setName");
const fromText = document.getElementById("fromText");
const shareBtn = document.getElementById("shareBtn");

setName.onclick = () => {
  const name = nameInput.value.trim();
  if(name){
    fromText.textContent = "— Best wishes from " + name;
  }
};

const params = new URLSearchParams(location.search);
if(params.get("name")){
  fromText.textContent = "— Best wishes from " + params.get("name");
}

shareBtn.onclick = () => {
  const text = encodeURIComponent(
    "🌸 Happy Holi! Wishing you happiness, peace and beautiful moments 🌸"
  );
  const url = encodeURIComponent(location.href);
  window.open(`https://wa.me/?text=${text}%0A${url}`);
};

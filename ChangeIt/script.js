// --- Vidéos libres de droits en ligne ---
const videos = [
  "https://player.vimeo.com/external/449156824.sd.mp4?s=5d6a9d5b8367f0a1d6d1feef7e2a5c42f57d2db2&profile_id=164",
  "https://player.vimeo.com/external/414123456.sd.mp4?s=dummy1",
  "https://player.vimeo.com/external/414123457.sd.mp4?s=dummy2",
  "https://player.vimeo.com/external/414123458.sd.mp4?s=dummy3",
  "https://player.vimeo.com/external/414123459.sd.mp4?s=dummy4",
  "https://player.vimeo.com/external/414123460.sd.mp4?s=dummy5",
  "https://player.vimeo.com/external/414123461.sd.mp4?s=dummy6",
  "https://player.vimeo.com/external/414123462.sd.mp4?s=dummy7"
];

const bgVideo = document.getElementById("bg-video");
bgVideo.src = videos[Math.floor(Math.random()*videos.length)];
bgVideo.load();
bgVideo.play().catch(()=>{console.log("Vidéo non lue automatiquement, vérifie que le muted est présent.");});

// --- Taux de conversion ---
const rates = {
  "XOF": {"EUR":0.0015,"USD":0.0017,"XOF":1},
  "EUR": {"XOF":660,"USD":1.12,"EUR":1},
  "USD": {"XOF":590,"EUR":0.89,"USD":1}
};

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultEl = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", ()=>{
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;
  if(!amount || amount<=0){resultEl.innerText="⚠️ Montant invalide"; return;}
  if(from===to){resultEl.innerText="⚠️ Choisissez deux devises différentes"; return;}
  const converted = amount * rates[from][to];
  resultEl.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  spawnMoney(50);
});

// --- Billets animés ---
function spawnMoney(count=30){
  const centerX = window.innerWidth/2;
  const centerY = window.innerHeight/2;
  for(let i=0;i<count;i++){
    const money = document.createElement("div");
    money.classList.add("money");
    const icons = ["💵","💶","💴"];
    money.innerText = icons[Math.floor(Math.random()*icons.length)];
    money.style.left = (centerX + (Math.random()-0.5)*400)+"px";
    money.style.top = (centerY + (Math.random()-0.5)*400)+"px";
    money.style.fontSize = (20 + Math.random()*35)+"px";
    document.body.appendChild(money);
    setTimeout(()=>money.remove(),4000);
  }
}

// --- Globe 3D avec halo lumineux ---
const container = document.getElementById("globe-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const globeTexture = loader.load("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Blue_Marble_2002.png/800px-Blue_Marble_2002.png");
const geometry = new THREE.SphereGeometry(1,64,64);
const material = new THREE.MeshPhongMaterial({map:globeTexture});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

const haloGeometry = new THREE.SphereGeometry(1.15,64,64);
const haloMaterial = new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.2, side:THREE.BackSide});
const halo = new THREE.Mesh(haloGeometry, haloMaterial);
scene.add(halo);

const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.5));

function animate(){requestAnimationFrame(animate); globe.rotation.y+=0.003; halo.rotation.y+=0.002; renderer.render(scene,camera);}
animate();

window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.domElement.addEventListener("click", ()=>spawnMoney(80));
renderer.domElement.style.cursor = "pointer";

// --- Fin du script ---
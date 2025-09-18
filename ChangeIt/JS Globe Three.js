const container = document.getElementById("globe-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); 
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(200,200); // correspond à la div globe
container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const globeTexture = loader.load("https://upload.wikimedia.org/wikipedia/commons/2/2c/Blue_Marble_2002.png");
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1,64,64),
  new THREE.MeshPhongMaterial({map:globeTexture})
);
scene.add(globe);

scene.add(new THREE.AmbientLight(0xffffff,0.5));
const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  globe.rotation.y += 0.01;
  renderer.render(scene,camera);
}
animate();

import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import getStarfield from "./textures/stars/star.js";
import earthbump1k from "./textures/01_earthbump1k.jpg";
import img_2 from "./textures/05_earthcloudmaptrans.jpg";
import img_3 from "./textures/8081_earthlights10k.jpg";
import img_4 from "./textures/02_earthspec1k.jpg";
import img_5 from "./textures/earth_clouds_8K.png";
import img from "./textures/Earth4kTexture.png";
import moon_img from "./textures/Moon.jpg";
import moon_bum from "./textures/moon_bum.jpg";
import { getFresnelMat } from "./textures/stars/getFrensilMat.js";
const canvas = document.querySelector("canvas.webgl");
// console.log('ss');ss


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(img),
  specularMap: loader.load(img_4),
  bumpMap: loader.load(earthbump1k),
  bumpScale: 0.04,
});
// material.map.colorSpace = THREE.SRGBColorSpace;
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load(img_3),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load(img_5),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load(img_2),
  
  // alphaTest: 0.3,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// ===============================================================================================

const moonGroop=new THREE.Group();
scene.add(moonGroop);
const MoonMaterial = new THREE.MeshStandardMaterial({
  map:loader.load(moon_img),
  bumpMap:loader.load(moon_bum),
  bumpScale:2,
  roughness:0,
  metalness:0.2,

});

const moonMesh = new THREE.Mesh(geometry,MoonMaterial);
moonMesh.position.set(2,0,0);
moonMesh.scale.setScalar(0.27);
moonGroop.add(moonMesh);









function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;
  moonGroop.rotation.y +=0.01;
  renderer.render(scene, camera);
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
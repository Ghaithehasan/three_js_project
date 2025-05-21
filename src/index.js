// import './style.css';
// import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { UltraHDRLoader } from 'three/examples/jsm/loaders/UltraHDRLoader.js';


// import gsap from 'gsap';

// // Canvas

// const canvas = document.querySelector('canvas.webgl')
// const sencse=new THREE.Scene();
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material=new THREE.MeshBasicMaterial({color:"#A020F0"});
// const mesh=new THREE.Mesh(geometry,material);

// sencse.add(mesh);


// const hdrLoader = new UltraHDRLoader();


// // Axes helper

// const sizes = {
//     width:window.innerWidth,
//     height:window.innerHeight
// };



// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z=5;

// sencse.add(camera);


// // Controls 
// const controls = new OrbitControls(camera , canvas);
// controls.enableDamping=true;


// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// });
// renderer.setSize(sizes.width, sizes.height);


// const clock = new THREE.Clock();


// const cursuer = {
//     x:0,
//     y:0
// };
// const event=window.addEventListener('mousemove',function(event)
// {
//     cursuer.x=event.clientX / sizes.width - 0.5;
//     cursuer.y=-(event.clientY/ sizes.width - 0.5);
// });

// // Animation
// const tick = () => 
//     {

//         const elaspedTime = clock.getElapsedTime();

//         // camera.position.x=cursuer.x*10;
//         // camera.position.y=cursuer.y*10;
//         // camera.lookAt(mesh.position);

//         controls.update();

//         renderer.render(sencse, camera);
//         window.requestAnimationFrame(tick);

//     }

//     tick();  

import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "./assets/models/satellite.glb";
import modelUrl_2 from "./assets/models/earth.glb";

const canvas = document.querySelector("canvas.webgl");

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5; // ضبط سطوع الصورة لجعلها واقعية أكثر
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// تحميل بيئة انعكاسية لتحسين المظهر
const textureLoader = new THREE.TextureLoader();
const envTexture = textureLoader.load("./assets/textures/space_hdr.jpg"); // استخدم صورة HDR مناسبة
envTexture.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = envTexture;

// إضافة إضاءة واقعية لتعزيز المودل
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffaa33, 6, 15);
pointLight.position.set(-3, 3, 3);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff, 5);
spotLight.position.set(0, 5, 5);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);

// تحميل المودل وتحسين الإعدادات البصرية
const loader = new GLTFLoader();
loader.load(
  modelUrl_2,
  (gltf) => {
    const earth = gltf.scene;
    earth.scale.set(1.5, 1.5, 1.5);
    earth.position.set(0, 0, 0);

    earth.traverse((child) => {
      if (child.isMesh) {
        child.material.envMap = envTexture; // تفعيل تأثيرات البيئة
        child.material.envMapIntensity = 2;
        child.material.metalness = 1;
        child.material.roughness = 0.2;
        child.material.needsUpdate = true;
      }
    });

    scene.add(earth);

    // // تحريك الكرة الأرضية لجعلها أكثر ديناميكية
    // function animateModel() {
    //   earth.rotation.y += 0.005;
    //   requestAnimationFrame(animateModel);
    // }
    // animateModel();
  },
  undefined,
  (error) => {
    console.error("فشل تحميل المودل:", error);
  }
);

// تحديث الحركة والرندر
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();

// تعديل عند تغيير حجم النافذة
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

// التحكم في ملء الشاشة
window.addEventListener("dblclick", function () {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
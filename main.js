import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import TrackballControls from "three-trackballcontrols";
let renderer,
  camera,
  controls,
  scene,
  width = window.innerWidth,
  height = window.innerHeight;
init();
animate();
addShape();
render();

function addShape() {
  let num = 20,
    distance = 10,
    offset = 30;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let geometry = new THREE.BoxGeometry(10, helpers(25, 75), 10),
        color = new THREE.Color(`hsl(${helpers(100, 360)}, 50%, 50%)`),
        material = new THREE.MeshLambertMaterial({ color: color });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = distance * i;
      mesh.position.z = distance * j - offset;

      scene.add(mesh);
    }
  }

  // const loader = new GLTFLoader();
  // loader.load(
  //   "./assets/model/avatar.glb",
  //   function (gltf) {
  //     scene.add(gltf.scene);
  //   },
  //   (xhr) => {
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  // render();
}

function init() {
  /// RENDERER

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x2f8e70);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);

  ///controls
  camera.position.z = 100;
  camera.position.y = 50;
  camera.position.x = 50;
  controls = new TrackballControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  scene = new THREE.Scene();

  /// LIGHTS
  const light1 = new THREE.AmbientLight(0xffffff, 0.5),
    light2 = new THREE.DirectionalLight(0xffffff);

  light2.position.set(10, 20, 30);
  scene.add(light1);
  scene.add(light2);

  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = width / height;
  camera.updateProjectMatrix();
  renderer / setSize(width, height);
  controls.handleResize();
}

function helpers(min, max) {
  return Math.random() * (max - min) + min;
}

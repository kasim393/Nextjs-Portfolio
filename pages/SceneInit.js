import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class SceneInit {
  constructor(canvasId, canvasEl) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.canvasEl = canvasEl;

    // NOTE: Additional components.
    this.clock = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    const canvasEL = document.getElementById(this.canvasEl);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      canvasEL.offsetWidth / canvasEL.offsetHeight,
      1,
      1000
    );
    this.camera.position.z = 48;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
      alpha: true,
    });

    this.renderer.setClearColor(0x000000, 0); // the default
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
    // document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    const myArray = window.location.href.split(" ");
    if (myArray.at(-1) === "/") {
      // if window resizes
      window.addEventListener("resize", () => this.onWindowResize(), false);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const canvasEL = document.getElementById(this.canvasEl);
    this.camera.aspect = canvasEL.offsetWidth / canvasEL.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
  }
}

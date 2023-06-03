/* global THREE */
import { Skybox } from './skybox';

export class SceneManager {
  constructor () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    this.renderer = new THREE.WebGLRenderer();
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.render = this.render.bind(this);
    this.eventListeners = [];
  }

  init () {
    this.initCamera();
    this.createAmbientLight();
    this.initRenderer();
    this.scene.background = new Skybox().createReflectionCube();
    this.scene.add(this.createOrbitControls());
  }

  initRenderer () {
    this.renderer.setClearColor(0xffffff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  initCamera () {
    this.camera.lookAt(0, 200, 0);
    this.camera.position.set(1000, 500, 1000);
  }

  createOrbitControls () {
    const orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    orbit.update();
    orbit.addEventListener('change', this.render);
    const control = new THREE.TransformControls(this.camera, this.renderer.domElement);
    const changeListener = this.render;
    const draggingChangeListener = event => {
      orbit.enabled = !event.value;
    };
    control.addEventListener('change', changeListener);
    control.addEventListener('dragging-changed', draggingChangeListener);

    this.eventListeners.push({ name: 'change', cb: changeListener });
    this.eventListeners.push({ name: 'dragging-changed', cb: draggingChangeListener });

    return control;
  }

  createAmbientLight () {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);
  }

  onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  animate () {
    // eslint-disable-next-line no-undef
    requestAnimationFrame(this.animate);
  }

  render () {
    this.renderer.render(this.scene, this.camera);
  }

  onDestroy() {
    this.eventListeners.forEach(listener => {
      removeEventListener(listener.name, listener.cb);
    });
  }
}

/* global THREE */
import { Skybox } from './Skybox';
import { SpaceObjects } from './SpaceObjects';
import { Planet } from './Planet';
import { SpacePhysic } from './SpacePhysic';

export class SceneManager {
  constructor () {
    this.scene = new THREE.Scene();
    // vertical_field_of_view, aspect_ratio, near, far
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.spaceObjects = new SpaceObjects();
    this.physic = new SpacePhysic();
    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.render = this.render.bind(this);
  }

  init () {
    this.initCamera();
    this.createAmbientLight();
    this.initRenderer();
    this.scene.background = new Skybox().createReflectionCube();
    this.scene.add(this.createOrbitControls());
    this.generatePlanet();
    this.generateSpaceObjects();
  }

  generateSpaceObjects () {
    for (let i = 0; i < 10; i++) {
      const position = {
        x: Math.random() * 10000 - 5000,
        y: Math.random() * 10000 - 5000,
        z: Math.random() * 10000 - 5000
      };
      const scaleUnit = Math.random();
      const scale = scaleUnit > 0.5 ? scaleUnit * 400 : scaleUnit * 600;
      const mesh = this.spaceObjects.createMoon(position, scale);
      this.physic.createMoonPhysic(position, scale, mesh);
      this.scene.add(mesh);
    }
  }

  generatePlanet () {
    this.scene.add(new Planet().getPlanet());
    this.physic.createPlanetPhysic();
  }

  initRenderer () {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  initCamera () {
    this.camera.position.set(1000, 3200, 1000);
  }

  createOrbitControls () {
    const orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    orbit.update();
    orbit.addEventListener('change', this.render);
    const control = new THREE.TransformControls(this.camera, this.renderer.domElement);
    control.addEventListener('change', this.render);
    control.addEventListener('dragging-changed', event => {
      orbit.enabled = !event.value;
    });
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
    this.render();
  }

  render () {
    this.renderer.render(this.scene, this.camera);
    this.physic.render();
  }
}

/* global THREE */

export class Skybox {
  constructor () {
    this.skyboxImages = [
      '/assets/images/left.jpg',
      '/assets/images/right.jpg',
      '/assets/images/top.jpg',
      '/assets/images/bottom.jpg',
      '/assets/images/front.jpg',
      '/assets/images/back.jpg'
    ];
  }

  createReflectionCube () {
    const reflectionCube = new THREE.CubeTextureLoader().load(this.skyboxImages);
    reflectionCube.format = THREE.RGBFormat;
    return reflectionCube;
  }
}

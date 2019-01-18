/* global THREE */

export class Planet {
  constructor () {
    this.geometry = new THREE.SphereBufferGeometry(500, 32, 16);
    const texture = new THREE.TextureLoader().load('/assets/images/2k_mars.jpg');
    this.material = new THREE.MeshBasicMaterial({ map: texture });
  }

  createPlanet () {
    this.planet = new THREE.Mesh(this.geometry, this.material);
    this.planet.position.x = 0;
    this.planet.position.y = 0;
    this.planet.position.z = 0;
    this.planet.quaternions = true;
  }

  getPlanet () {
    !this.planet && this.createPlanet();
    return this.planet;
  }
}

/* global THREE */

export class Planet {
  constructor () {
    this.geometry = new THREE.SphereBufferGeometry(100, 32, 16);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  }

  createPlanet () {
    this.planet = new THREE.Mesh(this.geometry, this.material);
    this.planet.position.x = 0;
    this.planet.position.y = 0;
    this.planet.position.z = 0;
    this.planet.scale.x = this.planet.scale.y = this.planet.scale.z = 3.5;
    this.planet.quaternions = true;
  }

  getPlanet () {
    !this.planet && this.createPlanet();
    return this.planet;
  }
}

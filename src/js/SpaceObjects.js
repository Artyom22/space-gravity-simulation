/* global THREE */

export class SpaceObjects {
  constructor () {
    this.geometry = new THREE.SphereBufferGeometry(100, 32, 16);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  }

  createSphere (position, scale) {
    var mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.x = 15; // position.x;
    mesh.position.y = 0; // position.y;
    mesh.position.z = 0; // position.z;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.5;
    mesh.quaternions = true;
    return mesh;
  }
}

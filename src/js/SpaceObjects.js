/* global THREE */

export class SpaceObjects {
  createSphere (position, scale) {
    const geometry = new THREE.SphereBufferGeometry(scale, 32, 16);
    console.log(this.getRandomTexture());
    const texture = new THREE.TextureLoader().load(this.getRandomTexture());
    const material = new THREE.MeshBasicMaterial({ map: texture, color: this.getRandomColor() });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    // mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
    mesh.quaternions = true;
    return mesh;
  }

  getRandomTexture () {
    const textures = [
      '/assets/images/asteroids/1.jpg',
      '/assets/images/asteroids/2.jpg'
    ];
    const rundomIndex = Math.floor(Math.random() * textures.length);
    console.log(rundomIndex);
    return textures[rundomIndex];
  }

  getRandomColor () {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
}

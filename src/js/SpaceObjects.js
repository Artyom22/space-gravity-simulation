/* global THREE */

export class SpaceObjects {
  createMoon (position, scale) {
    const geometry = new THREE.SphereBufferGeometry(scale, 32, 16);
    const texture = new THREE.TextureLoader().load(this.getRandomTexture());
    const material = new THREE.MeshBasicMaterial({ map: texture, color: this.getRandomColor() });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    mesh.quaternions = true; // in mathematics, the quaternions are a number system that extends the complex numbers.
    return mesh;
  }

  getRandomTexture () {
    const textures = [
      '/assets/images/asteroids/1.jpg',
      '/assets/images/asteroids/2.jpg'
    ];
    const rundomIndex = Math.floor(Math.random() * textures.length);
    return textures[rundomIndex];
  }

  getRandomColor () {
    const letters = 'BCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
}

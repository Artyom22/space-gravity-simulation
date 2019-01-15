/* global THREE, CANNON */

export class SpaceObjects {
  constructor () {
    this.spheres = [];
    this.planet = undefined;
    this.geometry = new THREE.SphereBufferGeometry(100, 32, 16);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.physicWorld = new CANNON.World();
    this.mesh = undefined;
    this.moon = undefined;
    // this.physicWorld.broadphase = new CANNON.NaiveBroadphase();
  }

  createSphere (position, scale) {
    var mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.x = 5//position.x;
    mesh.position.y = 0//position.y;
    mesh.position.z = 0//position.z;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.5;
    mesh.quaternions = true;
    this.mesh = mesh;
    return mesh;
  }

  createSpherePhysic (position, scale) {
    var mass = 5;
    var moonShape = new CANNON.Sphere(0.5);
    var moon = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(position.x, position.z, position.z)
    });
    moon.addShape(moonShape);
    moon.velocity.set(0, 0, 80);
    moon.linearDamping = 0.0;
    // Use the preStep callback to apply the gravity force on the moon.
    // This callback is evoked each timestep.
    moon.preStep = function () {
      // Get the vector pointing from the moon to the planet center
      const moonToPlanet = new CANNON.Vec3();
      this.position.negate(moonToPlanet);
      // Get distance from planet to moon
      const distance = moonToPlanet.norm();
      // Now apply force on moon
      // Fore is pointing in the moon-planet direction
      moonToPlanet.normalize();
      moonToPlanet.mult(1500 / Math.pow(distance, 2), this.force);
    };
    this.moon = moon;
    // We add the objects to the world to simulate them
    this.physicWorld.addBody(moon);
  }

  createPlanet () {
    this.planet = new THREE.Mesh(this.geometry, this.material);
    this.planet.position.x = 0;
    this.planet.position.y = 0;
    this.planet.position.z = 0;
    this.planet.scale.x = this.planet.scale.y = this.planet.scale.z = 3.5;
    this.planet.quaternions = true;
    return this.planet;
  }

  createPlanetPhysic () {
    var planetShape = new CANNON.Sphere(3.5);
    var planet = new CANNON.Body({ mass: 0 });
    planet.addShape(planetShape);
    this.physicWorld.addBody(planet);
  }

  render () {
    this.physicWorld.step(1 / 60);
    this.mesh.position.copy(this.moon.position);
  }
}

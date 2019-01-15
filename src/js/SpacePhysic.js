/* global CANNON */

export class SpacePhysic {
  constructor () {
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.gravity.set(0, 0, 0);
    this.world.solver.iterations = 20;
    this.planet = undefined;
  }

  createSpherePhysic (position, scale, mesh) {
    var mass = 5;
    var moonShape = new CANNON.Sphere(0.5);
    const density = 0.1; // kg/m^3
    mass = density * moonShape.volume();
    var moon = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(position.x, position.z, position.z)
    });
    moon.addShape(moonShape);
    moon.velocity.set(0, 0, 10);
    moon.linearDamping = 0.0;
    moon.linearDamping = moon.angularDamping = 0.5;
    // Use the preStep callback to apply the gravity force on the moon.
    // This callback is evoked each timestep.
    moon.preStep = () => {
      // Get the vector pointing from the moon to the planet center
      // const moonToPlanet = new CANNON.Vec3(this.planet.position - moon.position);
      // moon.position.negate(moonToPlanet);
      // Get distance from planet to moon
      // const distance = moonToPlanet.norm();
      // Now apply force on moon
      // Fore is pointing in the moon-planet direction
      // moonToPlanet.normalize();
      moon.force.set(-moon.position.x, -moon.position.y, -moon.position.z);
      console.log(moon.force);
      // moonToPlanet.mult(1500 / Math.pow(distance, 2), moon.force);
      mesh.position.copy(moon.position);
      mesh.quaternion.copy(moon.quaternion);
    };
    // We add the objects to the world to simulate them
    this.world.addBody(moon);
  }

  createPlanetPhysic () {
    var planetShape = new CANNON.Sphere(3.5);
    this.planet = new CANNON.Body({ mass: 0 });
    this.planet.addShape(planetShape);
    this.world.addBody(this.planet);
  }

  render () {
    this.world.step(1 / 60);
  }
}

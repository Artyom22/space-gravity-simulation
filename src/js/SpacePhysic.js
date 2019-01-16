/* global CANNON */

export class SpacePhysic {
  constructor () {
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.gravity.set(0, 0, 0);
    this.world.solver.iterations = 20;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e6; // Contact stiffness - use to make softer/harder contacts
    this.world.defaultContactMaterial.contactEquationRelaxation = 10;
    this.planet = undefined;
    this.G = 667.4;

    this.stone = new CANNON.Material('stone');
    const stoneContact = new CANNON.ContactMaterial(this.stone, this.stone, {
      friction: 0.3,
      restitution: 0.2
    });
    this.world.addContactMaterial(stoneContact);
  }

  createSpherePhysic (position, scale, mesh) {
    var moonShape = new CANNON.Sphere(scale);
    const density = 0.1; // kg/m^3
    const mass = density * moonShape.volume() * 100;
    var moon = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(position.x, position.y, position.z)
    });
    moon.addShape(moonShape);
    moon.velocity.set(0, 0, 1500);
    moon.linearDamping = 0;
    moon.angularDamping = 1;
    // Use the preStep callback to apply the gravity force on the moon.
    // This callback is evoked each timestep.
    moon.preStep = () => {
      // Get the vector pointing from the moon to the planet center
      const moonToPlanet = new CANNON.Vec3();
      moon.position.negate(moonToPlanet);
      // Get distance from planet to moon
      const distance = moonToPlanet.norm();
      // Now apply force on moon
      // Fore is pointing in the moon-planet direction
      moonToPlanet.normalize();
      // const direction = moon.position.norm(this.planet.poition);
      const force = this.G * (moon.mass * this.planet.mass) / Math.pow(distance, 2);
      moonToPlanet.mult(force * distance, moon.force);
      mesh.position.copy(moon.position);
      mesh.quaternion.copy(moon.quaternion);
    };
    // We add the objects to the world to simulate them
    this.world.addBody(moon);
  }

  createPlanetPhysic () {
    const planetShape = new CANNON.Sphere(500);
    this.planet = new CANNON.Body({ mass: 10000 });
    this.planet.addShape(planetShape);
    this.world.addBody(this.planet);
  }

  render () {
    this.world.step(1 / 60);
  }
}

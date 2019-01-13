var camera, scene, renderer;
var geometry, material, mesh;
var control, orbit;

init();
animate();

function init() {
// requestAnimationFrame(animate);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
  camera.lookAt( 0, 200, 0 );
  camera.position.set( 1000, 500, 1000 );
    scene = new THREE.Scene();

    // cube
    var cube = new THREE.CubeGeometry(200, 200, 200);

    
    var cubeMaterials = [
      // back side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/top.jpg'),
        side: THREE.DoubleSide
      }),
      // front side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/bottom.jpg'),
        side: THREE.DoubleSide
      }), 
      // Top side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/left.jpg'),
        side: THREE.DoubleSide
      }), 
      // Bottom side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/right.jpg'),
        side: THREE.DoubleSide
      }), 
      // right side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/front.jpg'),
        side: THREE.DoubleSide
      }), 
      // left side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/images/back.jpg'),
        side: THREE.DoubleSide
      }) 
    ];

    //add cube & materials
    // var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var mesh = new THREE.Mesh(cube, cubeMaterials);
    scene.add(mesh);

    //add light
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    // scene.add(controls.object);

    //add mesh
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.update();
    orbit.addEventListener( 'change', render );
    control = new THREE.TransformControls( camera, renderer.domElement );
    control.addEventListener( 'change', render );
    control.addEventListener( 'dragging-changed', function ( event ) {
      orbit.enabled = ! event.value;
    } );

    scene.add(control);
        //mouse movement
        
  } //end init() 

  //resize window
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  //render
  function animate() {
    requestAnimationFrame(animate);
    //control.update();
  }

  function render() {
    renderer.render( scene, camera );
  }


  
    // Add objects to the scene
    /* geometry = new THREE.BoxGeometry( 20, 20, 20 );
    for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
      var face = geometry.faces[ i ];
      face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    }
    for ( var i = 0; i < 500; i ++ ) {
      material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
      mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
      mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
      scene.add( mesh );
      material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      objects.push( mesh );
    } */

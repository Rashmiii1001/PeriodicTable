var material, material1, material2, material3, material4, material5, material_o;
var materiall1, materiall2, materiall3, materiall4, materiall5, material_o;
var hydrogen, helium, boron, lithium, beryllium;
var sphere, sphere1, sphere2, sphere3, sphere4, sphere5;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer({antialias : true});
var controls = new THREE.OrbitControls(camera,renderer.domElement);


//resize
function onWindowResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);


//init
function init() {

   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   controls.addEventListener('change',render);

   // Hydrogen
   const geometry1 = new THREE.BoxGeometry( 5, 5, 5 );
   let texture1 = new THREE.TextureLoader().load('hydrogen.jpg');
   material1 = new THREE.MeshBasicMaterial( {map:texture1} );
   material1.side = THREE.DoubleSide;
   hydrogen = new THREE.Mesh( geometry1, material1 );
   hydrogen.position.set(-20,20,0);
   scene.add( hydrogen );

   //Helium
   const geometry2 = new THREE.BoxGeometry( 5, 5, 5 );
   let texture2 = new THREE.TextureLoader().load('helium.jpg');
   material2 = new THREE.MeshBasicMaterial( {map:texture2} );
   material2.side = THREE.DoubleSide;
   helium = new THREE.Mesh( geometry2, material2 );
   helium.position.set(0,20,0);
   scene.add( helium );

   //lithium
   const geometry3 = new THREE.BoxGeometry( 5, 5, 5 );
   let texture3 = new THREE.TextureLoader().load('lithium.jpg');
   material3 = new THREE.MeshBasicMaterial( {map:texture3} );
   material3.side = THREE.DoubleSide;
   lithium = new THREE.Mesh( geometry3, material3 );
   lithium.position.set(-20,15,0);
   scene.add( lithium );

   //beryllium
   const geometry4 = new THREE.BoxGeometry( 5, 5, 5 );
   let texture4 = new THREE.TextureLoader().load('beryllium.jpg');
   material4 = new THREE.MeshBasicMaterial( {map:texture4} );
   material4.side = THREE.DoubleSide;
   beryllium = new THREE.Mesh( geometry4, material4 );
   beryllium.position.set(-15,15,0);
   scene.add( beryllium );

   //boron
   const geometry5 = new THREE.BoxGeometry( 5, 5, 5 );
   let texture5 = new THREE.TextureLoader().load('boron.jpg');
   material5 = new THREE.MeshBasicMaterial( {map:texture5} );
   material2.side = THREE.DoubleSide;
   boron = new THREE.Mesh( geometry5, material5 );
   boron.position.set(-5,15,0);
   scene.add( boron );

   camera.position.z = 30;
   camera.position.x = -5;
   camera.position.y = 25;
   // camera.position.z = 300;
   // camera.lookAt(0,0,0);
}


//create shape
var geometryy = new THREE.SphereGeometry(4,30,10);
materiall = new THREE.MeshBasicMaterial({color: 0xFFFF00});
sphere = new THREE.Mesh(geometryy, materiall);


//create shape1
var geometryy1 = new THREE.SphereGeometry(2,30,10);
materiall1 = new THREE.MeshBasicMaterial({color: 0xFF0000});
sphere1 = new THREE.Mesh(geometryy1, materiall1);

sphere1.position.z += 15;
sphere1.position.y += 0;


//create shape2
var geometryy2 = new THREE.SphereGeometry(2,30,10);
materiall2 = new THREE.MeshBasicMaterial({color: 0xFF0000});
sphere2 = new THREE.Mesh(geometryy2, materiall2);

sphere2.position.z += 15;
sphere2.position.y -= 0;


//create shape3
var geometryy3 = new THREE.SphereGeometry(2,30,10);
materiall3 = new THREE.MeshBasicMaterial({color: 0xFF0000});
sphere3 = new THREE.Mesh(geometryy3, materiall3);

sphere3.position.z += 30;
sphere3.position.y += 0;


//create shape4
var geometryy4 = new THREE.SphereGeometry(2,30,10);
materiall4 = new THREE.MeshBasicMaterial({color: 0xFF0000});
sphere4 = new THREE.Mesh(geometryy4, materiall4);

sphere4.position.z -= 30;
sphere4.position.y += 0;


//create shape5
var geometryy5 = new THREE.SphereGeometry(2,30,10);
materiall5 = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
sphere5 = new THREE.Mesh(geometryy5, materiall5);

sphere5.position.z -= 30;
sphere5.position.y -= 0;


// Orbits
var orbits = function(name, radius, delta){
  var theta =0;
  var diff = 2*Math.PI/1000;
  material_o = new THREE.LineBasicMaterial ();
  var geometry_o = new THREE.Geometry();
  for (theta; theta<= 2 * Math.PI; theta+=diff){
      geometry_o.vertices.push(new THREE.Vector3(radius * Math.cos(theta) , 0, radius * Math.sin(theta)));
  }
  var orbit = new THREE.Line(geometry_o, material_o);
  scene.add(orbit);
}


//Helium
var renderHe = function()
{
  orbits(sphere, 15, 100);

  scene.add(sphere);
  scene.add(sphere1);
  scene.add(sphere2);

  theta += dtheta;

  sphere1.position.z = r*Math.sin(theta);
  sphere1.position.x = r*Math.cos(theta);

  sphere2.position.x = r*Math.cos(theta+180);
  sphere2.position.z = r*Math.sin(theta+180);

  // requestAnimationFrame(renderHe);
  // renderer.render(scene, camera);
};


//raycasting
var r = 15;
var theta = 0;
var dtheta = 2*Math.PI/1000;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {
 mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
 mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener('click', onMouseMove, false);


function animate() {
  // console.log(scene.children);
 requestAnimationFrame(animate);
 //Using raycasting to select the object
 raycaster.setFromCamera (mouse, camera);
 const intersects = raycaster.intersectObjects (scene.children);

 // console.log(intersects);
 if (intersects[0]){

     // console.log(intersects[0].object.geometry.id);
     switch(intersects[0].object.geometry.id){
      case 18:
        console.log("Boron");
        break;
         }
       }

 // else if(intersects[0]){
 //           // console.log(intersects[0].object.geometry.id);
 //     switch(intersects[0].object.geometry.id){
 //      case 14:{
 //        renderHe();
 //        console.log("Rendering 14...");  //guess-helium
 //        break;
 //      }
 //      case 16:{
 //        console.log("Rendering 16..."); //near helium, guess- lithium, new - boron
 //        break;
 //      }
 //      case 22:{
 //        console.log("Rendering 22...");
 //        break;
 //      }
 //      case 18:
 //        console.log("Boron");
 //        break;
 //      }
 //    }
 renderer.render(scene, camera);
}
renderer.render(scene, camera);

 init();
 animate();

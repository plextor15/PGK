const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// var ambiencik = new THREE.AmbientLight(0xdddddd);
// scene.add(ambiencik);

//Ship
const loader = new THREE.ObjectLoader();
loader.load(
	//"model.json",
	"shipek.json",
	function ( obj ) {
		obj.castShadow = true;
		obj.receiveShadow = true;
		obj.position.y = 2;
		obj.rotation.y = Math.PI;
		scene.add( obj );
	},
	//function ( xhr ) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
	//function ( err ) {console.error( 'An error happened' );}
);


//podloga
const podloga_mesh = new THREE.PlaneGeometry(120,120,30,30);
const podloga_mat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const podloga = new THREE.Mesh(podloga_mesh, podloga_mat);
podloga.receiveShadow = true;
scene.add(podloga);
podloga.rotation.x = -Math.PI/2;

//wiatraczek
const biel_mesh = new THREE.CylinderGeometry(6.27, 6.27, 1, 20);
const biel_mat = new THREE.MeshBasicMaterial({color: 0xffffff});
biel_mat.side = THREE.BackSide;
const smiglo_mesh = new THREE.BoxGeometry();
const srodek_mesh = new THREE.CylinderGeometry(1,1,1,8,1,);
const czern = new THREE.MeshBasicMaterial({color: 0x000000});

const biel = new THREE.Mesh(biel_mesh, biel_mat);
const srodek = new THREE.Mesh(srodek_mesh, czern);
const smiglo_1 = new THREE.Mesh(smiglo_mesh, czern);
const smiglo_2 = new THREE.Mesh(smiglo_mesh, czern);
const smiglo_3 = new THREE.Mesh(smiglo_mesh, czern);
const smiglo_4 = new THREE.Mesh(smiglo_mesh, czern);

srodek.castShadow = true;
smiglo_1.castShadow = true;
smiglo_2.castShadow = true;
smiglo_3.castShadow = true;
smiglo_4.castShadow = true;

const grupa = new THREE.Group();
grupa.add(biel);
grupa.add(srodek);
grupa.add(smiglo_1);
grupa.add(smiglo_2);
grupa.add(smiglo_3);
grupa.add(smiglo_4);

smiglo_1.scale.x = 5,357;
smiglo_2.scale.x = 5,357;
smiglo_3.scale.x = 5,357;
smiglo_4.scale.x = 5,357;

smiglo_1.position.x = -3.16;
smiglo_2.position.x = 3.16;
smiglo_3.position.z = -3.16;
smiglo_4.position.z = 3.16;

smiglo_3.rotation.y = Math.PI/2;
smiglo_4.rotation.y = Math.PI/2;

grupa.rotation = new THREE.Vector3(-90,0,-180);
grupa.position = new THREE.Vector3(1,6,-57.129);
scene.add(grupa);
grupa.rotation.x = Math.PI/2;
grupa.position.set(1, 5.95, 60);

//swiatlo do wiatraczka
const swiatloWiatraczka = new THREE.SpotLight(0xffffff, 1.72, 0, 0.154, 0.35, 1);
swiatloWiatraczka.position.set(1.11, 10, 93.78);
swiatloWiatraczka.castShadow = true;
// swiatloWiatraczka.penumbra = 0.35;
// swiatloWiatraczka.angle = 0.154;

swiatloWiatraczka.shadow.mapSize.width = 1024;
swiatloWiatraczka.shadow.mapSize.height = 1024;
swiatloWiatraczka.shadow.camera.near = 0.5;
swiatloWiatraczka.shadow.camera.far = 500;
swiatloWiatraczka.shadow.focus = 1;

scene.add(swiatloWiatraczka);


//tylna sciana
const sciana_mesh = new THREE.PlaneGeometry(120,120,30,30);
const sciana_mat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
sciana_mat.side = THREE.FrontSide;
const sciana = new THREE.Mesh(sciana_mesh, sciana_mat);
sciana.receiveShadow = true;
sciana.position.z = -57;
scene.add(sciana);


//boczna sciana
const boczna = new THREE.Mesh(sciana_mesh, sciana_mat);
boczna.receiveShadow = true;
boczna.position.x = -50;
boczna.rotation.y = Math.PI/2;
scene.add(boczna);


//swiatla boczne
const swiatloZielone = new THREE.SpotLight(0x00ff00, 1.16, 0, 0.314, 0.85, 1);
const swiatloNiebieskie = new THREE.SpotLight(0x0000ff, 1.16, 0, 0.314, 0.85, 1);
swiatloZielone.castShadow = true;
swiatloNiebieskie.castShadow = true;

swiatloZielone.shadow.mapSize.width = 512;
swiatloZielone.shadow.mapSize.height = 512;
swiatloZielone.shadow.camera.near = 0.5;
swiatloZielone.shadow.camera.far = 200;
swiatloZielone.shadow.focus = 1;

swiatloNiebieskie.shadow.mapSize.width = 512;
swiatloNiebieskie.shadow.mapSize.height = 512;
swiatloNiebieskie.shadow.camera.near = 0.5;
swiatloNiebieskie.shadow.camera.far = 200;
swiatloNiebieskie.shadow.focus = 1;

swiatloZielone.position.set(-31.2, 32.69, -34.83);
swiatloNiebieskie.position.set(41.17, 20.03, 8.84);
scene.add(swiatloZielone);
scene.add(swiatloNiebieskie);


//kostka
const kosteczka = new THREE.Group();
const kostka_mesh = new THREE.BoxGeometry();
const kostka_mat = new THREE.MeshBasicMaterial({color: 0xee2222});
const kostka = new THREE.Mesh(kostka_mesh, kostka_mat);

const tup = new THREE.Mesh(kostka_mesh, kostka_mat);
tup.visible = false;
tup.position.set(0,0,5);
const tdown = new THREE.Mesh(kostka_mesh, kostka_mat);
tdown.visible = false;
tdown.position.set(0,0,-5);
const tleft = new THREE.Mesh(kostka_mesh, kostka_mat);
tleft.visible = false;
tleft.position.set(0,5,0);
const tright = new THREE.Mesh(kostka_mesh, kostka_mat);
tright.visible = false;
tright.position.set(0,-5,0);

const lup = new THREE.SpotLight(0xff0000, 0.6, 0, 0.64, 1, 1);
lup.position.set(0,0,2);
const ldown = new THREE.SpotLight(0xff0000, 0.6, 0, 0.64, 1, 1);
ldown.position.set(0,0,-2);
const lleft = new THREE.SpotLight(0xff0000, 0.6, 0, 0.64, 1, 1);
lleft.position.set(0,2,0);
const lright = new THREE.SpotLight(0xff0000, 0.6, 0, 0.64, 1, 1);
lright.position.set(0,-2,0);

kosteczka.add(kostka);
kosteczka.add(tup);
kosteczka.add(tdown);
kosteczka.add(tleft);
kosteczka.add(tright);
kosteczka.add(lup);
kosteczka.add(ldown);
kosteczka.add(lleft);
kosteczka.add(lright);

scene.add(kosteczka);

lup.target = tup;
ldown.target = tdown;
lleft.target = tleft;
lright.target = tright;

kosteczka.position.set(-45,50,-45);
kosteczka.rotation.z = Math.PI/2;


camera.position.z = 15;
camera.position.y = 8;

const animate = function () {
  requestAnimationFrame( animate );

	grupa.rotation.y += 0.017;
	kosteczka.rotation.y += 0.04;

	controls.update();
	renderer.render( scene, camera );
};
animate();

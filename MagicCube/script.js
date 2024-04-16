import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

// set up
const renderer = new THREE.WebGLRenderer();
// renderer.shadowMap.enabled = true;

renderer.setSize(
    window.innerWidth,
    window.innerHeight
)
document.body.appendChild(renderer.domElement)

// set view camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    .1,
    1000
);

/**
 * AMBIENT LIGHT
 */
const ambientLight = new THREE.AmbientLight(0x333333, 20)
scene.add(ambientLight);

// /**
//  * SPOTLIGHT
//  */
const spotLight = new THREE.SpotLight(0xffffff, 100000)
spotLight.position.set(-100, 100,0);
spotLight.castShadow = true;
spotLight.angle = 0.2;
scene.add(spotLight);

/**
 * FOG
 */
scene.fog = new THREE.Fog(0xffffff, 0, 200)
const textureLoader = new THREE.TextureLoader()

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(1,1,10)
controls.update();

const spacing = 0.3
//
const boxGeometry = new THREE.BoxGeometry(2, 2, 2, 2);
const boxMaterial = new THREE.MeshStandardMaterial({color: 'red'});
const box1 = new THREE.Mesh(boxGeometry, boxMaterial);
const box2 = new THREE.Mesh(boxGeometry, boxMaterial);
const box3 = new THREE.Mesh(boxGeometry, boxMaterial);
const box4 = new THREE.Mesh(boxGeometry, boxMaterial);
const box5 = new THREE.Mesh(boxGeometry, boxMaterial);
const box6 = new THREE.Mesh(boxGeometry, boxMaterial);
const box7 = new THREE.Mesh(boxGeometry, boxMaterial);
const box8 = new THREE.Mesh(boxGeometry, boxMaterial);
const box9 = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box1);
scene.add(box2);
scene.add(box3);

scene.add(box4);
scene.add(box5);
scene.add(box6);

scene.add(box7);
scene.add(box8);
scene.add(box9);

box1.position.set(0, 0, 0);
box2.position.set(spacing + 2, 0, 0);
box3.position.set((spacing*2) + 4, 0, 0);

box4.position.set(0, spacing + 2, 0);
box5.position.set(spacing + 2, spacing + 2, 0);
box6.position.set((spacing*2) + 4, spacing + 2, 0);

box7.position.set(0, (spacing *2) + 4, 0);
box8.position.set(spacing + 2, (spacing *2) + 4, 0);
box9.position.set((spacing*2) + 4, (spacing *2) + 4, 0);

/**
 *
 */
const boxGeometry2 = new THREE.BoxGeometry(2, 2, 2, 2);
const boxMaterial2 = new THREE.MeshStandardMaterial({color: 'blue'});
const boxII1 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII3 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII4 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII5 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII6 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII7 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII8 = new THREE.Mesh(boxGeometry2, boxMaterial2);
const boxII9 = new THREE.Mesh(boxGeometry2, boxMaterial2);

scene.add(boxII1);
scene.add(boxII2);
scene.add(boxII3);

scene.add(boxII4);
scene.add(boxII5);
scene.add(boxII6);

scene.add(boxII7);
scene.add(boxII8);
scene.add(boxII9);

boxII1.position.set(0, 0, 2 + spacing);
boxII2.position.set(spacing + 2, 0, 2 + spacing);
boxII3.position.set((spacing*2) + 4, 0, 2 + spacing);

boxII4.position.set(0, spacing + 2, 2 + spacing);
boxII5.position.set(spacing + 2, spacing + 2, 2 + spacing);
boxII6.position.set((spacing*2) + 4, spacing + 2, 2 + spacing);

boxII7.position.set(0, (spacing *2) + 4, 2 + spacing);
boxII8.position.set(spacing + 2, (spacing *2) + 4, 2 + spacing);
boxII9.position.set((spacing*2) + 4, (spacing *2) + 4, 2 + spacing);

/**
 *
 */
const boxGeometry3 = new THREE.BoxGeometry(2, 2, 2, 2);
const boxMaterial3 = new THREE.MeshStandardMaterial({color: 'green'});
const boxIII1 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII2 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII3 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII4 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII5 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII6 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII7 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII8 = new THREE.Mesh(boxGeometry3, boxMaterial3);
const boxIII9 = new THREE.Mesh(boxGeometry3, boxMaterial3);

scene.add(boxIII1);
scene.add(boxIII2);
scene.add(boxIII3);

scene.add(boxIII4);
scene.add(boxIII5);
scene.add(boxIII6);

scene.add(boxIII7);
scene.add(boxIII8);
scene.add(boxIII9);

boxIII1.position.set(0, 0, 4 + (spacing * 2));
boxIII2.position.set(spacing + 2, 0, 4 + (spacing * 2));
boxIII3.position.set((spacing*2) + 4, 0, 4 + (spacing * 2));

boxIII4.position.set(0, spacing + 2, 4 + (spacing * 2));
boxIII5.position.set(spacing + 2, spacing + 2, 4 + (spacing * 2));
boxIII6.position.set((spacing*2) + 4, spacing + 2, 4 + (spacing * 2));

boxIII7.position.set(0, (spacing *2) + 4, 4 + (spacing * 2));
boxIII8.position.set(spacing + 2, (spacing *2) + 4, 4 + (spacing * 2));
boxIII9.position.set((spacing*2) + 4, (spacing *2) + 4, 4 + (spacing * 2));

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, this.window.innerHeight)
});

// animation
function animate(time) {
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)
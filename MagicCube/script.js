import * as THREE from 'three'
import RenderCube from './cubeRender'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as GUI from 'dat.gui'


// set up
const gui = new GUI.GUI();
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

camera.position.set(5,3,18)
controls.update();
const renderCube = new RenderCube(scene, gui, camera);
const {axesPurple, axesYellow, axesBrown} = renderCube.render()

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, this.window.innerHeight)
});

renderer.setClearColor( 0x000000, 0 );

// animation
function animate(time) {
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)
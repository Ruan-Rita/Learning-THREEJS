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
const renderCube = new RenderCube(scene, gui);
const {axesPurple, axesYellow} = renderCube.render()

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, this.window.innerHeight)
});

renderer.setClearColor( 0x000000, 0 );

const options = {
    'YellowRotation': false,
    'PurpleRotation': false,
}
let speedYellow = 0

gui.add(options,'YellowRotation').onChange(value => {
    if (value) {
        speedYellow = -0.0015
    } else {
        speedYellow = 0
        const euler = new THREE.Euler(0,0,0)
        axesYellow.setRotationFromEuler(euler)
    }
});
let speedPurple = 0
gui.add(options,'PurpleRotation').onChange(value => {
    if (value) {
        speedPurple = 0.0015
    } else {
        speedPurple = 0
        const euler = new THREE.Euler(0,0,0)
        axesPurple.setRotationFromEuler(euler)
    }
});

// animation
function animate(time) {
    renderer.render(scene, camera)
    axesPurple.rotateX(speedPurple)
    axesYellow.rotateX(speedYellow)
}
renderer.setAnimationLoop(animate)
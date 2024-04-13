import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as GUI from 'dat.gui'
import nebula from  './image/astronaut.png'
import stars from  './image/astronaut.png'

// set up
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

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
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight);

/**
 * DIRECTIONAL LIGHT
 */
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;
// scene.add(directionalLight);
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

/**
 * SPOTLIGHT
 */
const spotLight = new THREE.SpotLight(0xffffff, 100000)
spotLight.position.set(-100, 100,0);
spotLight.castShadow = true;
spotLight.angle = 0.2;
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);
scene.add(spotLightHelper);

/**
 * FOG
 */
scene.fog = new THREE.Fog(0xffffff, 0, 200)
const textureLoader = new THREE.TextureLoader()
scene.background = textureLoader.load(stars)

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(1,1,10)
controls.update();

// create plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -.5 * Math.PI
scene.add(plane);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry();
const sphereGeometry2 = new THREE.SphereGeometry(3);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0230FF});

const sphere = new THREE.Mesh(sphereGeometry2, sphereMaterial)
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial)
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial)
const sphere4 = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(sphere)
scene.add(sphere2)
scene.add(sphere3)
scene.add(sphere4)

sphere.castShadow = true
sphere.position.x = -10
sphere2.position.x = 5
sphere3.position.z = -5
sphere4.position.z = 5

// interface setting
const gui = new GUI.GUI();
const options = {
    Sphere_Color: '#0000FF',
    Wireframe: false,
    Cube_Color: '#342311',
    Speed: 0.01
}
gui.addColor(options, 'Sphere_Color').onChange(eventSource => {
    sphere2.material.color.set(eventSource)
    sphere.material.color.set(eventSource)
})
gui.addColor(options, 'Cube_Color').onChange(eventSource => {
    box.material.color.set(eventSource)
})
gui.add(options, 'Speed', 0.01, .03)

gui.add(options, 'Wireframe').onChange(eventSource => {
    sphere.material.wireframe = eventSource
    sphere2.material.wireframe = eventSource
    sphere3.material.wireframe = eventSource
    sphere4.material.wireframe = eventSource
})

// create object
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 'cyan'})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.y = 1

scene.add(box);


// speed sphere
let step = 0;
let step2 = 1;
let step3 = 2;
let step4 = 3;

// animation
function animate(time) {
    box.rotation.x += time / 1000000
    box.rotation.y += time / 1000000

    step += options.Speed
    step2 += options.Speed
    step3 += options.Speed
    step4 += options.Speed
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    sphere2.position.y = 10 * Math.abs(Math.sin(step2))
    sphere3.position.y = 10 * Math.abs(Math.sin(step3))
    sphere4.position.y = 10 * Math.abs(Math.sin(step4))
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
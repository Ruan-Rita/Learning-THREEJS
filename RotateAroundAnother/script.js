import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import cubeBackground from  './image/quadrado.jpg'
import mercuryBackground from  './image/mercury.jpg'
import saturnBackground from  './image/saturn.jpg'
import saturnRingBackground from  './image/saturn_ring.jpg'

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
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    500
);

/**
 * AMBIENT LIGHT
 */
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight);

/**
 * Point of Light
 */
const pointLight = new THREE.PointLight(0xffffff, 12000, 300);
scene.add(pointLight)

/**
 * FOG
 */
// scene.fog = new THREE.Fog(0xffffff, 0, 200)
const textureLoader = new THREE.TextureLoader()

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.set(-90,140,140)
controls.update();

const sunGeo = new THREE.SphereGeometry(16,30,30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(cubeBackground)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun)
// mercury
const mercury = createPlanet(3.2, mercuryBackground, 28)
const saturn = createPlanet(10, saturnBackground, 138)
const venus = createPlanet(4, saturnBackground, 48)
const earth = createPlanet(5, saturnBackground, 78)

// saturn ring
const saturnRingGeo = new THREE.RingGeometry(14,20,32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingBackground),
    side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.position.x = 138;
saturnRing.rotateX(10);
saturn.obj.add(saturnRing)

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, this.window.innerHeight)
});
function createPlanet(size, texture, position) {
    const geo = new THREE.SphereGeometry(size,30,30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj)
    mesh.position.x = position;
    return {mesh, obj}
}
venus.obj.rotateY(0.5)
earth.obj.rotateY(0.8)
mercury.obj.rotateY(0.2)
saturn.obj.rotateY(1.2)

// animation
function animate(time) {
    sun.rotateY(0.004)
    mercury.obj.rotateY(0.001)
    mercury.mesh.rotateY(0.001)

    earth.obj.rotateY(0.001)
    earth.mesh.rotateY(0.001)

    venus.obj.rotateY(0.001)
    venus.mesh.rotateY(0.001)

    saturn.obj.rotateY(0.001)
    saturn.mesh.rotateY(0.001)

    saturnRing.rotateX(.003);
    saturnRing.rotateZ(.003);
    saturnRing.rotateY(.003);

    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)
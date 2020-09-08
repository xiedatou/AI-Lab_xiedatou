import * as THREE from "./libs/three.module.js"
import {OrbitControls} from "./libs/OrbitControls.js";


let canvas, camera, controls, scene, renderer;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    canvas = document.getElementById("mainCanvas");

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    let geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
    let material = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true});

    for (let i = 0; i < 500; i++) {

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);

    }

    // lights

    let light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    let light2 = new THREE.DirectionalLight(0x002288);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    let light3 = new THREE.AmbientLight(0x222222);
    scene.add(light3);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    let canvas = document.getElementById("mainCanvas");
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

}

function animate() {

    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}
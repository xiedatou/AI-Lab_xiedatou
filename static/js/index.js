import * as THREE from "./libs/three.module.js"
import {OrbitControls} from "./libs/OrbitControls.js";
import {addConvLayer, addNeuralLayer, addPoolLayer} from "./nn/tensor.js";


let canvas, camera, controls, scene, renderer;

init();
// animate();
render();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    canvas = document.getElementById("mainCanvas");

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-50, 60, 100);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);

    controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.minDistance = 60;
    controls.maxDistance = 300;

    controls.maxPolarAngle = Math.PI / 2;

    //添加神经网络层
    addNeuralLayer(scene, 28, 28);

    //添加卷积层
    addConvLayer(scene, 3, 3, 1, 1, 15 );

    //添加池化层
    addPoolLayer(scene, 2, 2, 0, "max", 30);
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

    // controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}
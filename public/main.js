import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";

const div = document.createElement("div");
const input = document.createElement("input");
input.type = "file";
input.accept = ".pdf, .png, .jpg, .jpeg, .gif, .mp4";
input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) throw new Error("File not found")
    const formData = new FormData()
    formData.append("file", file)
    await Server.POSTFormData("videos", formData).then((response) => {
        console.log(response)
    })
}
div.appendChild(input)
document.body.appendChild(div)

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
scene.add(camera)

const animate = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate();

const loader = new GLTFLoader();
loader.load('', (gltfFile) => {
    scene.add(gltfFile.scene);
});

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// scene.add(ambientLight, directionalLight);
//
// const planeMaterial = new THREE.MeshStandardMaterial( { color: params.material, specular: 0x101010 } );
// const planeGeometry = new THREE.PlaneGeometry(50, 50);
// const planeMesh = new THREE.Mesh(planeGeometry, material);
//
// planeMesh.rotation.x = - Math.PI / 2;
// planeMesh.position.y = - 0.5;
//
// loader.load('shoePath', (gltfFile) => {
//
//         const mesh = gltfFile.scene;
//         mesh.castShadow = true;
//
//     });
// planeMesh.receiveShadow = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
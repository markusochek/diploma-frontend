const div = document.createElement("div");
const input = document.createElement("input");
input.type = "file";
input.accept = ".pdf, .png, .jpg, .jpeg, .gif, .mp4";
input.onchange = async (event) => {
    const file = event.target["files"][0];
    if (!file) throw new Error("File not found")
    const formData = new FormData()
    formData.append("file", file)
    await Server.POSTFormData("videos", formData).then((response) => {
        const canvas = document.createElement("canvas")
        document.body.appendChild(canvas)

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        renderer.shadowMap.enabled = true;

        let fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 50;
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.x = 0;
        camera.position.y = 15;
        camera.position.z = 0;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffb7c5);

        const skyColor = "lightblue";
        const intensity = 1;

        let light1 = new THREE.HemisphereLight(skyColor, intensity);
        light1.position.set(-1, 2, 2);
        scene.add(light1);

        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.target.position.set(0, 0, 0);
        light.position.set(-1, 4, 2);

        light.castShadow = true;

        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;

        scene.add(light.target);
        scene.add(light);

        const controls = new THREE.OrbitControls(camera, canvas);
        controls.target.set(1, 0, -1);
        controls.update();


        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024);
        const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

        console.log(response)
        response.arrayBuffer().then(array => {
            let blob = new Blob([array]);
            let url = window.URL.createObjectURL(blob);
            console.log(array)
            console.log(blob)
            console.log(url);
            (new THREE.GLTFLoader()).load(url, (object) => {
                object.scene.scale.set(1, 1, 1);
                scene.add(object.scene);
            })

            requestAnimationFrame(() => render(renderer, camera, cubeCamera, scene));
        })
    })
}

div.appendChild(input)
document.body.appendChild(div)

function render(renderer, camera, cubeCamera, scene) {
    cubeCamera.update(renderer, scene);
    renderer.render(scene, camera);
    requestAnimationFrame(() => render(renderer, camera, cubeCamera, scene));
}
/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene, StartScene } from 'scenes';

// Initialize core ThreeJS components
let scene = new StartScene(startSim);
let isStart = true;
let isSim = false;
let simScene;
let camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
let controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// call SeedScene to start simulation
function startSim() {
    scene.destruct();
    isStart = false;
    isSim = true;
    simScene = new SeedScene();
  //  var audio = audio;
    
};

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    // render correct scene
    if(isStart) {
        renderer.render(scene, camera);
        scene.update && scene.update(timeStamp);
    }
    else {
        renderer.render(simScene, camera);
        controls.update();
        simScene.update && simScene.update(timeStamp);
    }   
   
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

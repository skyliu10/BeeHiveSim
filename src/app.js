/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Audio, AudioListener, AudioLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene, StartScene } from 'scenes';

// IMPORT AUDIO
 // audio source from https://www.freesoundslibrary.com/bee-noise/#google_vignette
import BUZZ from "../src/components/audio/Bee-noise.mp3";
import BEEZ from "../src/components/audio/beez.mp3";

// Initialize core ThreeJS components
let scene = new StartScene(startSim);

let isStart = true;
let isSim = false;
let simScene;
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
let divElements = [];
let audioChoice = BEEZ;


const button = document.createElement('button');
        document.body.appendChild(button);
        button.innerHTML = "start"
        button.id = "button";
        button.style.padding = '0.5em 3em';
        button.style.border = '0.16em solid #FFFF00';
        button.style.margin = '0 0.3em 0.3em 0';
        button.style.boxSizing = 'border-box';
        button.style.textAlign = 'center';
        button.style.transition = 'all 0.15s';
        button.style.textDecoration = 'none';
        button.style.display = 'inline-block';
        button.style.fontFamily = 'Monaco';
        button.style.fontWeight = '400';
        button.style.position = 'absolute';
        button.style.backgroundColor = 'Transparent';
        button.style.fontSize = '30px';
        button.style.top = '60%';
        button.style.left = (window.innerWidth - button.clientWidth) / 2 + 'px';
       
       divElements.push(button);

        const input = document.createElement('input');
        input.type = "text";
        input.id = 'beeInput';
        input.className = "css-class-name";
        input.value = 20;
        var beeN = input.value;
        input.style.fontFamily = "Monaco";
        input.style.position = 'absolute';
        input.style.left = ((window.innerWidth - input.clientWidth) / 2)  + 'px';
        input.style.top = '45%';
        input.oninput = inputNumBees;

        document.body.appendChild(input);
        divElements.push(input);

        button.addEventListener("click", onButtClick, false);

        const dropdown = document.createElement('select');
        dropdown.name = "audio";
        dropdown.id = "audio";
        dropdown.style.fontFamily = 'Monaco';
        dropdown.style.borderColor = 'transparent';
        dropdown.style.backgroundColor = 'yellow';
        dropdown.style.cursor = 'pointer';

        var option1 = document.createElement('option');
        option1.value = "option1";
        option1.text = "bees in the trap";
        dropdown.appendChild(option1);
       var option2 = document.createElement('option');
        option2.value = "option2";
        option2.text = "buzzing";
        dropdown.appendChild(option2);
        dropdown.addEventListener('change', onAudio, false);
        document.body.appendChild(dropdown);
   
        dropdown.style.position = 'absolute';
        dropdown.style.left = (window.innerWidth - dropdown.clientWidth) / 2 + 'px';
        dropdown.style.top = '50%';
    divElements.push(dropdown);

function onButtClick(event) {
    startSim(beeN);
}

function inputNumBees(){
    beeN = document.getElementById('beeInput').value;
}

function onAudio(event){
    if (event.target.value == option2.value) {
        audioChoice = BUZZ;
    }
    else {
        audioChoice = BEEZ;
    }
    
}




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


// add audio

function uploadAudio() {
    var audioListener = new AudioListener();
    camera.add(audioListener);
    var sound = new Audio(audioListener);
    var audioLoader = new AudioLoader();

    audioLoader.load(audioChoice, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(true);
   sound.setVolume(0.5);
        sound.play();

    });
    

}


// call SeedScene to start simulation
function startSim(beeNum) {
    divElements.forEach((divElement) => divElement.remove());
    divElements = null;
    scene.destruct();
    isStart = false;
    isSim = true;
    console.log(beeNum);
 //   console.log('click');
    simScene = new SeedScene(beeNum);
    uploadAudio();
  
    
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




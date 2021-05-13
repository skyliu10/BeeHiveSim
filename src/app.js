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
import styles from '../src/styles.css';

// IMPORT AUDIO
// audio source from https://www.freesoundslibrary.com/bee-noise/#google_vignette and https://freemp3cloud.com/
import BUZZ from "../src/components/audio/Bee-noise.mp3";
import BEEZ from "../src/components/audio/beez.mp3";
import BEEGEES from "../src/components/audio/beegees.mp3";


// Initialize core ThreeJS components
let scene = new StartScene(startSim);
let isStart = true;
let isSim = false;
let simScene;
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
let divElements = [];
let audioChoice = BEEZ;

// add html elemnts to scene

//hexagon butotn


// add start button
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
button.addEventListener("click", onButtClick, false);

divElements.push(button);

// add number of bees input 
const input = document.createElement('input');
input.type = "text";
input.id = 'beeInput';
input.className = "css-class-name";
input.value = 40;
var beeN = input.value;
input.style.fontFamily = "Monaco";
input.style.position = 'absolute';
input.style.left = ((window.innerWidth - input.clientWidth) / 2) + 'px';
input.style.top = '45%';
input.oninput = inputNumBees;
document.body.appendChild(input);
divElements.push(input);

const inputVar = document.createElement('input');
inputVar.type = "text";
inputVar.id = 'varInput';
inputVar.className = "css-class-name";
inputVar.value = 15000;
var varN = inputVar.value;
inputVar.style.fontFamily = "Monaco";
inputVar.style.position = 'absolute';
inputVar.style.left = ((window.innerWidth - inputVar.clientWidth) / 2) + 'px';
inputVar.style.top = '40%';
inputVar.oninput = inputVariance;
document.body.appendChild(inputVar);
divElements.push(inputVar);

// add audio select
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
var option3 = document.createElement('option');
option3.value = "option3";
option3.text = "bee gees";
dropdown.appendChild(option3);
dropdown.addEventListener('change', onAudio, false);
document.body.appendChild(dropdown);
dropdown.style.position = 'absolute';
dropdown.style.left = (window.innerWidth - dropdown.clientWidth) / 2 + 'px';
dropdown.style.top = '50%';
divElements.push(dropdown);

// create labels
var labelBee = createLabel("number of bees", '45%');
divElements.push(labelBee);
var labelAudio = createLabel("audio", '50%');
divElements.push(labelAudio);
var labelVar = createLabel("variance", '40%');
divElements.push(labelVar);

// function for button click
function onButtClick(event) {
    startSim(beeN, varN);
}

// function for number of bees input
function inputNumBees() {
    beeN = document.getElementById('beeInput').value;
}

// function for variance
function inputVariance() {
    varN = document.getElementById('varInput').value;
    //varN = varN / 1000;
}

// function for audio option change 
function onAudio(event) {
    if (event.target.value == option2.value) {
        audioChoice = BUZZ;
    }
    else if(event.target.value == option3.value) {
        audioChoice = BEEGEES;
    }
    else {
        audioChoice = BEEZ;
    }

}

// function to create label
function createLabel(str, top) {

    const text = document.createElement('div');
    document.body.appendChild(text);
    text.innerHTML = str;
    text.style.fontFamily = 'Monaco';
    text.style.fontSize = '15px';
    text.style.position = 'absolute';
    text.style.left = ((window.innerWidth - text.clientWidth) / 2.5)  + 'px';
    text.style.top = top;


    return text;

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

    audioLoader.load(audioChoice, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();

    });


}


// call SeedScene to start simulation
function startSim(beeNum, varN) {
    // delete html elements from startscene
    divElements.forEach((divElement) => divElement.remove());
    divElements = null;

    // destruct startscene
    scene.destruct();
    isStart = false;
    isSim = true;
   // console.log(beeNum);
    //   console.log('click');
    simScene = new SeedScene(beeNum, varN);
    // start audio
    uploadAudio();


};

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    // render correct scene
    if (isStart) {
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




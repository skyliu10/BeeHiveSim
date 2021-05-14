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
let audioChoice = "none";


// add html elemnts to scene

//hexagon butotn

// add title
const text = document.createElement('div');
document.body.appendChild(text);
text.innerHTML = "BEEHIVE SIM";
text.style.fontFamily = 'Monaco';
text.style.fontSize = '60px';
text.style.position = 'absolute';
text.style.left = (window.innerWidth - text.clientWidth) / 2 + 'px';
text.style.top = '30%';
divElements.push(text);

// add start button
const button = document.createElement('button');
document.body.appendChild(button);
button.innerHTML = "start"
button.id = "button";
button.className = 'button';
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

// add incubation input
const inputInc = document.createElement('input');
inputInc.type = "text";
inputInc.id = 'incInput';
inputInc.className = "input";
inputInc.value = 2000;
var incN = inputInc.value;
inputInc.style.fontFamily = "Monaco";
inputInc.style.position = 'absolute';
inputInc.style.left = (inputInc.clientWidth / 2) + ((window.innerWidth - inputInc.clientWidth) / 2) + 'px';
inputInc.style.top = '40%';
inputInc.oninput = inputIncubation;
document.body.appendChild(inputInc);
divElements.push(inputInc);


// add number of bees input 
const input = document.createElement('input');
input.type = "text";
input.id = 'beeInput';
input.className = "input";
input.value = 20;
var beeN = input.value;
input.style.fontFamily = "Monaco";
input.style.position = 'absolute';
input.style.left = (input.clientWidth / 2) + ((window.innerWidth - input.clientWidth) / 2) + 'px';
input.style.top = '50%';
input.oninput = inputNumBees;
document.body.appendChild(input);
divElements.push(input);

const inputVar = document.createElement('input');
inputVar.type = "text";
inputVar.id = 'varInput';
inputVar.className = "input";
inputVar.value = 0.05;
var varN = inputVar.value;
inputVar.style.fontFamily = "Monaco";
inputVar.style.position = 'absolute';
inputVar.style.left = (inputVar.clientWidth / 2) + ((window.innerWidth - inputVar.clientWidth) / 2) + 'px';
inputVar.style.top = '45%';
inputVar.oninput = inputVariance;
document.body.appendChild(inputVar);
divElements.push(inputVar);

// add audio select
const dropdown = document.createElement('select');
dropdown.name = "audio";
dropdown.id = "audio";
dropdown.className = "dropdown";
dropdown.style.fontFamily = 'Monaco';
dropdown.style.borderColor = 'transparent';
dropdown.style.backgroundColor = 'yellow';
dropdown.style.cursor = 'pointer';

var option0 = document.createElement('option');
option0.value = "option0";
option0.text = "none";
dropdown.appendChild(option0);
var option1 = document.createElement('option');
option1.value = "option1";
option1.text = "beez in the trap";
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
dropdown.style.left = (dropdown.clientWidth / 2) + (window.innerWidth - dropdown.clientWidth) / 2 + 'px';
dropdown.style.top = '55%';
divElements.push(dropdown);


// create labels
var labelInc = createLabel("incubation", '40%', inputInc.clientWidth);
divElements.push(labelInc);
var labelBee = createLabel("number of bees", '50%', input.clientWidth);
divElements.push(labelBee);
var labelAudio = createLabel("audio", '55%', inputVar.clientWidth);
divElements.push(labelAudio);
var labelVar = createLabel("variance", '45%', dropdown.clientWidth);

// add info
const info = document.createElement('div');
document.body.appendChild(info);
info.innerHTML = "Welcome to BEEHIVE SIM! As beekeeper, you have the power to decide how the bees construct their hive. Choose the variance in bee size (affects construction regularity), the starting population, the incubation rate for new bees, and optional audio, and press start to begin. ";
info.style.fontFamily = 'Monaco';
info.style.fontSize = '15px';
info.style.textAlign = 'center';
info.style.position = 'absolute';
info.style.left = (window.innerWidth - info.clientWidth) / 2 + 'px';
info.style.top = '75%';
divElements.push(info);


divElements.push(labelVar);

// function for button click
function onButtClick(event) {
    startSim(beeN, varN, incN);
}

// function for incubation input
function inputIncubation() {
    incN = document.getElementById('incInput').value;
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
    if (event.target.value == option0.value) {
        return;
    }
    else if (event.target.value == option2.value) {
        audioChoice = BUZZ;
    }
    else if (event.target.value == option3.value) {
        audioChoice = BEEGEES;
    }
    else {
        console.log("beez");
        audioChoice = BEEZ;
    }

}

// function to create label
function createLabel(str, top, clientW) {

    const text = document.createElement('div');

    text.innerHTML = str;
    text.clientW = clientW;
    text.className = "label";
    text.style.fontFamily = 'Monaco';
    text.style.fontSize = '15px';
    text.style.position = 'absolute';
    text.style.color = "black";
    text.style.left = ((window.innerWidth - text.clientWidth) / 2) - (text.clientW / 2) + 'px';
    text.style.top = top;
    document.body.appendChild(text);

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
    if (audioChoice == 'none') { return; }

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
function startSim(beeNum, varN, incN) {
    // delete html elements from startscene
    divElements.forEach((divElement) => divElement.remove());
    divElements = null;

    // destruct startscenes
    scene.destruct();
    isStart = false;
    isSim = true;
    // console.log(beeNum);
    //   console.log('click');
    simScene = new SeedScene(beeNum, varN, incN);
    camera.position.set(6, 3, 0);
    camera.lookAt(new Vector3(0, 0, 0));
    // start audio
    uploadAudio();


};


// resize handler
/*
window.addEventListener('resize', () => {
    SeedScene && SeedScene.resizeHandler();
  }, false);*/

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

    // realign divElements
    divElements.forEach((divElement) => {
        // console.log(divElement.className);
        if (divElement.className == "label") {
            var clientW = divElement.clientW;
            divElement.style.left = (window.innerWidth - divElement.clientWidth) / 2 - (clientW / 2) + 'px';
        }
        else if (divElement.className == "input" || divElement.className == "dropdown") {
            //console.log("yo")
            divElement.style.left = (divElement.clientWidth / 2) + (window.innerWidth - divElement.clientWidth) / 2 + 'px';
        }
        else {
            divElement.style.left = (window.innerWidth - divElement.clientWidth) / 2 + 'px';
        }

    });
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);




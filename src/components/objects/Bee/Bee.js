import { Group, Box3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
const LIMIT = -100;
const UPDATE_FREQ = 5;

class Bee extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // Load object
        const loader = new GLTFLoader();
        this.name = 'bee';

        // scale the bee
        this.scale.set(.01, .01, .01);
       
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
       parent.addToUpdateList(this);

       this.boundingBox = new Box3;
       this.updateCounter = 0;

      
      
    }

    update(timeStamp) {
        // move randomly for now
        // need to figure out how to keep within the honeycomb

        // if (this.position.x > LIMIT && this.position.y > LIMIT && this.position.z > LIMIT ) {
        //     var direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize(); 
        //     // this.position.add(direction);
        //     var tween = new TWEEN.Tween(this.position).to(this.position.add(direction)).start();
        // }
        // this.boundingBox.setFromObject(this);
        // TWEEN.update();

        if (this.updateCounter == UPDATE_FREQ) {
            let direction = new THREE.Vector3();
            let position = new THREE.Vector3().copy(this.position);
            direction.set(0, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
            position.addScaledVector(direction, 0.02);
            // restrict to bounding box of honeycomb
            if (position.y < -0.25 && position.y > -0.5 && position.z < 0.3 && position.z > -0.3) {
                this.position.addScaledVector(direction, 0.02);
            }
            this.updateCounter = 0;
        }

        this.updateCounter += 1;
    }
}

export default Bee;

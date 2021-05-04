import { Group, Box3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
const LIMIT = -100;

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
        this.scale.set(.1, .1, .1);
       
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
       parent.addToUpdateList(this);

       this.boundingBox = new Box3;

      
      
    }

    update(timeStamp) {

        // move randomly for now
        // need to figure out how to keep within the scence
        if (this.position.x > LIMIT && this.position.y > LIMIT && this.position.z > LIMIT ) {
        var shift = new THREE.Vector3();
        var direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize(); 
        this.position.add(direction);
        }
        this.boundingBox.setFromObject(this);
        TWEEN.update();

    }
}

export default Bee;

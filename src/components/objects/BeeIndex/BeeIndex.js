import { Group, Box3, Vector3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
const LIMIT = 50;
const EXPANSION_RATE = 0.0005;

class BeeIndex extends Group {
    constructor(parent, scale) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // Load object
        const loader = new GLTFLoader();
        this.name = 'beeIndex';

        // scale the bee and set construction measure proportional to bee scale
        this.scale.set(scale, scale, scale);
        this.measure = scale * 10;
       
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.boundingBox = new Box3;
        this.updateCounter = 0;

       
      
    }

    update(timeStamp) {
        if (timeStamp > this.parent.state.updateLimit) { return; }
         if (this.position.x < LIMIT && this.position.y < LIMIT && this.position.z < LIMIT ) {
             var direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize(); 
             // this.position.add(direction);
             var tween = new TWEEN.Tween(this.position).to(this.position.add(direction)).start();
         }
         this.boundingBox.setFromObject(this);
         TWEEN.update();

      



    }

    // returns true if position is within mesh (projected onto y-z plane)
    intersectsWith(object, position) {
        let direction = new THREE.Vector3(-1, 0, 0).normalize();
        const raycaster = new THREE.Raycaster();
        raycaster.set(position, direction);
        const intersects = raycaster.intersectObject(object);
        if (intersects.length === 0) { return false; }
        else { return true; }
    }



}

export default BeeIndex;

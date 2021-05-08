import { Group, Box3, Vector3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
const LIMIT = -100;
const EXPANSION_RATE = 0.00015;

class Bee extends Group {
    constructor(parent, scale) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // Load object
        const loader = new GLTFLoader();
        this.name = 'bee';

        // scale the bee and set construction measure proportional to bee scale
        this.scale.set(scale, scale, scale);
        this.measure = scale * 20;
       
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
        // if (this.position.x > LIMIT && this.position.y > LIMIT && this.position.z > LIMIT ) {
        //     var direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize(); 
        //     // this.position.add(direction);
        //     var tween = new TWEEN.Tween(this.position).to(this.position.add(direction)).start();
        // }
        // this.boundingBox.setFromObject(this);
        // TWEEN.update();

        let direction = new THREE.Vector3();
        let newPosition = new THREE.Vector3().copy(this.position);//.add(new Vector3(0, 0.25, 0)); // correct for weird bee positioning
        direction.set(0, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        newPosition.addScaledVector(direction, 0.02);

        // restrict to bounding box of cell locations
        let bb = new Box3().copy(this.parent.children[0].bb).expandByVector(new THREE.Vector3(0, this.parent.state.scale * 25, this.parent.state.scale * 25));
        //if (timeStamp > 5000 && timeStamp < 6000) { console.log(bb, newPosition); }
        if (bb.containsPoint(new THREE.Vector3().copy(newPosition).setX(0.03999999910593033))) {
            this.position.addScaledVector(direction, 0.02);

            //let correctedPosition = new THREE.Vector3().copy(newPosition).add(new Vector3(0, -0.25, 0));

            // add new cell location, if current position is valid
            this.parent.children[0].addNewLocation(newPosition, this.measure);

            // add new cell wall deposit, if current position is valid
            this.parent.children[1].addNewDeposit(newPosition);
        }

        // if bee is on border of bounding box (but not top border), "add wax" to floor on side bee is on
        // else if (position.y < floor.bb.max.y) { 
        //     let zMid = 0.5 * floor.bb.min.z + 0.5 * floor.bb.max.z
        //     if (position.z < zMid) { // add to right side of floor
        //         //console.log("adding to right side");
        //         floor.addWax(-1 * EXPANSION_RATE, -5 * EXPANSION_RATE, 0, 0);
        //     }
        //     else { // add to left side of floor
        //         //console.log("adding to left side");
        //         floor.addWax(0, 0, -5 * EXPANSION_RATE, 1 * EXPANSION_RATE);
        //     }
        // }
    }


}

export default Bee;

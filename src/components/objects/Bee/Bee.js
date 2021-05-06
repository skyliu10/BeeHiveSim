import { Group, Box3, Vector3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
const LIMIT = -100;
const UPDATE_FREQ = 2;

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

            let floor = this.parent.children[0];
            // restrict to bounding box of Floor
            if (floor.bb.containsPoint(position.setX(0).add(new Vector3(0, 0.25, 0)))) {
                this.position.addScaledVector(direction, 0.02);
            }

            // if bee is on border of bounding box (but not top border), "add wax" to floor on side bee is on
            else if (position.y < floor.bb.max.y) { 
                let zMid = 0.5 * floor.bb.min.z + 0.5 * floor.bb.max.z
                if (position.z < zMid) { // add to right side of floor
                    console.log("adding to right side");
                    floor.addWax(-0.001, -0.005, 0, 0);
                }
                else { // add to left side of floor
                    console.log("adding to left side");
                    floor.addWax(0, 0, -0.005, 0.001);
                }
            }

            this.updateCounter = 0;
        }

        this.updateCounter += 1;
    }
}

export default Bee;

import { Group, Box3, Vector3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";

class QueenBee extends Group {
    constructor(parent, scale) {
        // Call parent Group() constructor
        super();

        // Load object
        const loader = new GLTFLoader();
        this.name = 'bee';

        // scale the bee and set construction measure proportional to bee scale
        this.scale.set(scale * 2, scale * 2, scale * 2);
       
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (timeStamp > this.parent.state.updateLimit) { return; }

        let direction = new THREE.Vector3();
        let newPosition = new THREE.Vector3().copy(this.position);//.add(new Vector3(0, 0.25, 0)); // correct for weird bee positioning
        direction.set(0, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        newPosition.addScaledVector(direction, 0.02);

        // restrict to its bounding box
        if (!this.parent.queenBb.containsPoint(newPosition)) { return; }

        // restrict to bounding box of cell locations
        let bb = new Box3().copy(this.parent.children[0].bb).expandByVector(new THREE.Vector3(0, this.parent.state.scale * 25, this.parent.state.scale * 25));
        if (bb.containsPoint(new THREE.Vector3().copy(newPosition).setX(0.03999999910593033))) { // why lol
            this.position.addScaledVector(direction, 0.02);

            // lay egg if chance would so have it
            if (Math.random() < 0.01) {
                let closestLocation;
                let bestDist = 100000;

                let locations = this.parent.children[0].locations;

                // determine closest location
                for (let i = 0; i < locations.length; i++) {
                    if (locations[i].distanceTo(this.position) < bestDist) {
                        closestLocation = locations[i];
                        bestDist = locations[i].distanceTo(this.position);
                    }
                }

                // lay egg if closest location is empty
                let closestIndex = locations.indexOf(closestLocation);
                if (this.parent.children[0].empty[closestIndex]) {
                    this.parent.children[0].layEgg(closestIndex);
                }
            }
        }

    }


}

export default QueenBee;

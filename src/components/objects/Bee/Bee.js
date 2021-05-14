import { Group, Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Bee_01.glb';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";

class Bee extends Group {
    constructor(parent, scale) {
        // Call parent Group() constructor
        super();

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

        let direction = new THREE.Vector3();
        let newPosition = new THREE.Vector3().copy(this.position);//.add(new Vector3(0, 0.25, 0)); // correct for weird bee positioning
        direction.set(0, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        newPosition.addScaledVector(direction, 0.02);

        // restrict to frame bounding box
        if (!this.parent.bb.containsPoint(newPosition)) { return; }

        // restrict to bounding box of cell locations
        let bb = new Box3().copy(this.parent.children[0].bb).expandByVector(new THREE.Vector3(0, this.parent.state.scale * 25, this.parent.state.scale * 25));
        if (bb.containsPoint(new THREE.Vector3().copy(newPosition).setX(0.03999999910593033))) {
            this.position.addScaledVector(direction, 0.02);

            // add new cell location, if current position is valid
            this.parent.children[0].addNewLocation(newPosition, this.measure);

            // add new cell wall deposit, if current position is valid
            this.parent.children[1].addNewDeposit(newPosition);
        }

    }


}

export default Bee;

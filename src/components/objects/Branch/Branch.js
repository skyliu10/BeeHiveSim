import { Group } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './branch.glb';

class Branch extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // Load object
        const loader = new GLTFLoader();
        this.name = 'branch';

       // scale and rotate the branch
       this.scale.set(3, 3, 3);
       var axis = new THREE.Vector3(1, 1, 1);
       this.rotateOnAxis(axis, Math.PI / 2);

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
      //  parent.addToUpdateList(this);

    
      
    }
}

export default Branch;

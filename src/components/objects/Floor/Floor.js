import { Group, Box3} from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";


class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // Load object
        const loader = new GLTFLoader();
        this.name = 'floor';

    
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
       parent.addToUpdateList(this);

       this.boundingBox = new Box3;

      
      
    }

    update(timeStamp) {

    

    }
}

export default Floor;

import { Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    DoubleSide,
    CircleGeometry,
    SpotLight,
    CylinderGeometry,
    AxesHelper} from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './branch.glb';


class Branch extends Group {
    constructor(parent, radius, height) {
        // Call parent Group() constructor
        super();

        this.radius = radius;
        this.height = height;
        this.name = 'branch';
        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/

        // create the cylinder
      
       var mesh = new THREE.Mesh( 
            new THREE.CylinderGeometry(this.radius, this.radius, this.height),
            new THREE.MeshPhongMaterial({ color: 0x5C4033})
        );
        this.add(mesh);



        // Load object
       // const loader = new GLTFLoader();
       

       // scale and rotate the branch
       /*this.scale.set(3, 3, 3);
       var axis = new THREE.Vector3(1, 1, 1);
       this.rotateOnAxis(axis, Math.PI / 2);

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });*/

        // Add self to parent's update list
        parent.addToUpdateList(this);

    
      
    }

    update(timeStamp) {


       

    }
}

export default Branch;

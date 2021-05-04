import { Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    ConeGeometry,
    DoubleSide,
    CircleGeometry,
    SpotLight,
    CylinderGeometry,
    AxesHelper,
    BufferGeometry,
    Geometry} from 'three';
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
        const geo = new Geometry();

        // main branch
        let main = new THREE.CylinderGeometry(this.radius, this.radius, this.height);
        main.rotateX(Math.PI / 2);
        geo.merge(main);

        // make smaller branches
        let smaller = new THREE.ConeGeometry(this.radius / 3, height / 3);
        smaller.translate(0, this.radius * 7, this.radius * 2);
        smaller.rotateX(Math.PI / 14);
        geo.merge(smaller);

        let smaller1 = new THREE.ConeGeometry(this.radius / 3, height / 2);
        smaller1.translate(0, this.radius * 8, -this.radius * 10);
       // smaller1.rotateX(-Math.PI / 20);
        smaller1.rotateX(Math.PI + Math.PI / 20);
       // smaller1.rotateZ(Math.PI  * 2);
        geo.merge(smaller1);

        let smaller2 = new THREE.ConeGeometry(this.radius / 3, height / 4);
        smaller2.translate(0, this.radius * 6, this.radius * 10);
        smaller2.rotateX(Math.PI + Math.PI / 20);
        geo.merge(smaller2);

       var mesh = new THREE.Mesh( 
            new BufferGeometry().fromGeometry(geo),
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

import { Group, Scene } from 'three';
import * as THREE from "three";
const RADIUS = 0.3;
const AUTO_EXPAND = false;

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/
        
        this.name = 'floor';
        let x = this.position.x;
        let y = this.position.y;
        let z = this.position.z;
        this.ep1 = new THREE.Vector2(y,          z - RADIUS);
        this.cp1 = new THREE.Vector2(y - RADIUS, z - RADIUS);
        this.cp2 = new THREE.Vector2(y - RADIUS, z + RADIUS);
        this.ep2 = new THREE.Vector2(y,          z + RADIUS);

        const shape = new THREE.Shape();
        shape.moveTo(this.ep1.x, this.ep1.y);
        shape.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.ep2.x, this.ep2.y);
        shape.lineTo(this.ep1.x, this.ep1.y);

        const geometry = new THREE.ShapeGeometry(shape, 20);
        geometry.rotateX(Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);

        this.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({ color: 0x5C4033})
        );
        this.add(this.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);

    }

    update(timeStamp) {
        if (AUTO_EXPAND) {
            this.cp2.x -= 0.005;
            this.cp1.x -= 0.005;
            this.ep1.y -= 0.002;
            this.ep2.y += 0.002;
            const shape = new THREE.Shape();
            shape.moveTo(this.ep1.x, this.ep1.y);
            shape.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.ep2.x, this.ep2.y);
            shape.lineTo(this.ep1.x, this.ep1.y);
    
            const geometry = new THREE.ShapeGeometry(shape, 50);
            geometry.rotateX(Math.PI / 2);
            geometry.rotateZ(Math.PI / 2);
    
            this.mesh.geometry = geometry;
        }



        

    }
}

export default Floor;

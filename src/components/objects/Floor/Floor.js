import { Group, Scene } from 'three';
import * as THREE from "three";
const RADIUS = 0.3;
const AUTO_EXPAND = false;

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

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
        geometry.computeBoundingBox();

        this.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({ color: 0xd6cb4f})
        );
        this.add(this.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.bb = new THREE.Box3().copy(geometry.boundingBox);
        var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
        this.add(bbHelper);

    }

    update(timeStamp) {
        if (AUTO_EXPAND) {
            this.addWax(-0.002, -0.005, -0.005, 0.002);
        }
    }

    addWax(dep1, dcp1, dcp2, dep2) {
        this.ep1.y += dep1;
        this.cp1.x += dcp1;
        this.cp2.x += dcp2;
        this.ep2.y += dep2;
        const shape = new THREE.Shape();
        shape.moveTo(this.ep1.x, this.ep1.y);
        shape.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.ep2.x, this.ep2.y);
        shape.lineTo(this.ep1.x, this.ep1.y);

        const geometry = new THREE.ShapeGeometry(shape, 50);
        geometry.rotateX(Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);
        geometry.computeBoundingBox();

        this.mesh.geometry = geometry;
        this.bb.copy(geometry.boundingBox);
    }

}

export default Floor;

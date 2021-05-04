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
import * as THREE from "three";

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
       /* this.state = {
            gui: parent.state.gui,
        };*/
        this.name = 'floor';

        var floorShape = new THREE.Shape();
        floorShape.moveTo(this.position.x, this.position.y, this.position.z);
        var curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(this.position.x - 1, this.position.y, this.position.z),
            new THREE.Vector3(this.position.x - 1, this.position.y - 1, this.position.z),
            new THREE.Vector3(this.position.x + 1, this.position.y - 1, this.position.z),
            new THREE.Vector3(this.position.x + 1, this.position.y, this.position.z)
        );

        var points = curve.getPoints(50);

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.MeshPhongMaterial({ color: 0xFFFF00});
        var mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);

        // Add self to parent's update list
        //parent.addToUpdateList(this);

    }

    // update(timeStamp) {

    

    // }
}

export default Floor;

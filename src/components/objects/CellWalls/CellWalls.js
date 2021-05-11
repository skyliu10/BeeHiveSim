import { Group, Scene, BufferGeometryUtils } from 'three';
import * as THREE from "three";

class CellWalls extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'cellWalls';

        this.deposits = [];

        // make geometry
        this.geometry = new THREE.BufferGeometry();

        // make mesh and add to scene
        const material = new THREE.PointsMaterial({color: 0x000000, size: 0.02});
        this.mesh = new THREE.Points(this.geometry, material);
        this.add(this.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

    }

    // add new deposit, update mesh
    updateMesh(position) {
        this.deposits.push(position);
        let buffer = new Float32Array(this.deposits.length * 3);
        this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3).copyVector3sArray(this.deposits));

        // var tempDeposits = [];
        // tempDeposits.push(position);
        // tempDeposits.push(new THREE.Vector3().copy(position).setX(0));
        // var tempGeometry = new THREE.BufferGeometry();
        // let tempBuffer = new Float32Array(6);
        // tempGeometry.setAttribute('position', new THREE.BufferAttribute(tempBuffer, 3).copyVector3sArray(tempDeposits));

        // const newGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries([this.mesh.geometry, tempGeometry], false);
        // this.mesh.geometry = newGeometry;
    }

    // adds a cell wall wax deposit, if in valid location.
    // 2 constraints: Voronoi and circle
    addNewDeposit(position) {
        let scale = this.parent.state.scale;
        let locations = this.parent.children[0].locations;

        if (locations.length < 7) { return; }

        // determine proximity to existing cell wall, if cell wall exists already
        if (this.deposits.length > 0) {
            let closeToWall = false;
            for (let i = 0; i < this.deposits.length; i++) {
                if (this.deposits[i].distanceTo(position) < (scale * 8)) { closeToWall = true; }
            }
            if (closeToWall == false) { return; }
        }

        let closestLocation;
        let secondClosestLocation;
        let bestDist = 100000;
        let secondBestDist = 100000;

        // determine closest location (thereby applying Voronoi)
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].distanceTo(position) < bestDist) {
                closestLocation = locations[i];
                bestDist = locations[i].distanceTo(position);
            }
        }

        // determine second closest location, for cell wall thickness purposes
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].distanceTo(position) < secondBestDist && locations[i].distanceTo(position) > bestDist) {
                secondClosestLocation = locations[i];
                secondBestDist = locations[i].distanceTo(position);
            }
        }

        // determine if closest location is adequately surrounded
        let numSurrounding = 0;
        for (let i = 0; i < locations.length; i++) {
            let neighborDist = closestLocation.distanceTo(locations[i]);
            if (neighborDist < (scale * 25)) { numSurrounding++; }
        }

        if (numSurrounding < 7) { return; } // 6 surrounding + 1 self

        // apply circle-around-location constraint, wall thickness constraint
        if (bestDist > (scale * 10.3) || Math.abs(bestDist - secondBestDist) < scale) { this.updateMesh(position); }

        //console.log(numSurrounding);
    }
}

export default CellWalls;

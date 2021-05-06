import { Group, Scene } from 'three';
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
        const material = new THREE.PointsMaterial({color: 0xffb005, size: 0.02});
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
    }

    // adds a cell wall wax deposit, if in valid location.
    // 2 constraints: Voronoi and circle
    addNewDeposit(position) {
        let locations = this.parent.children[1].locations;

        // determine closest location (simulatenously applying Voronoi constraint)
        let closestLocation = locations[0];
        let bestDist = closestLocation.distanceTo(position);
        for (let i = 1; i < locations.length; i++) {
            let challDist = locations[i].distanceTo(position);
            if (challDist < bestDist) {
                closestLocation = locations[i];
                bestDist = challDist;
            }
        }
        let dist = bestDist;

        // determine if closest location is adequately surrounded
        let numSurrounding = 0;
        for (let i = 0; i < locations.length; i++) {
            let neighborDist = closestLocation.distanceTo(locations[i]);
            if (neighborDist < 0.15) { numSurrounding++; } // need to use scale here
        }

        if (numSurrounding < 7) { return; } // 6 surrounding + 1 self

        // apply circle-around-location constraint and add deposit if it checks out
        if (dist > 0.05) { this.updateMesh(position); } // need to use scale here

        //console.log(numSurrounding);
    }
}

export default CellWalls;

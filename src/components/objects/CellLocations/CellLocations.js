import { Box3, Group, Scene } from 'three';
import * as THREE from "three";

class CellLocations extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'cellLocations';

        this.locations = [];

        // push first location
        this.locations.push(new THREE.Vector3(0.04, 0, 0));
        //console.log(this.locations);

        // make geometry and add first location
        this.geometry = new THREE.BufferGeometry();
        let buffer = new Float32Array(this.locations.length * 3);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3).copyVector3sArray(this.locations));

        // make mesh and add to scene
        const material = new THREE.PointsMaterial({color: 0x000000, size: 0.02});
        this.mesh = new THREE.Points(this.geometry, material);
        this.add(this.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.bb = new Box3().setFromBufferAttribute(this.geometry.attributes.position);
        // var bbHelper = new THREE.Box3Helper(this.bb, 0xff0000);
        // this.add(bbHelper);
    }

    update(timeStamp) {

    }

    // add new cell location at position, update mesh
    updateMesh(position) {
        this.locations.push(position);
        let buffer = new Float32Array(this.locations.length * 3);
        this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3).copyVector3sArray(this.locations));

        this.bb.setFromBufferAttribute(this.mesh.geometry.attributes.position);
    }

    // adds a new cell location if location is valid. will be called for all positions a bee visits. 
    // measure argument is the length that a particular bee builds with (proportional to its size).
    addNewLocation(position, measure) {
        let numLocations = this.locations.length;
        let tolerance = this.parent.state.scale;

        // restrict to frame
        //if (!this.parent.children[2].bb.containsPoint(new THREE.Vector3().copy(position).setX(0))) { return; }

        // constrain new location
        if (numLocations == 1) {
            // new location must only be appropriate distance from the one existing location
            let dist = this.locations[0].distanceTo(position);
            if (Math.abs(dist - measure) < tolerance) { this.updateMesh(position); }
        }

        if (numLocations > 1) { 
            // new location must be appropriate distance from 2 existing locations which are also 
            // an appropriate distance from each other, and must be further than that distance 
            // from all other locations
            let apprDistFromTwo = false;;
            let farEnoughAway = true;

            for (let i = 0; i < numLocations; i++) {
                let dist1 = this.locations[i].distanceTo(position);
                if ((measure - dist1) >= tolerance) { 
                    farEnoughAway = false;
                    break;
                }
                let loc1 = this.locations[i];

                for (let j = 0; j < numLocations; j++) {
                    if (j == i) { continue; }
                    let dist2 = this.locations[j].distanceTo(position);
                    if ((measure - dist2) >= tolerance) { 
                        farEnoughAway = false;
                        break;
                    }
                    let loc2 = this.locations[j];

                    if (Math.abs(dist1 - measure) < tolerance && 
                        Math.abs(dist2 - measure) < tolerance &&
                        Math.abs(loc1.distanceTo(loc2) - measure) < tolerance) {
                        apprDistFromTwo = true; 
                    }
                }
            }

            if (apprDistFromTwo && farEnoughAway) { this.updateMesh(position); }
        }
    }

}

export default CellLocations;

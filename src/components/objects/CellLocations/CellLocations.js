import { Group, Scene } from 'three';
import * as THREE from "three";
const TOLERANCE = 0.003;

class CellLocations extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'cellLocations';

        this.locations = [];

        // push first location
        this.locations.push(new THREE.Vector3(0.04, -0.1, 0));
        console.log(this.locations);

        // make geometry and add first location
        this.geometry = new THREE.BufferGeometry();
        let buffer = new Float32Array(this.locations.length * 3);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3).copyVector3sArray(this.locations));

        // make mesh and add to scene
        const material = new THREE.PointsMaterial({color: 0x000000, size: 0.05});
        this.mesh = new THREE.Points(this.geometry, material);
        this.add(this.mesh);

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

    }

    // add new cell location at position, update mesh
    updateMesh(position) {
        this.locations.push(position);
        let buffer = new Float32Array(this.locations.length * 3);
        this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3).copyVector3sArray(this.locations));
    }

    // adds a new cell location if location is valid. will be called for all positions a bee visits. 
    // measure argument is the length that a particular bee builds with (proportional to its size).
    addNewLocation(position, measure) {
        let numLocations = this.locations.length;

        if (numLocations == 1) {
            // new location must only be appropriate distance from the one existing location
            let dist = this.locations[0].distanceTo(position);
            if (Math.abs(dist - measure) < TOLERANCE) {
                console.log("adding cell location");
                this.updateMesh(position);
                console.log(this.locations);
            }
        }

        if (numLocations > 1) { 
            // new location must be appropriate distance from 2 existing locations which are also 
            // an appropriate distance from each other, and must be further than that distance 
            // from all other locations
            let apprDistFromTwo = false;;
            let farEnoughAway = true;

            for (let i = 0; i < numLocations; i++) {
                let dist1 = this.locations[i].distanceTo(position);
                if ((measure - dist1) >= TOLERANCE) { 
                    farEnoughAway = false;
                    break;
                }

                for (let j = 0; j < numLocations; j++) {
                    if (j == i) { continue; }
                    let dist2 = this.locations[j].distanceTo(position);
                    if ((measure - dist2) >= TOLERANCE) { 
                        farEnoughAway = false;
                        break;
                    }

                    if (Math.abs(dist1 - measure) < TOLERANCE && Math.abs(dist2 - measure) < TOLERANCE) {
                        apprDistFromTwo = true; 
                    }
                }
            }

            //console.log(apprDistFromTwo, farEnoughAway);

            if (apprDistFromTwo && farEnoughAway) {
                //console.log("adding cell location");
                this.updateMesh(position);
                //console.log(this.locations);
            }
        }
    }

}

export default CellLocations;

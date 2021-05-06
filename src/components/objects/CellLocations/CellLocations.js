import { Group, Scene } from 'three';
import * as THREE from "three";
const TOLERANCE = 0.001;

class CellLocations extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'cellLocations';

        this.locations = [];

        // push first location
        this.locations.push(new THREE.Vector3(0.04, -0.1, 0));

    }

    // adds a new cell location if location is valid. will be called for all positions a bee visits. 
    // measure argument is the length that a particular bee builds with (proportional to its size).
    addNewLocation(position, measure) {
        let numLocations = this.locations.length;

        if (numLocations == 1) {
            // new location must only be appropriate distance from the one existing location
            let dist = this.locations[0].distanceTo(position);
            if (Math.abs(dist - measure) < TOLERANCE) { this.locations.push(position); }
        }

        if (numLocations > 1) { 
            // new location must be appropriate distance from at least 2 existing locations, 
            // and must be further than that distance from all other locations
            let numApprDist = 0;
            let farEnoughAway = true;

            for (let i = 0; i < numLocations; i++) {
                let dist = this.locations[i].distanceTo(position);
                if (Math.abs(dist - measure) < TOLERANCE) { numApprDist++; }
                if ((measure - dist) >= TOLERANCE) { 
                    farEnoughAway = false;
                    break;
                }
            }

            if (numApprDist >= 2 && farEnoughAway == true) { this.locations.push(position); }

        }
    }

}

export default CellLocations;

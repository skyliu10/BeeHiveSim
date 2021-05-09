import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Bee, Branch, Floor, CellLocations, CellWalls, Frame } from 'objects';
import { BasicLights } from 'lights';
const RAND_MEASURES = true;
const VARIANCE = 50000; // smaller = more variance

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            numBees: 25,
            updateLimit: 500000,
            scale: 0.013
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        const cellLocations = new CellLocations(this);
        const cellWalls = new CellWalls(this);
        //const frame = new Frame(this);
        const lights = new BasicLights();
        this.add(cellLocations, cellWalls, lights);

        // add multiple bees if needed
        // will set this right at the start
        for (let i = 0; i < this.state.numBees; i++) {
            let scale = this.state.scale;
            // randomize bee size, and thus construction measuring
            if (RAND_MEASURES) {
                let rand = (Math.random() * 2 - 1) / VARIANCE;
                scale += rand;
            }
            let bee = new Bee(this, scale);
            bee.position.set(0.04, 0, 0); //-0.3
            this.add(bee);
        }

        // Populate GUI
        this.state.gui.add(this.state, 'numBees', 1, 5).step(1);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList, numBees } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;
        
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;

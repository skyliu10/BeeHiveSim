import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Bee, Branch, Floor } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            numBees: 1
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        //const land = new Land();
       // const flower = new Flower(this);
        const bee = new Bee(this, .1);
        const branch = new Branch(this, 0.25, 10);
        const floor = new Floor(this);
        branch.position.set(0, 0, 0);
        floor.position.set(0, 0, 0);
        const lights = new BasicLights();
        this.add(bee, branch, lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
        this.state.gui.add(this.state, 'numBees', 1, 5).step(1);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
      //  this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
      for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;

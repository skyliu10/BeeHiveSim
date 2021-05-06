import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, BeeIndex, Branch, Floor, CellLocations } from 'objects';
import { BasicLights } from 'lights';

class StartScene extends Scene {
    constructor(startSim) {

        super();

        this.state = {
          updateList: [],
        };

        // add bees
        for (let i = 0; i < 10; i++) {
            let scale = .1;
            let bee = new BeeIndex(this, scale);
            bee.position.set(0.04, -0.3, 0);
            this.add(bee);
        }

        this.background = new Color(0x7ec0ee);

        // add text and buttons
        this.divElements = [];
        this.divElements.push(this.createText("BeeHive Sim", '30%'));
        this.divElements.push(this.createButton("Start", '40%', startSim));
    }

    
   createText(str, top) {
        const text = document.createElement('div');
        document.body.appendChild(text);
        text.innerHTML = str;
        text.style.top = top;
        return text;

    }

    createButton(str, top, callback) {
        const button = document.createElement('button');
        document.body.appendChild(button);
        button.innerHTML = str;
        button.onclick = callback;
        button.style.top = top;
        return button;
    }

      /* Event handlers */
      resizeHandler() {
        // realign divElements
        this.divElements.forEach((divElement) => {
            divElement.style.left = (window.innerWidth - divElement.clientWidth)/2 + 'px';
        });
    }

    // update
    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update() {
        const { updateList} = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;
        
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update();
        }
    }

    
    // destruct scene
    destruct() {
        // remove div elements
        this.divElements.forEach((divElement) => divElement.remove());
        this.divElements = null;

        // throw away scene
        this.dispose();

    }


}

export default StartScene;
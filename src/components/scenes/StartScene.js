import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Bee, Branch, Floor, CellLocations } from 'objects';
import { BasicLights } from 'lights';

class StartScene extends Scene {
    constructor(startSim) {

        super();

        this.state = {
         // bees: [],
        };

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
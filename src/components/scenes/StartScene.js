import * as Dat from 'dat.gui';
import { Scene, Color, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
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

        // create canvas
        /*const geometry = new BoxGeometry(100, 100, 1);
        const material = new MeshBasicMaterial(0x7ec0ee);
        const mesh = new Mesh(geometry, material);
        this.screen = mesh;
        this.add(mesh);
        this.mesh = mesh;*/

        // style
             
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `
        .note {
            background-color: yellow;
        }
        `;
        document.head.appendChild(style);

        // add text and buttons
        this.divElements = [];
        this.divElements.push(this.createText("BEEHIVE SIM", '30%'));
        this.divElements.push(this.createButton("START", '40%', startSim));
    }

    
   createText(str, top) {

        const text = document.createElement('div');
        document.body.appendChild(text);
        text.innerHTML = str;
        text.style.fontFamily = 'Monaco';
        text.style.fontSize = '60px';
        text.style.position = 'absolute';
        text.style.left = (window.innerWidth - text.clientWidth) / 2 + 'px';
        text.style.top = top;

    
        return text;

    }

    createButton(str, top, callback) {
        const button = document.createElement('button');
        document.body.appendChild(button);
        button.innerHTML = str;
    
        button.style.padding = '0.5em 3em';
        button.style.border = '0.16em solid #FFFF00';
        button.style.margin = '0 0.3em 0.3em 0';
        button.style.boxSizing = 'border-box';
        button.style.textAlign = 'center';
        button.style.transition = 'all 0.15s';
        button.style.textDecoration = 'none';
        button.style.display = 'inline-block';
        button.style.fontFamily = 'Monaco';
        button.style.fontWeight = '400';
        button.style.position = 'absolute';
        button.style.backgroundColor = 'Transparent';
        button.style.fontSize = '30px';
        button.style.left = (window.innerWidth - button.clientWidth) / 2 + 'px';
        button.style.top = top;
        button.onclick = callback;
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
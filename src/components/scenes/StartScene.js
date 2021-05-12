import * as Dat from 'dat.gui';
import { Scene, Color, Mesh, BoxGeometry, MeshBasicMaterial, MeshLambertMaterial } from 'three';
import { Flower, Land, BeeIndex, Branch, Floor, CellLocations } from 'objects';
import { BasicLights } from 'lights';

class StartScene extends Scene {
    constructor(startSim) {

        super();

        this.state = {
          updateList: [],
          beeNum: 20,
        
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
             
       /* var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `
        .note {
            background-color: yellow;
        }
        `;
        document.head.appendChild(style);*/

        // add text and buttons
        this.divElements = [];
        this.divElements.push(this.createText("BEEHIVE SIM", '30%'));
        this.divElements.push(this.createLabel("Audio", '50%'));
      //  var input = this.createInput(this.fun);
      //  this.divElements.push(input);
        this.divElements.push(this.createLabel("Number of Bees", '45%'));
        this.divElements.push(this.createDropdown(this.audio));
      //  var button = this.createButton("START", '60%', startSim);
       // this.divElements.push(button);
       // button.onclick = startSim.bind(null, this.beeNum);
    
      /* but.addEventListener('click', (e) => {
        console.log(document.getElementById("beeInput").value);
        console.log('click');
        startSim.bind(null, document.getElementById("beeInput").value);
        
       });*/
      // var numB = document.getElementById("beeInput").value;
     //  document.getElementById('button').addEventListener("click", this.start(startSim));

    //document.getElementById("beeInput")
       
    }

    fun(){
       // console.log(document.getElementById("beeInput").value);
        this.beeNum = document.getElementById("beeInput").value;
        console.log(this.state.beeNum);
       
    }
    audio(){
        console.log(document.getElementById("audio").value);
    }

    /* start(startSim){
       // document.getElementById('button').addEventListener("click", startSim.bind(null, this.beeNum));
       console.log('hi');
       var input = document.getElementById("beeInput").value;
       startSim.bind(null, input);
     }*/
    
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

    createLabel(str, top) {

        const text = document.createElement('div');
        document.body.appendChild(text);
        text.innerHTML = str;
        text.style.fontFamily = 'Monaco';
        text.style.fontSize = '15px';
        text.style.position = 'absolute';
        text.style.left = ((window.innerWidth - text.clientWidth) / 2.5)  + 'px';
        text.style.top = top;

    
        return text;

    }


    createInput(fun) {

        const input = document.createElement('input');
        input.type = "text";
        input.id = 'beeInput';
        input.className = "css-class-name";
        input.value = 20;
        input.style.fontFamily = "Monaco";
        input.style.position = 'absolute';
        input.style.left = ((window.innerWidth - input.clientWidth) / 2)  + 'px';
        input.style.top = '45%';
        input.oninput = fun;

        document.body.appendChild(input);
        
        return input;

    }

    createDropdown(audio) {
        const dropdown = document.createElement('select');
        dropdown.name = "audio";
        dropdown.id = "audio";
        dropdown.style.fontFamily = 'Monaco';
        dropdown.style.borderColor = 'transparent';
        dropdown.style.backgroundColor = 'yellow';
        dropdown.style.cursor = 'pointer';

        var option1 = document.createElement('option');
        option1.value = "option1";
        option1.text = "bees in the trap";
        dropdown.appendChild(option1);
       var option2 = document.createElement('option');
        option2.value = "option2";
        option2.text = "buzzing";
        dropdown.appendChild(option2);
        dropdown.oninput = audio;
        document.body.appendChild(dropdown);
   
        dropdown.style.position = 'absolute';
        dropdown.style.left = (window.innerWidth - dropdown.clientWidth) / 2 + 'px';
        dropdown.style.top = '50%';
       
        return dropdown;
        
    }
   
    createButton(str, top, startSim) {
        const button = document.createElement('button');
        document.body.appendChild(button);
        button.innerHTML = str;
        button.id = "button";
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
       
      // button.onclick = start(startSim);
        button.onclick = startSim.bind(null, this.state.beeNum);
     
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
       // document.getElementById('button').addEventListener("click", startSim.bind(null, document.getElementById("beeInput").value));
        // Call update for each object in the updateList
       // this.beeNum = beeNum;
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



/*function start(startSim){
    // document.getElementById('button').addEventListener("click", startSim.bind(null, this.beeNum));
    console.log('hi');
    var input = document.getElementById("beeInput").value;
    startSim.bind(null, input);
  };*/

export default StartScene;
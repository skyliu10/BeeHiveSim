import { Group, Scene, Texture } from 'three';
import * as THREE from "three";

class Frame extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'frame';
        let scale = parent.state.scale;

        const backGeometry = new THREE.BoxGeometry(0.02, scale * 200, scale * 400);
        backGeometry.computeBoundingBox();

        const leftGeometry = new THREE.BoxGeometry(scale * 20, scale * 220, scale * 20);
        const rightGeometry = new THREE.BoxGeometry(scale * 20, scale * 220, scale * 20);
        const topGeometry = new THREE.BoxGeometry(scale * 20, scale * 20, scale * 380);
        const bottomGeometry = new THREE.BoxGeometry(scale * 20, scale * 20, scale * 380);

        leftGeometry.translate(0, 0, scale * 200);
        rightGeometry.translate(0, 0, scale * -200);
        topGeometry.translate(0, scale * 100, 0);
        bottomGeometry.translate(0, scale * -100, 0);

        const texture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/lessons/resources/images/compressed-but-large-wood-texture.jpg')
        const woodMaterial = new THREE.MeshBasicMaterial({ map:texture });
        //const woodMaterial = new THREE.MeshBasicMaterial({color:0xbf8b52});

        const leftMesh = new THREE.Mesh(leftGeometry, woodMaterial);
        const rightMesh = new THREE.Mesh(rightGeometry, woodMaterial);
        const topMesh = new THREE.Mesh(topGeometry, woodMaterial);
        const bottomMesh = new THREE.Mesh(bottomGeometry, woodMaterial);
        const backMesh = new THREE.Mesh(backGeometry, woodMaterial);

        this.add(leftMesh);
        this.add(rightMesh);
        this.add(topMesh);
        this.add(bottomMesh);
        this.add(backMesh);

        //this.bb = new THREE.Box3().copy(backGeometry.boundingBox);
        //var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
        //this.add(bbHelper);

    }

    update(timeStamp) {
        
    }

}

export default Frame;

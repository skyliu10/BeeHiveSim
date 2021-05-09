import { Group, Scene, Texture } from 'three';
import * as THREE from "three";

class Frame extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'frame';
        let scale = parent.state.scale;

        const backGeometry = new THREE.BoxGeometry(0.02, scale * 500, scale * 1000);
        backGeometry.computeBoundingBox();

        const leftGeometry = new THREE.BoxGeometry(scale * 50, scale * 550, scale * 50);
        const rightGeometry = new THREE.BoxGeometry(scale * 50, scale * 550, scale * 50);
        const topGeometry = new THREE.BoxGeometry(scale * 50, scale * 50, scale * 950);
        const bottomGeometry = new THREE.BoxGeometry(scale * 50, scale * 50, scale * 950);

        leftGeometry.translate(0, 0, scale * 500);
        rightGeometry.translate(0, 0, scale * -500);
        topGeometry.translate(0, scale * 250, 0);
        bottomGeometry.translate(0, scale * -250, 0);

        const texture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/lessons/resources/images/compressed-but-large-wood-texture.jpg')
        const woodMaterial = new THREE.MeshStandardMaterial({ map:texture });

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

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.bb = new THREE.Box3().copy(backGeometry.boundingBox);
        //var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
        //this.add(bbHelper);

    }

    update(timeStamp) {
        
    }

}

export default Frame;

import * as THREE from 'three'

export default class RenderCube {

    constructor(scene, gui) {
        this.scene = scene
        this.gui = gui
        this.options = {
            "Size": 2,
            "Spacing": .5
        }
        this.margem = this.options.Spacing+ this.options.Size
        this.gui.add(this.options,"Size",1, 5)
        this.gui.add(this.options,"Spacing",.2, 1)
    }

    render() {
        const mainCube = this.createBox(false, 'black');
        mainCube.box.material.wireframe = true;
        this.scene.add(mainCube.box)

        const axesRed = this.createBox(mainCube.box, 'red',{x: 0, y: this.margem, z: 0}, true);
        const axesPurple = this.createBox(mainCube.box, 'purple',{x: this.margem, y: 0, z: 0}, true);
        const axesGray = this.createBox(mainCube.box, 'gray',{x: 0, y: -this.margem, z: 0}, true);
        const axesBrown = this.createBox(mainCube.box, 'brown',{x: 0, y: 0, z: this.margem}, true);
        const axesYellow = this.createBox(mainCube.box, 'yellow',{x: -this.margem, y: 0, z: 0}, true);
        const axesGreen = this.createBox(mainCube.box, 'green',{x: 0, y: 0, z: -this.margem}, true);

        // AxesPurple
        const box1 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: 0, z: -this.margem});
        const box2 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: 0, z: this.margem});
        const box3 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: this.margem, z: 0});
        const box4 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: -this.margem, z: 0});
        const box5 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: this.margem, z: this.margem});
        const box6 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: this.margem, z: -this.margem});
        const box7 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: -this.margem, z: this.margem});
        const box8 = this.createBox(axesPurple.axes, 'purple',{x: 0, y: -this.margem, z: -this.margem});

        // AxesYellow
        const boxYellow1 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: 0, z: -this.margem});
        const boxYellow2 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: 0, z: this.margem});
        const boxYellow3 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: this.margem, z: 0});
        const boxYellow4 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: -this.margem, z: 0});
        const boxYellow5 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: this.margem, z: this.margem});
        const boxYellow6 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: this.margem, z: -this.margem});
        const boxYellow7 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: -this.margem, z: this.margem});
        const boxYellow8 = this.createBox(axesYellow.axes, 'yellow',{x: 0, y: -this.margem, z: -this.margem});

        // AxesGreen
        const boxGreen1 = this.createBox(axesGreen.axes, 'green',{x: 0, y: this.margem, z: 0});
        const boxGreen2 = this.createBox(axesGreen.axes, 'green',{x: 0, y: -this.margem, z: 0});

        // AxesGray
        const boxBrown1 = this.createBox(axesBrown.axes, 'brown',{x: 0, y: this.margem, z: 0});
        const boxBrown2 = this.createBox(axesBrown.axes, 'brown',{x: 0, y: -this.margem, z: 0});

        return {
            axesPurple: axesPurple.axes,
            axesRed: axesRed.axes,
            axesGray: axesGray.axes,
            axesBrown: axesBrown.axes,
            axesYellow: axesYellow.axes,
            axesGreen: axesGreen.axes,
        }
    }


    createBox(boxMain = false, color, position = false, axesEnabled = false) {
        const geometric = new THREE.BoxGeometry(this.options.Size,this.options.Size,this.options.Size,this.options.Size);
        const texture = new THREE.MeshStandardMaterial({color})
        const box = new THREE.Mesh(geometric, texture)


        if (position && !axesEnabled) {
            box.position.x = position.x
            box.position.y = position.y
            box.position.z = position.z
        }
        let axes = null
        if (axesEnabled) {
            axes = new THREE.Object3D();
            axes.add(box)
            axes.position.x = position.x
            axes.position.y = position.y
            axes.position.z = position.z
        }
        if (boxMain) {
            if (axesEnabled) boxMain.add(axes)
            else boxMain.add(box)
        }

        return {box, axes}
    }
}

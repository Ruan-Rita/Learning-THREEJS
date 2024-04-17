import * as THREE from 'three'

export default class RenderCube {

    options = {
        "Size": 2,
        "Spacing": .4,
        "ActionPurple": false,
        "ActionRed": false,
        "ActionGray": false,
        "ActionBrown": false,
        "ActionYellow": false,
        "ActionGreen": false,
    }
    margem = this.options.Spacing + this.options.Size

    constructor(scene, gui, camera) {
        this.scene = scene
        this.gui = gui
        this.camera = camera
        this.gui.add(this.options,"Size",1, 5)
        this.gui.add(this.options,"Spacing",.2, 1)
    }
    /**
     * [1] [2] [3]
     * [4] [A] [6]
     * [7] [8] [9]
     */
    positionAxes = {
        axesYellow: {
            name: 'Yellow',
            1: {x: 0,y: this.margem, z: - this.margem},
            2: {x: 0,y: this.margem, z: 0},
            3: {x: 0,y: this.margem, z: this.margem},
            4: {x: 0,y: 0, z: -this.margem},
            6: {x: 0,y: 0, z: this.margem},
            7: {x: 0,y: -this.margem, z: -this.margem},
            8: {x: 0,y: -this.margem, z: 0},
            9: {x: 0,y: -this.margem, z: this.margem},
        },
        axesPurple: {
            name: 'Purple',
            1: {x: 0,y: this.margem, z: this.margem},
            2: {x: 0,y: this.margem, z: 0},
            3: {x: 0,y: this.margem, z: -this.margem},
            4: {x: 0,y: 0, z: this.margem},
            6: {x: 0,y: 0, z: -this.margem},
            7: {x: 0,y: -this.margem, z: this.margem},
            8: {x: 0,y: -this.margem, z: 0},
            9: {x: 0,y: -this.margem, z: -this.margem},
        },
        axesGray: {
            name: 'Gray',
            1: {x: this.margem, y: 0, z: this.margem},
            2: {x: this.margem, y: 0, z: 0},
            3: {x: this.margem, y: 0, z: -this.margem},
            4: {x: 0, y: 0, z: this.margem},
            6: {x: 0, y: 0, z: -this.margem},
            7: {x: -this.margem, y: 0, z: this.margem},
            8: {x: -this.margem, y: 0, z: 0},
            9: {x: -this.margem, y: 0, z: -this.margem},
        },
        axesRed: {
            name: 'Red',
            1: {x: -this.margem, y: 0, z: this.margem},
            2: {x: -this.margem, y: 0, z: 0},
            3: {x: -this.margem, y: 0, z: -this.margem},
            4: {x: 0, y: 0, z: this.margem},
            6: {x: 0, y: 0, z: -this.margem},
            7: {x: this.margem, y: 0, z: this.margem},
            8: {x: this.margem, y: 0, z: 0},
            9: {x: this.margem, y: 0, z: -this.margem},
        },
        axesGreen: {
            name: 'Green',
            1: {x: this.margem,y: this.margem,z: 0},
            2: {x: 0,y: this.margem,z: 0},
            3: {x: -this.margem,y: this.margem,z: 0},
            4: {x: this.margem,y: 0,z: 0},
            6: {x: -this.margem,y: 0,z: 0},
            7: {x: this.margem,y: -this.margem,z: 0},
            8: {x: 0,y: -this.margem,z: 0},
            9: {x: -this.margem,y: -this.margem,z: 0},
        },
        axesBrown: {
            name: 'Brown',
            1: {x: -this.margem,y: this.margem,z: 0},
            2: {x: 0,y: this.margem,z: 0},
            3: {x: this.margem,y: this.margem,z: 0},
            4: {x: -this.margem,y: 0,z: 0},
            6: {x: this.margem,y: 0,z: 0},
            7: {x: -this.margem,y: -this.margem,z: 0},
            8: {x: 0,y: -this.margem,z: 0},
            9: {x: this.margem,y: -this.margem,z: 0},
        }
    }

    render() {
        this.mainCube = this.createBox(false, 'black');
        this.mainCube.box.material.wireframe = true;
        this.scene.add(this.mainCube.box)

        this.axesRed = this.createBox(this.mainCube.box, 'red',{x: 0, y: this.margem, z: 0}, true);
        this.axesPurple = this.createBox(this.mainCube.box, 'purple',{x: this.margem, y: 0, z: 0}, true);
        this.axesGray = this.createBox(this.mainCube.box, 'gray',{x: 0, y: -this.margem, z: 0}, true);
        this.axesBrown = this.createBox(this.mainCube.box, 'brown',{x: 0, y: 0, z: this.margem}, true);
        this.axesYellow = this.createBox(this.mainCube.box, 'yellow',{x: -this.margem, y: 0, z: 0}, true);
        this.axesGreen = this.createBox(this.mainCube.box, 'green',{x: 0, y: 0, z: -this.margem}, true);

        // names
        this.axesRed.axes.name = 'Red';
        this.axesPurple.axes.name = 'Purple';
        this.axesGray.axes.name = 'Gray';
        this.axesBrown.axes.name = 'Brown';
        this.axesYellow.axes.name = 'Yellow';
        this.axesGreen.axes.name = 'Green';

        // AxesPurple
        this.box1 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[1]);
        this.box2 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[2]);
        this.box3 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[3]);
        this.box4 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[4]);
        this.box6 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[6]);
        this.box7 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[7]);
        this.box8 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[8]);
        this.box9 = this.createBox(this.axesPurple.axes, 'purple',this.positionAxes.axesPurple[9]);

        // AxesYellow
        this.boxYellow1 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[1]);
        this.boxYellow2 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[2]);
        this.boxYellow3 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[3]);
        this.boxYellow4 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[4]);
        this.boxYellow6 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[6]);
        this.boxYellow7 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[7]);
        this.boxYellow8 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[8]);
        this.boxYellow9 = this.createBox(this.axesYellow.axes, 'yellow',this.positionAxes.axesYellow[9]);

        // AxesGreen
        this.boxGreen2 = this.createBox(this.axesGreen.axes, 'green',this.positionAxes.axesGreen[2]);
        this.boxGreen8 = this.createBox(this.axesGreen.axes, 'green',this.positionAxes.axesGreen[8]);

        // AxesBrown
        this.boxBrown2 = this.createBox(this.axesBrown.axes, 'brown',this.positionAxes.axesBrown[2]);
        this.boxBrown8 = this.createBox(this.axesBrown.axes, 'brown',this.positionAxes.axesBrown[8]);

        // test

        this.guiAxesAction()


        return {
            axesPurple: this.axesPurple.axes,
            axesRed: this.axesRed.axes,
            axesGray: this.axesGray.axes,
            axesBrown: this.axesBrown.axes,
            axesYellow: this.axesYellow.axes,
            axesGreen: this.axesGreen.axes,
        }
    }
    guiAxesAction() {
        let zBrown = 0
        let zRed = 0
        let zYellow = 0
        let zPurple = 0
        let zGray = 0
        let zGreen = 0
        const degree = 90;

        this.gui.add(this.options,'ActionPurple').onChange(value => {
            this.movePurple()
            zPurple += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(zPurple,0,0, "XYZ")
            this.axesPurple.axes.setRotationFromEuler(euler)
        });
        this.gui.add(this.options,'ActionRed').onChange(value => {
            this.moveRed()
            zRed += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(0,zRed,0, "XYZ")
            this.axesRed.axes.setRotationFromEuler(euler)
        });
        this.gui.add(this.options,'ActionGray').onChange(value => {
            this.moveGray()
            zGray += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(0,zGray,0, "XYZ")
            this.axesGray.axes.setRotationFromEuler(euler)
        });
        this.gui.add(this.options,'ActionBrown').onChange(value => {
            this.moveBrownImproved();
            zBrown += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(0,0,zBrown, "XYZ")
            this.axesBrown.axes.setRotationFromEuler(euler)
        });
        this.gui.add(this.options,'ActionYellow').onChange(value => {
            this.moveYellow()
            // this.moveYellowImproved()
            zYellow += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(zYellow,0,0, "XYZ")
            this.axesYellow.axes.setRotationFromEuler(euler)
        });
        this.gui.add(this.options,'ActionGreen').onChange(value => {
            this.moveGreen();
            zGreen += THREE.MathUtils.degToRad(degree);
            const euler = new THREE.Euler(0,0,zGreen, "XYZ")
            this.axesGreen.axes.setRotationFromEuler(euler)
        });
    }

    moveBrown() {
        this.axesBrown.axes.add(this.boxYellow3.box)
        this.axesBrown.axes.add(this.boxYellow6.box)
        this.axesBrown.axes.add(this.boxYellow9.box)
        this.help(this.boxYellow3.box, this.positionAxes.axesBrown[1])
        this.help(this.boxYellow6.box, this.positionAxes.axesBrown[4])
        this.help(this.boxYellow9.box, this.positionAxes.axesBrown[7])

        this.axesBrown.axes.add(this.box1.box)
        this.axesBrown.axes.add(this.box4.box)
        this.axesBrown.axes.add(this.box7.box)
        this.help(this.box1.box, this.positionAxes.axesBrown[3])
        this.help(this.box4.box, this.positionAxes.axesBrown[6])
        this.help(this.box7.box, this.positionAxes.axesBrown[9])

        this.axesBrown.axes.add(this.boxBrown2)
        this.axesBrown.axes.add(this.boxBrown8)
        this.help(this.boxBrown2.box, this.positionAxes.axesBrown[2])
        this.help(this.boxBrown8.box, this.positionAxes.axesBrown[8])
        console.log('this.axesBrown', this.axesBrown.axes.children);
    }

    searchCube(related, arrayAxes, numberPosition) {
        let foundCube = false
        for (let i = 0; i < arrayAxes.length; i++) {
            let relationName;
            let currentPositionAxes;

            if (related == 'Brown') {
                if (arrayAxes[i].axes.name == 'Red') {
                    relationName = 'BrownRed';
                    currentPositionAxes = this.positionAxes.axesRed
                }
                if (arrayAxes[i].axes.name == 'Yellow') {
                    relationName = 'BrownYellow';
                    currentPositionAxes = this.positionAxes.axesYellow
                }
                if (arrayAxes[i].axes.name == 'Purple') {
                    relationName = 'BrownPurple';
                    currentPositionAxes = this.positionAxes.axesPurple
                }
                if (arrayAxes[i].axes.name == 'Gray') {
                    relationName = 'BrownGray';
                    currentPositionAxes = this.positionAxes.axesGreen
                }

                let relation = this.positionRelation[relationName];
                let numberCubeThisCurrentAxes = relation[numberPosition];

                console.log('positionAxes da relacao brom com '+relationName)
                console.log('Brown Position: '+ numberPosition);
                console.log(relationName +' Position: '+ numberCubeThisCurrentAxes);

                if (numberCubeThisCurrentAxes) {
                    for (let iterate = 0; iterate < arrayAxes[i].axes.children.length; iterate++) {
                        const searchCube = arrayAxes[i].axes.children[iterate];
                        console.log("Cubos", arrayAxes[i].axes.children)
                        let {x,y,z} = currentPositionAxes[numberCubeThisCurrentAxes];
                        console.log({x,y,z}, 'eles é a posicao do red que eu quero');
                        if (searchCube.position.x == x && searchCube.position.y == y && searchCube.position.z == z  ) {
                            foundCube = searchCube;
                            arrayAxes[i].axes.remove(foundCube)
                            break;
                        }
                    }
                }
            }
            if (foundCube) {
                break;
            }
        }
        return foundCube;
    }
    positionRelation = {
        BrownRed: {
            1: 1,
            2: 4,
            3: 7,
        },
        BrownYellow: {
            1: 3,
            4: 6,
            7: 9
        },
        BrownPurple: {
            3: 1,
            6: 4,
            9: 7
        },
        BrownGray: {
            7: 1,
            8: 4,
            9: 7
        }
    }
    moveBrownImproved() {
        //             red
        //              |
        // yellow  <-  brown  ->  purple
        //              |
        //             gray
        const cubes = {}
        const ajustPosition = []
        console.log('Start search cubes in axesBrown', cubes)

        for (let iterate = 0; iterate < this.axesBrown.axes.children.length; iterate++) {
            const cube = this.axesBrown.axes.children[iterate];
            Object.keys(this.positionAxes.axesBrown).forEach(numberCube => {
                let {x,y,z} = this.positionAxes.axesBrown[numberCube]
                if (cube.position.x == x && cube.position.y == y && cube.position.z == z  ) {
                    cubes[numberCube] = cube;
                }
            })
        }
        console.log('Find current cubes in axes brown', cubes)
        if (Object.keys(this.positionAxes.axesBrown).length !== 8) {
            // which cubes are they missing?
            for (let i = 1; i <= 9; i++) {
                // axes
                if (i==5) continue;
                // found cube
                console.log('Found Cube', cubes[i])
                if (cubes[i]) continue;
                cubes[i] = this.searchCube('Brown', [
                    this.axesRed, this.axesYellow, this.axesPurple, this.axesGray
                ], i);
                ajustPosition[i] = this.positionAxes.axesBrown[i]
                // console.log('After search: cubes[i]', cubes[i])
            }
        }
        console.log('LOGG final quanto cubos foram achados', cubes);

        for (let i = 1; i <= 9; i++) {
            // axes
            if (i==5) continue;
            console.log('so para saber', cubes[i]);
            this.axesBrown.axes.add(cubes[i]);
            if (ajustPosition[i]) {
                this.help(cubes[i], ajustPosition[i])
            }
        }
    }
    moveYellowImproved() {
        //             red
        //              |
        // green  <-  yellow  ->  Brown
        //              |
        //             gray
        const cubes = {}
        const ajustPosition = []
        console.log('Start search cubes in axesYellow', cubes)

        for (let iterate = 0; iterate < this.axesYellow.axes.children.length; iterate++) {
            const cube = this.axesYellow.axes.children[iterate];
            Object.keys(this.positionAxes.axesYellow).forEach(numberCube => {
                let {x,y,z} = this.positionAxes.axesYellow[numberCube]
                if (cube.position.x == x && cube.position.y == y && cube.position.z == z  ) {
                    cubes[numberCube] = cube;
                }
            })
        }
        console.log('Find current cubes in axes yellow', cubes)
        if (Object.keys(this.positionAxes.axesYellow).length !== 8) {
            // which cubes are they missing?
            for (let i = 1; i <= 9; i++) {
                // axes
                if (i==5) continue;
                // found cube
                console.log('Found Cube', cubes[i])
                if (cubes[i]) continue;
                cubes[i] = this.searchCube('Yellow', [
                    this.axesRed, this.axesYellow, this.axesPurple, this.axesGray
                ], i);
                ajustPosition[i] = this.positionAxes.axesYellow[i]
                // console.log('After search: cubes[i]', cubes[i])
            }
        }
        console.log('LOGG final quanto cubos foram achados', cubes);

        for (let i = 1; i <= 9; i++) {
            // axes
            if (i==5) continue;
            console.log('so para saber', cubes[i]);
            this.axesYellow.axes.add(cubes[i]);
            if (ajustPosition[i]) {
                this.help(cubes[i], ajustPosition[i])
            }
        }
    }
    moveGreen() {
        this.axesGreen.axes.add(this.boxYellow1.box)
        this.axesGreen.axes.add(this.boxYellow4.box)
        this.axesGreen.axes.add(this.boxYellow7.box)
        this.help(this.boxYellow1.box, this.positionAxes.axesGreen[3])
        this.help(this.boxYellow4.box, this.positionAxes.axesGreen[6])
        this.help(this.boxYellow7.box, this.positionAxes.axesGreen[9])

        this.axesGreen.axes.add(this.box3.box)
        this.axesGreen.axes.add(this.box6.box)
        this.axesGreen.axes.add(this.box9.box)
        this.help(this.box3.box, this.positionAxes.axesGreen[1])
        this.help(this.box6.box, this.positionAxes.axesGreen[4])
        this.help(this.box9.box, this.positionAxes.axesGreen[7])

        this.axesGreen.axes.add(this.boxGreen2)
        this.axesGreen.axes.add(this.boxGreen8)
        this.help(this.boxGreen2.box, this.positionAxes.axesGreen[2])
        this.help(this.boxGreen8.box, this.positionAxes.axesGreen[8])
    }

    moveRed() {
        this.axesRed.axes.add(this.boxYellow1.box)
        this.axesRed.axes.add(this.boxYellow2.box)
        this.axesRed.axes.add(this.boxYellow3.box)
        this.help(this.boxYellow1.box, this.positionAxes.axesRed[3])
        this.help(this.boxYellow2.box, this.positionAxes.axesRed[2])
        this.help(this.boxYellow3.box, this.positionAxes.axesRed[1])

        this.axesRed.axes.add(this.box1.box)
        this.axesRed.axes.add(this.box2.box)
        this.axesRed.axes.add(this.box3.box)
        this.help(this.box1.box, this.positionAxes.axesRed[7])
        this.help(this.box2.box, this.positionAxes.axesRed[8])
        this.help(this.box3.box, this.positionAxes.axesRed[9])

        this.axesRed.axes.add(this.boxBrown2.box)
        this.help(this.boxBrown2.box, this.positionAxes.axesRed[4])

        this.axesRed.axes.add(this.boxGreen2.box)
        this.help(this.boxGreen2.box, this.positionAxes.axesRed[6])
    }
    moveGray() {
        this.axesGray.axes.add(this.boxYellow7.box)
        this.axesGray.axes.add(this.boxYellow8.box)
        this.axesGray.axes.add(this.boxYellow9.box)
        this.help(this.boxYellow7.box, this.positionAxes.axesGray[7])
        this.help(this.boxYellow8.box, this.positionAxes.axesGray[8])
        this.help(this.boxYellow9.box, this.positionAxes.axesGray[9])

        this.axesGray.axes.add(this.box7.box)
        this.axesGray.axes.add(this.box8.box)
        this.axesGray.axes.add(this.box9.box)
        this.help(this.box7.box, this.positionAxes.axesGray[1])
        this.help(this.box8.box, this.positionAxes.axesGray[2])
        this.help(this.box9.box, this.positionAxes.axesGray[3])

        this.axesGray.axes.add(this.boxBrown8.box)
        this.help(this.boxBrown8.box, this.positionAxes.axesGray[4])

        this.axesGray.axes.add(this.boxGreen8.box)
        this.help(this.boxGreen8.box, this.positionAxes.axesGray[6])
    }
    movePurple() {
        this.axesPurple.axes.add(this.box1.box)
        this.axesPurple.axes.add(this.box2.box)
        this.axesPurple.axes.add(this.box3.box)
        this.axesPurple.axes.add(this.box4.box)
        this.axesPurple.axes.add(this.box6.box)
        this.axesPurple.axes.add(this.box7.box)
        this.axesPurple.axes.add(this.box8.box)
        this.axesPurple.axes.add(this.box9.box)
        this.help(this.box1.box, this.positionAxes.axesPurple[1])
        this.help(this.box2.box, this.positionAxes.axesPurple[2])
        this.help(this.box3.box, this.positionAxes.axesPurple[3])
        this.help(this.box4.box, this.positionAxes.axesPurple[4])
        this.help(this.box6.box, this.positionAxes.axesPurple[6])
        this.help(this.box7.box, this.positionAxes.axesPurple[7])
        this.help(this.box8.box, this.positionAxes.axesPurple[8])
        this.help(this.box9.box, this.positionAxes.axesPurple[9])
    }
    moveYellow() {
        console.log('ASsim e o yellow', this.boxYellow1.box)
        this.axesYellow.axes.add(this.boxYellow1.box)
        this.axesYellow.axes.add(this.boxYellow2.box)
        this.axesYellow.axes.add(this.boxYellow3.box)
        this.axesYellow.axes.add(this.boxYellow4.box)
        this.axesYellow.axes.add(this.boxYellow6.box)
        this.axesYellow.axes.add(this.boxYellow7.box)
        this.axesYellow.axes.add(this.boxYellow8.box)
        this.axesYellow.axes.add(this.boxYellow9.box)
        this.help(this.boxYellow1.box, this.positionAxes.axesYellow[1])
        this.help(this.boxYellow2.box, this.positionAxes.axesYellow[2])
        this.help(this.boxYellow3.box, this.positionAxes.axesYellow[3])
        this.help(this.boxYellow4.box, this.positionAxes.axesYellow[4])
        this.help(this.boxYellow6.box, this.positionAxes.axesYellow[6])
        this.help(this.boxYellow7.box, this.positionAxes.axesYellow[7])
        this.help(this.boxYellow8.box, this.positionAxes.axesYellow[8])
        this.help(this.boxYellow9.box, this.positionAxes.axesYellow[9])
    }

    help(element, position) {
        element.position.x = position.x
        element.position.y = position.y
        element.position.z = position.z
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

    showLineDirections(directionVector, objectOfInterest) {
        // Create a LineGeometry to represent the vector as a line
        var lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), directionVector]);

        // Create a material for the line (you can customize the color and style)
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color

        // Create the line mesh
        var line = new THREE.Line(lineGeometry, lineMaterial);

        // Add the line to the scene
        objectOfInterest.add(line);
    }

    getNearestObject(objectOfInterest) {
        // Get the position of the object
        var origin = new THREE.Vector3();
        objectOfInterest.getWorldPosition(origin);

        // Define directions (8 directions)
        var directions = [
            new THREE.Vector3(0, -30, 0), // Forward
            new THREE.Vector3(0, 30, 0), // Backward
            new THREE.Vector3(30, 0, 0), // Right
            new THREE.Vector3(-30, 0, 0), // Left
            new THREE.Vector3(30, -30, 0), // Forward Right
            new THREE.Vector3(-30, -30, 0), // Forward Left
            new THREE.Vector3(30, 30, 0), // Backward Right
            new THREE.Vector3(-30, 30, 0) // Backward Left
        ];

        // Array to hold intersection results
        var allIntersections = [];

        // Iterate over each direction
        for (var i = 0; i < directions.length; i++) {
            // Create a raycaster from the object's position in the current direction
            var raycaster = new THREE.Raycaster(origin, directions[i],0, 100);
            // this.showLineDirections(directions[i], objectOfInterest)
            // Find intersections with scene objects
            var intersects = raycaster.intersectObjects(this.scene.children, true);

            // Push intersections to the array
            allIntersections.push(...intersects);
        }

        // Sort intersections by distance
        allIntersections.sort((a, b) => a.distance - b.distance);

        // If there are intersections
        if (allIntersections.length > 0) {
            // The first intersection will be the nearest object
            var nearestObject = allIntersections[0].object;
            console.log("Nearest object:", nearestObject);
        } else {
            console.log("No intersections found.");
        }
    }
}

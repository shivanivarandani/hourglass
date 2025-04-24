// No import statements — use global Enable3D classes directly

class MainScene extends ENABLE3D.Scene3D {
    constructor() {
      super('MainScene')
    }
  
    async init() {
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  
    async create() {

          // Load a GLTF model
  this.load.gltf('./assets/hourglass.glb').then(gltf => {
    this.scene.add(gltf.scene)
    
    const doodats = this.scene.getObjectByName('doodats')

    if (doodats) {
      doodats.traverse(child => {
        if (child.isMesh) {
          this.physics.add.existing(child, {
            shape: 'convex', // or 'convex' or 'mesh' depending on your need
            mass: 1
          })
        }
      })
    }

    const top = this.scene.getObjectByName("top1")
    const bottom = this.scene.getObjectByName("bottom")
    const glass = this.scene.getObjectByName("glass")

    this.physics.add.existing(top, {
      shape: 'convex', // or 'convex' or 'mesh' depending on your need
      collisionFlags:1
    })
    this.physics.add.existing(bottom, {
      shape: 'convex', // or 'convex' or 'mesh' depending on your need
      collisionFlags:1
    })
    this.physics.add.existing(glass, {
      shape: 'concave', // or 'convex' or 'mesh' depending on your need
      collisionFlags:1
    })


    

  })
  




      this.warpSpeed()
      //this.physics.debug.enable()

      this.camera.lookAt(0,2,0)
        
      this.camera.position.set(1, 1, 1)

      


  
      //this.add.box({ y: 2 }, { lambert: { color: 'skyblue' } })
      //this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })
  
      //this.box = this.add.box({ y: 4 }, { lambert: { color: 'green' } })
    }
  
    update() {

    }
  }
  
  // Boot project
  ENABLE3D.PhysicsLoader('./lib/ammo', () => {
    new ENABLE3D.Project({ scenes: [MainScene] })
  })
  
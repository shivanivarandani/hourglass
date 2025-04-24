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
    gltf.scene.position.set(0, 1, 0)

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

    
    const colliderNames = ['glass', 'top_bottom']

    colliderNames.forEach(name => {
      const obj = this.scene.getObjectByName(name)
      if (obj) {
        obj.traverse(child => {
          if (child.isMesh) {
            this.physics.add.existing(child, {
              shape: 'box',
              mass: 0
            })
          }
        })
      }
    

  })

})


      this.warpSpeed()
      //this.physics.debug.enable()
  
      this.camera.position.set(1, 2, 2)
  
      //this.add.box({ y: 2 }, { lambert: { color: 'skyblue' } })
      //this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })
  
      //this.box = this.add.box({ y: 4 }, { lambert: { color: 'green' } })
    }
  
    update() {
      if (this.box) {
        this.box.rotation.x += 0.01
        this.box.rotation.y += 0.01
      }
    }
  }
  
  // Boot project
  ENABLE3D.PhysicsLoader('./lib/ammo', () => {
    new ENABLE3D.Project({ scenes: [MainScene] })
  })
  
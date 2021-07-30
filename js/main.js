// init game variables
let score = 0;
let pacManAttck = false;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

AFRAME.registerComponent('ghost', {
  schema: {
    speed: {
      type: 'number',
      default: 1.2
    }
  },

  init: function() {
    this.target = document.querySelector("#target")
    // this.el.components["dynamic-body"].syncToPhysics();

    this.el.addEventListener('collide', function (e) {
      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

      if (e.detail.body.el.className === "wall"){
        const currentPosition = this.el.object3D.position;
        // this.el.object3D.position.set(randX, randY, z);
        this.el.object3D.position.x -+ 0.2;
        this.el.object3D.position.z -+ 0.2;
      }

      if (e.detail.body.el.className === "ghost"){
        const currentPosition = this.el.object3D.position;
        // this.el.object3D.position.set(randX, randY, z);
        this.el.object3D.position.x =+ 0.2;
        this.el.object3D.position.z =+ 0.2;
      }

      if (e.detail.body.el.className === "pacman") {

        // reset here / lose life

        // const pacman = document.querySelector('a-sphere');
        // let pacmanRemove = e.detail.body.el;
        // pacman.parentNode.removeChild(pacmanRemove);
        // loseLife();
        // score++;
        // console.log(score);
        // document.getElementById('pickup').play();
      }
    })

  },

  tick: function(t, dt) {
    const currentPosition = this.el.object3D.position;
    const distanceToTarget = currentPosition.distanceTo(target.object3D.position);
    // console.log(currentPosition.x );
    // if (distanceToTarget > 6){

      let x = currentPosition.x;
      let y = currentPosition.y;
      let z = currentPosition.z;
      let rand = getRandomInt(0,1)
      let randX=  x+rand;
      let randZ=  z+rand;
      // this.el.object3D.position.set(randX, randY, z);
      this.el.object3D.position.x += rand;
     this.el.object3D.position.z += rand;
    //   if (this.el.components["dynamic-body"]) {
    //     //required for dynamic body otherwise doesn't work
    //     this.el.components["dynamic-body"].syncToPhysics()
    //   // }
    // }

    if (distanceToTarget < 1) return;
    // seek player function
    const targetPos = this.el.object3D.worldToLocal(target.object3D.position.clone())
    const distance = dt*this.data.speed / 4000;
    this.el.object3D.translateOnAxis(targetPos, distance);
    if (this.el.components["dynamic-body"]) {
      //required for dynamic body otherwise doesn't work
      this.el.components["dynamic-body"].syncToPhysics()
    }

  }


})

AFRAME.registerComponent('pacman', {

  init: function() {
    this.el.addEventListener('collide', function (e) {
      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

      if (e.detail.body.el.className === "coin") {
        const box = document.querySelector('a-sphere');
        let winboxRemove = e.detail.body.el;
        box.parentNode.removeChild(winboxRemove);
        score++;
        console.log(score);
        // document.getElementById('pickup').play();
      }

      if (e.detail.body.el.className === "ghost" && pacManAttck === true) {
        console.log("ghost");
        const ghost = document.querySelector('a-sphere');
        let ghostRemove = e.detail.body.el;
        ghost.parentNode.removeChild(ghostRemove);
        // loseLife();
        // document.getElementById('pickup').play();
      }

    });
  },

})


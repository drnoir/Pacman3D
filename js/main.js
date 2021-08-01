// init game variables
let score = 0;
let pacManAttck = false;
let orgColourBoolean = true;

const coinCount = document.querySelectorAll("coin").length;
console.log(coinCount);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function MakeLarge(){
  console.log("attack on");
  const delayInMilliseconds = 10000; //1 second
  pacManAttck = true;
  orgColourBoolean = false;
  setTimeout(function() {
    pacManAttck = false;
    orgColourBoolean = true;
    console.log("attack off");
  }, delayInMilliseconds);

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
    const targetPos = this.el.object3D.worldToLocal(target.object3D.position.clone())
    const distance = dt*this.data.speed / 3000;
    const orgColour = this.el.getAttribute('color');

    this.el.object3D.translateOnAxis(targetPos, distance);

    if (distanceToTarget < 1) return;
    // seek player function
    this.el.object3D.translateOnAxis(targetPos, distance);

    if (this.el.components["dynamic-body"]) {
      //required for dynamic body otherwise doesn't work
      this.el.components["dynamic-body"].syncToPhysics()
    }

    // color setting for ghosts when pacman is in attack mode
    // (IN TICK SEEMS INEFFICIENT BUT CANT FIGURE ALT WAY RIGHT NOW)

    if (pacManAttck === true && orgColourBoolean === false){
      this.el.setAttribute('color','blue');
    }

    if (pacManAttck === false && orgColourBoolean === true){
      console.log(orgColour)
      this.el.setAttribute('color',orgColour);
    }
  },
})


AFRAME.registerComponent('pacman', {
  init: function() {
    this.el.addEventListener('collide', function (e) {
      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

      if (e.detail.body.el.className === "coin" ) {
        const box = document.querySelector('a-sphere');
        let winboxRemove = e.detail.body.el;
        box.parentNode.removeChild(winboxRemove);
        score++;
        console.log(score);
        document.getElementById('chomp').play();
      }

      if (e.detail.body.el.className === "coinLarge" ) {
        const box = document.querySelector('a-sphere');
        let winboxRemove = e.detail.body.el;
        box.parentNode.removeChild(winboxRemove);
        MakeLarge();
        score++;
        console.log(score);
        document.getElementById('chomp').play();
      }

      if (e.detail.body.el.className === "ghost" && pacManAttck === true) {
        console.log("ghost");
        const ghost = document.querySelector('a-sphere');
        let ghostRemove = e.detail.body.el;
        ghost.parentNode.removeChild(ghostRemove);
        // loseLife();
        document.getElementById('eatghost').play();
      }

    });
  },

})


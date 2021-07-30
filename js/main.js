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
  },
  tick: function(t, dt) {
    var currentPosition = this.el.object3D.position;
    var distanceToTarget = currentPosition.distanceTo(target.object3D.position);
    if (distanceToTarget < 1) return;
    // seek player function ?
    var targetPos = this.el.object3D.worldToLocal(target.object3D.position.clone())
    var distance = dt*this.data.speed / 4000;
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
      console.log('Pacman has collided with ', e.detail.body.el);
      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
      console.log('NAME' + e.detail.body.el.className);

      if (e.detail.body.el.className === "coin") {
        console.log("coin");
        const box = document.querySelector('a-sphere');
        let winboxRemove = e.detail.body.el;
        box.parentNode.removeChild(winboxRemove);
        // document.getElementById('pickup').play();
      }
    });
  },

})


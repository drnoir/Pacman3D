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



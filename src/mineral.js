import * as gfx from './gfx.js';
import bus from './bus.js';
import * as canvas from './canvas.js';

function Mineral(engine, tick, slot, type) {
  var anim = Math.random() * 100;
  this.x = 0;
  this.y = 0;
  var homing = false;
  var ht = 0;

  bus.on('mine', () => {
    homing = true;
    bus.emit('poof', {x: this.x, y: this.y, color: [255,130,255], size: 0.6, t: 0.3});
  })

  this.update = (dT) => {
    anim += dT * 1.0;
    if (homing) {
      var dx = engine.getShipX() - this.x;
      var dy = engine.getShipY() - this.y;
      var m = Math.sqrt(dx*dx+dy*dy);
      var s = canvas.width() * ht;
      ht += dT;
      this.x += dx/m*s*dT;
      this.y += dy/m*s*dT;
    } else {
      this.x = engine.laneX(tick);
      this.y = engine.laneY(slot);
    }
    if (engine.getTick() > tick + 6) {
      this.destroyed = true;
    }
    if (engine.closeToShip(this.x, this.y, 1)) {
      this.destroyed = true;
      bus.emit('mineral', 1);
    }
  }
  this.render = (ctx) => {
    gfx.drawMineral(ctx, this.x, this.y, anim, engine.laneScale() * 0.4);
  }
}
export default Mineral;
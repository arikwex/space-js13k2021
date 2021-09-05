import * as gfx from './gfx.js';
import bus from './bus.js';

function Mineral(engine, tick, slot, type) {
  var anim = Math.random() * 100;
  this.x = 0;
  this.y = 0;

  this.update = (dT) => {
    anim += dT * 1.0;
    this.x = engine.laneX(tick);
    this.y = engine.laneY(slot);
    if (engine.getTick() > tick + 6) {
      this.destroyed = true;
    }
    if (engine.closeToShip(tick, slot, 1)) {
      this.destroyed = true;
      bus.emit('mineral', 1);
    }
  }
  this.render = (ctx) => {
    gfx.drawMineral(ctx, this.x, this.y, anim, engine.laneScale() * 0.4);
  }
}
export default Mineral;
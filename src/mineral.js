import * as gfx from './gfx.js';
import bus from './bus.js';

function Mineral(engine, tick, slot, type) {
  var anim = Math.random() * 100;

  this.update = (dT) => {
    anim += dT * 1.0;
    if (engine.getTick() > tick + 6) {
      this.destroyed = true;
    }
    if (engine.closeToShip(tick, slot, 1)) {
      this.destroyed = true;
      bus.emit('mineral', 1);
    }
  }
  this.render = (ctx) => {
    gfx.drawMineral(ctx, engine.laneX(tick), engine.laneY(slot), anim, engine.laneScale() * 0.4);
  }
}
export default Mineral;
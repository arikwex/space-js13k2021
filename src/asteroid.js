import * as canvas from './canvas.js';
import bus from './bus.js';

function Asteroid(engine, tick, slot) {
  this.update = (dT) => {
    if (engine.getTick() > tick + 6) {
      this.destroyed = true;
    }
  }
  this.render = (ctx) => {
    ctx.save();
    ctx.translate(engine.laneX(tick), engine.laneY(slot));
    var s = engine.laneScale() * 1.0;
    ctx.fillStyle = '#a55';
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, 6.29);
    ctx.fill();
    ctx.restore();
  }
}
export default Asteroid;
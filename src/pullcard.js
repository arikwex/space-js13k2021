import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function PullCard(x, y, card, cs, slot) {
  var anim = -2;

  this.update = (dT) => {
    anim += dT * 3;
    if (anim > 1) {
      this.destroyed = true;
      bus.emit('place', {slot, card});
    }
  }
  this.render = (ctx) => {
    var p = Math.min(Math.max(anim, 0), 1);
    gfx.drawCard(
      ctx,
      x * p * p + canvas.width()/2 * (1 - p * p),
      y * p * p + canvas.height() * (1 - p * p),
      cs * p,
      card,
      false,
      p
    );
  }
}
export default PullCard;
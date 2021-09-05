import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';

function Projectile(engine, x, y, targetLane, projectileType) {
  var anim = 0;
  this.x = x;
  this.y = y;

  this.update = (dT) => {
    anim += dT * 1.0;
    this.x += dT * canvas.width() / 2;
    if (anim > 4) {
      this.destroyed = true;
    }
    if (engine.collideTargets(this.x, this.y, 1.5)) {
      this.destroyed = true;
      bus.emit('poof', {x: this.x, y: this.y, color: [255,200,100], size: 1, t: 0.5});
    }
  }
  this.render = (ctx) => {
    ctx.save();
    var s = engine.laneScale();
    ctx.translate(this.x, this.y);
    if (projectileType == 1) {
      ctx.fillStyle='#fff';
      ctx.fillRect(-s*0.2,-s*0.2,s*1.2,s*0.4);
      ctx.fillRect(-s*0.4,-s*0.35,s*0.4,s*0.2);
      ctx.fillRect(-s*0.4,s*0.15,s*0.4,s*0.2);
      ctx.fillStyle='#fa3';
      // Flicker flame
      if (Math.sin(Date.now() / 14) > 0) {
        ctx.fillRect(-s*0.3,-s*0.05,-s*0.8,s*0.1);
      }
    }
    ctx.restore();
  }
}
export default Projectile;
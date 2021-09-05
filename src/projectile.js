import * as gfx from './gfx.js';
import * as canvas from './canvas.js';
import bus from './bus.js';
import * as gameobjects from './gameobjects.js';

function Projectile(engine, x, y, targetLane, projectileType) {
  var anim = 0;
  this.x = x;
  this.y = y;

  this.update = (dT) => {
    anim += dT * 1.0;
    // Forward-moving projectiles
    if (projectileType != 2) {
      this.x += dT * canvas.width() / 2;
      if (anim > 4) {
        this.destroyed = true;
      }
      if (engine.collideTargets(this.x, this.y, 1.5)) {
        this.destroyed = true;
        bus.emit('poof', {x: this.x, y: this.y, color: [255,200,100], size: 1, t: 0.5});
      }
    }
    // Laser beam
    else {
      var s = engine.laneScale();
      var ly = engine.getShipY();
      var lx = engine.getShipX();
      gameobjects.get().forEach((g) => {
        if (g.obstacle) {
          var dy = ly - g.y;
          if (dy * dy < s * s && g.x>lx && !g.destroyed) {
            g.destroyed = true;
            bus.emit('poof', {x: g.x, y: ly, color: [50,130,255], size: 0.7, t: 0.5});
          }
        }
      });
      if (anim > 1) {
        this.destroyed = true;
      }
    }
  }
  this.render = (ctx) => {
    ctx.save();
    var s = engine.laneScale();

    // KEPLER MISSILE
    if (projectileType == 1) {
      ctx.fillStyle='#fff';
      ctx.translate(this.x, this.y);
      ctx.fillRect(-s*0.2,-s*0.2,s*1.2,s*0.4);
      ctx.fillRect(-s*0.4,-s*0.35,s*0.4,s*0.2);
      ctx.fillRect(-s*0.4,s*0.15,s*0.4,s*0.2);
      ctx.fillStyle='#fa3';
      // Flicker flame
      if (Math.sin(Date.now() / 14) > 0) {
        ctx.fillRect(-s*0.3,-s*0.05,-s*0.8,s*0.1);
      }
    }

    // SIGMA CANNON
    if (projectileType == 2) {
      ctx.translate(engine.getShipX(), engine.getShipY());
      ctx.fillStyle='#338';
      ctx.fillRect(s*0.8,-s*0.3,s*0.6,s*0.6);
      ctx.fillRect(s*0.9,-s*0.2,canvas.width(),s*0.4);
      ctx.fillStyle='#3af';
      if (Math.sin(Date.now() / 14) > 0) {
        ctx.fillRect(s,-s*0.1,canvas.width(),s*0.2);
        ctx.fillRect(s*0.9,-s*0.2,s*0.4,s*0.4);
      }
    }

    ctx.restore();
  }
}
export default Projectile;
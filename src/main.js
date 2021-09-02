import * as scene from './scene.js';
import * as input from './input.js';
import * as gameobjects from './gameobjects.js';
import * as canvas from './canvas.js';

scene.init();

// Wrap in closure to allow variable minification.
(() => {
  // Game loop
  var lastTime = Date.now();
  var removeQueue = [];
  var noop = () => {};

  var gameloop = () => {
    // Compute frame time in seconds
    var currTime = Date.now();
    var dT = (currTime - lastTime) * 0.001;
    if (dT > 0.3) { dT = 0.3; }

    // Clear frame
    canvas.ctx.fillStyle = '#000';
    canvas.ctx.fillRect(0, 0, canvas.width(), canvas.height());

    // Update, render, and queue game object removal
    removeQueue.length = 0;
    gameobjects.get().forEach((g) => {
      (g.ecs || []).forEach((u) => u(dT));
      (g.update || noop)(dT);
      (g.render || noop)(canvas.ctx);
      if (g.destroyed) { removeQueue.push(g); }
    })

    // Remove objects enqueued from before
    removeQueue.forEach((x) => gameobjects.remove(x));

    // Request next frame
    lastTime = currTime;
    requestAnimationFrame(gameloop);
  }
  gameloop();
})();
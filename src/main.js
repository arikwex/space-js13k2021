import './scene.js';
import * as gameobjects from './gameobjects.js';

// Game loop
var lastTime = Date.now();
var removeQueue = [];
var noop = () => {};

var gameloop = () => {
  // Compute frame time
  var currTime = Date.now();
  var dT = (currTime - lastTime) * 0.001;

  // Update, render, and queue game object removal
  removeQueue.length = 0;
  gameobjects.get().forEach((g) => {
    (g.update || noop)(dT);
    (g.render || noop)(dT);
    if (g.destroyed) { removeQueue.push(g); }
  })

  // Remove objects enqueued from before
  removeQueue.forEach((x) => gameobjects.remove(x));

  // Request next frame
  lastTime = currTime;
  requestAnimationFrame(gameloop);
}
gameloop();
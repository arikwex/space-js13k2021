import bus from './bus.js';
import * as gameobjects from './gameobjects.js';

// Scenes
// 0 = MAIN_MENU
// 1 = WORLD_MAP
// 2 = GAME_RUNNER
// 3 = UPGRADE_MENU
// 4 = LOSE
// 5 = WIN
var scene = 0;

// Entities


// Game loop
var lastTime = Date.now();
var gameloop = () => {
  var currTime = Date.now();
  var dT = (currTime - lastTime) * 0.001;
  lastTime = currTime;
  requestAnimationFrame(gameloop);
}
gameloop();
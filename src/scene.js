import bus from './bus.js';
import * as gameobjects from './gameobjects.js';

(() => {
  // Scene configuration
  var scene = 0;
  bus.on('scene', (sceneNum) => {
    scene = sceneNum;
    gameobjects.clear();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) {
      gameobjects.get().push(123)
    }
  });
})();

// Go to main menu
export function init() { bus.emit('scene', 0); }

// Go to scene number
export function goto(s) { bus.emit('scene', s); }
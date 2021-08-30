import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as animations from './animations.js';
import bus from './bus.js';
import Text from './text.js';

(() => {
  // Scene configuration
  var scene = 0;
  bus.on('scene', (sceneNum) => {
    scene = sceneNum;
    gameobjects.clear();
    var g = gameobjects.get();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) {
      g.push(new Text('SHUTTLEDECK', canvas.width() / 2, canvas.height()  * 0.4, '#fff', 6, 'center'));
      var pushToStart = new Text('[ Press to start ]', canvas.width() / 2, canvas.height() * 0.6, '#777', 3, 'center');
      pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 2.8, 3.2, 1)]
      g.push(pushToStart);
    }
  });
})();

// Go to main menu
export function init() { bus.emit('scene', 0); }

// Go to scene number
export function goto(s) { bus.emit('scene', s); }
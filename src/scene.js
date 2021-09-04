import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as animations from './animations.js';
import * as gfx from './gfx.js';
import StartButton from './startbutton.js';
import bus from './bus.js';
import Steam from './steam.js';

// Scenes
import MainMenu from './mainmenu.js';
import Intro from './intro.js';
import Engine from './engine.js';

// Go to main menu
export function init() { bus.emit('scene', 0); }

// Go to scene number
export function goto(s) { bus.emit('scene', s); }

// Go to scene number
export function transition(s) {
  // When transition animation done, swap scene and perform fade in
  bus.on('txn-done', () => {
    bus.emit('scene', s);
    gameobjects.add(new animations.transition(0.7, false));
    for (let i = 0; i < canvas.width(); i+=canvas.width()*0.01) {
      gameobjects.add(new Steam(i,canvas.height()/2));
    }
  });
  // Start transition animation and stop all updaters
  gameobjects.get().forEach((go) => {go.update=undefined;});
  gameobjects.add(new animations.transition(0.4, true));
}

(() => {
  // Scene configuration
  var scene = 0;
  var sceneConfig = (sceneNum) => {
    scene = sceneNum;
    bus.clear();
    bus.on('scene', sceneConfig);
    gameobjects.clear();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) { gameobjects.add(new MainMenu()); }

    // [SCENE = 1] INTRO
    if (scene == 1) { gameobjects.add(new Intro()); }

    // [SCENE = 2] GAME
    if (scene == 2) { gameobjects.add(new Engine()); }
  };

  bus.on('scene', sceneConfig);
})();
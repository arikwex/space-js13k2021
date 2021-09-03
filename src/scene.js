import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as animations from './animations.js';
import * as gfx from './gfx.js';
import bus from './bus.js';
import Text from './text.js';
import Engine from './engine.js';

// Go to main menu
export function init() { bus.emit('scene', 1); }

// Go to scene number
export function goto(s) { bus.emit('scene', s); }

(() => {
  // Scene configuration
  var scene = 0;
  var sceneConfig = (sceneNum) => {
    scene = sceneNum;
    bus.clear();
    bus.on('scene', sceneConfig);
    gameobjects.clear();
    var g = gameobjects.get();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) {
      // Main Menu text
      g.push(new Text('SHUTTLEDECK', ()=>canvas.width()/2, ()=>canvas.height()*0.4, '#fff', 1, 'center'));
      var pushToStart = new Text('[ Press to start ]', ()=>canvas.width()/2, ()=>canvas.height()*0.6, '#777', 0.5, 'center');
      pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 0.45, 0.55, 1)];
      g.push(pushToStart);
      // Touch anywhere to go to intro
      bus.on('tap', () => goto(1));
    }

    // [SCENE = 2] INTRO
    if (scene == 1) {
      g.push(new Text('Professor Zoren\'s Lab', ()=>canvas.width()*0.03, ()=>canvas.width()*0.05, '#fff', 0.5, 'left'));
      g.push({
        render: (ctx) => {
          gfx.drawCharPlayer(ctx);
          gfx.drawCharZoren(ctx);
        }
      });
      // Touch anywhere to start game
      bus.on('tap', () => goto(2));
    }

    // [SCENE = 2] GAME
    else if (scene == 2) {
      g.push(new Engine());
    }
  };

  bus.on('scene', sceneConfig);
})();
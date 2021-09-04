import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as animations from './animations.js';
import * as gfx from './gfx.js';
import StartButton from './startbutton.js';
import bus from './bus.js';
import Text from './text.js';
import Steam from './steam.js';
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
    var g = gameobjects.get();

    // [SCENE = 0] MAIN MENU
    if (scene == 0) {
      // Main Menu text
      g.push({render: (ctx) => {gfx.drawStars(ctx,-Date.now()*0.03,0,3,0);}});
      g.push(new Text('SHUTTLEDECK', ()=>canvas.width()/2, ()=>canvas.height()*0.4, '#fff', 1, 'center'));
      var pushToStart = new Text('[ Press to start ]', ()=>canvas.width()/2, ()=>canvas.height()*0.6, '#777', 0.5, 'center');
      pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 0.45, 0.55, 1)];
      g.push(pushToStart);
      // Touch anywhere to go to intro
      bus.on('tap', () => transition(1));
    }

    // [SCENE = 1] INTRO
    if (scene == 1) {
      g.push(new Text('Professor Zoren\'s Lab', ()=>canvas.width()*0.03, ()=>canvas.width()*0.05, '#fff', 0.5, 'left'));
      g.push(new StartButton());
      g.push({
        render: (ctx) => {
          var uiScale = canvas.height() * 0.3;
          gfx.drawCharPlayer(ctx);
          gfx.drawCharZoren(ctx);
          gfx.drawDialogBox(ctx, 'Professor Zoren', 'Hey there Courier, I need your help getting this Xenotransponder to Korva-6. It\'s only a few planets away.');
          gfx.drawItemShell(ctx, canvas.width()*0.5, canvas.height()*0.4,uiScale);
          gfx.drawItemXeno(ctx, canvas.width()*0.5, canvas.height()*0.4,uiScale);
        }
      });
      bus.on('start', () => transition(2));
    }

    // [SCENE = 2] GAME
    else if (scene == 2) {
      g.push(new Engine());
    }
  };

  bus.on('scene', sceneConfig);
})();
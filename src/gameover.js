import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import * as scene from './scene.js';
import bus from './bus.js';
import StartButton from './startbutton.js';
import Text from './text.js';

export default function GameOver() {
  // Title card
  gameobjects.add(new Text('SHUTTLEDECK', ()=>canvas.width()/2, ()=>canvas.height()*0.3, '#fff', 1, 'center'));

  // Game over :(
  gameobjects.add(new Text('Game Over', ()=>canvas.width()/2, ()=>canvas.height()*0.5, '#f55', 1, 'center'));

  // Push to play again
  gameobjects.add(new Text('[ Press to retry ]', ()=>canvas.width()/2, ()=>canvas.height()*0.7, '#777', 0.5, 'center'));
  var fn = () => {
    scene.transition(1);
    bus.off('tap', fn);
  };
  bus.on('tap', fn);

  // Starfield
  this.render = (ctx) => gfx.drawStars(ctx,-Date.now()*0.03,0,3,0);
};
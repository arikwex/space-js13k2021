import * as canvas from './canvas.js';
import * as animations from './animations.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import bus from './bus.js';
import Text from './text.js';
import cards from './cards.js';

export default function MainMenu() {
  // Starfield
  this.render = (ctx) => gfx.drawStars(ctx,-Date.now()*0.03,0,3,0);

  // Title card
  gameobjects.add(new Text('SHUTTLEDECK', ()=>canvas.width()/2, ()=>canvas.height()*0.5, '#fff', 1, 'center'));

  // Push to start pulser
  var pushToStart = new Text('[ Press to start ]', ()=>canvas.width()/2, ()=>canvas.height()*0.63, '#777', 0.5, 'center');
  pushToStart.ecs = [animations.pulse((x) => {pushToStart.size = x;}, 0.45, 0.55, 1)];
  gameobjects.add(pushToStart);

  // By me :)
  gameobjects.add(new Text('A space journey by Ariel', ()=>canvas.width()/2, ()=>canvas.height()*0.8, '#f82', 0.35, 'center'));

  gameobjects.add({
    render: (ctx) => {
      ctx.save();
      ctx.strokeStyle = '#f82';
      ctx.translate(canvas.width()/2, canvas.height() * 0.3);
      cards[3].glyph(ctx, canvas.height() * 0.2, 0.05);
      ctx.restore();
    }
  })

  // Touch anywhere to go to intro
  var fn = () => {
    bus.emit('transition-scene', 1);
    bus.off('tap', fn);
  };
  bus.on('tap', fn);
}
import * as canvas from './canvas.js';
import * as gameobjects from './gameobjects.js';
import * as gfx from './gfx.js';
import bus from './bus.js';
import StartButton from './startbutton.js';
import Text from './text.js';
import persist from './persist.js';
import cards from './cards.js';

export default function Intro() {
  let step = 2;

  gameobjects.add(new Text('Professor Zorn\'s Lab', ()=>canvas.width()*0.03, ()=>canvas.width()*0.05, '#fff', 0.5, 'left'));
  gameobjects.add(new StartButton());
  bus.on('start', () => {
    persist.reset();
    bus.emit('transition-scene', 2);
  });

  this.render = (ctx) => {
    const w = canvas.width();
    const h = canvas.height();
    var uiScale = canvas.height() * 0.3;
    gfx.drawCharPlayer(ctx);
    gfx.drawCharZoren(ctx);

    // Basic quest introduction
    if (step == 0) {
      gfx.drawDialogBox(ctx,
        'Professor Zorn',
        'Hey there Courier, I need your help getting this Xenotransponder to Korva-6. It\'s only a few planets away.'
      );
      gfx.drawItemShell(ctx, canvas.width()*0.5, canvas.height()*0.4,uiScale);
      gfx.drawItemXeno(ctx, canvas.width()*0.5, canvas.height()*0.4,uiScale);
    }

    // Explain lanes and cards
    else if (step == 1) {
      const cs = uiScale * 0.3;
      gfx.drawCard(ctx, w * 0.5 - cs * 1.4, h * 0.45, cs, cards[0], true, 1);
      gfx.drawCard(ctx, w * 0.5, h * 0.45, cs, cards[1], true, 1);
      gfx.drawCard(ctx, w * 0.5 + cs * 1.4, h * 0.45, cs, cards[2], true, 1);
      ctx.fillStyle = '#fff';
      ctx.font = `${cs*0.2}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Top', w*0.5-cs*1.4, h*0.45-cs*1.1);
      ctx.fillText('Middle', w*0.5, h*0.45-cs*1.1);
      ctx.fillText('Bottom', w*0.5+cs*1.4, h*0.45-cs*1.1);
      gfx.drawShip(ctx, w * 0.5, h * 0.25, cs * 0.4);
      gfx.drawDialogBox(ctx,
        'Manual [1 / 4]',
        'To move your ship to different flight lanes, click on the corresponding movement card.'
      );
    }

    // Explain asteroids
    else if (step == 2) {
      const cs = uiScale * 0.3;
      gfx.drawShip(ctx, w * 0.5 - cs, h * 0.3, cs * 0.4);
      // asteroid
      ctx.save();
      ctx.translate(w * 0.5 + cs, h * 0.3);
      const s = cs * 0.5;
      ctx.fillStyle = '#963';
      const anim = Date.now() / 1000.0;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(
          (i + 0.7) * s * 0.3 + Math.sin(anim*(3+i/20)+i*i*4)*s*0.6,
          Math.sin(anim*5+i*i*4)*s*0.7,
          s * 0.6 / (1.0 + i * 1.0),
          0, 6.29);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, 6.29);
      ctx.fill();
      ctx.restore();
      const ss = cs * 0.4;
      gfx.drawShield(ctx, w * 0.5 - ss * 1.3 * 2, h * 0.45, ss/2, true);
      gfx.drawShield(ctx, w * 0.5 - ss * 1.3 * 1, h * 0.45, ss/2, true);
      gfx.drawShield(ctx, w * 0.5 + ss * 1.3 * 0, h * 0.45, ss/2, true);
      gfx.drawShield(ctx, w * 0.5 + ss * 1.3 * 1, h * 0.45, ss/2, false);
      gfx.drawShield(ctx, w * 0.5 + ss * 1.3 * 2, h * 0.45, ss/2, false);
      ctx.fillStyle = '#fff';
      ctx.font = `${cs*0.2}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Shield (3 / 5)', w*0.5, h*0.45-ss * 1.2);

      gfx.drawDialogBox(ctx,
        'Manual [2 / 4]',
        'Travel between planets by avoiding asteroids and keeping your shields above zero.'
      );
    }
    
    // Collect minerals
    else if (step == 3) {
      gfx.drawDialogBox(ctx,
        'Manual [3 / 4]',
        'Collect minerals to buy new abilities cards. These cards are shuffled randomly into your deck.'
      );
    }

    // Energy
    else if (step == 4) {
      gfx.drawDialogBox(ctx,
        'Manual [4 / 4]',
        'Using ability cards rapidly will drain your energy, but it recharges over time. Time to LIFTOFF!'
      );
    }

    if (step < 4) {
      nextButton(ctx);
    }
  }

  var nextFn = ({x, y}) => {
    var w = canvas.width(); var h= canvas.height();
    var uiScale = Math.max(w * 0.08, h * 0.08);
    x -= w * 0.5;
    y -= h * 0.67;
    if (x>-uiScale * 2.5 && y>-uiScale*0.3 && x<= uiScale*2.5 && y<=uiScale*0.2) {
      step += 1;
      bus.emit('next-btn');
      if (step == 4) {
        bus.off('tap', nextFn);
      }
    }
  };
  bus.on('tap', nextFn);

  const nextButton = (ctx) => {
    var w = canvas.width(); var h = canvas.height();
    var uiScale = Math.max(w * 0.08, h * 0.08);
    ctx.save();
    ctx.translate(w*0.5,h*0.67);

    var p = (Date.now() % 500) / 500;
    var s = (1-(1-p)*(1-p)) * 0.15;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = uiScale * 0.1 * (1 - p);
    ctx.strokeRect(-uiScale * (2.5+s), -uiScale*(0.3+s), uiScale*(5+2*s), uiScale*(0.6+2*s));

    ctx.fillStyle = '#eee';
    ctx.fillRect(-uiScale * 2.5, -uiScale*0.3, uiScale*5, uiScale*0.6);

    ctx.fillStyle = '#26a';
    ctx.font = `${uiScale*0.35}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (step == 0) {
      ctx.fillText('How do I fly the ship?', 0, 0);
    } else {
      ctx.fillText('Tell me more...', 0, 0);
    }

    ctx.restore();
  }
};
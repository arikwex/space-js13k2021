import * as canvas from './canvas.js';
import bus from './bus.js';

function StartButton() {
  var hovering = false;

  bus.on('tap', ({x, y}) => {
    var w = canvas.width();
    var uiScale = w * 0.1;
    if (x > w*0.97 - uiScale*2 && x < w*0.97 && y > 0 && y < uiScale*0.9) {
      bus.emit('start');
    }
  });

  this.render = (ctx) => {
    var w = canvas.width();
    var uiScale = w * 0.1;

    ctx.save();
    ctx.translate(w * 0.97-uiScale,w*0.02+uiScale*0.4);
    var p = (Date.now() % 500) / 500;
    var s = (1-(1-p)*(1-p)) * 0.4 + 0.8;
    ctx.scale(s,s*1.1);
    ctx.strokeStyle = '#0a0';
    ctx.lineWidth = uiScale * 0.1 * (1 - p);
    ctx.strokeRect(-uiScale, -uiScale*0.4, uiScale*2, uiScale*0.8);
    ctx.restore();

    ctx.fillStyle = '#0a0';
    ctx.fillRect(w * 0.97, w*0.02, -uiScale*2, uiScale*0.8);

    ctx.fillStyle = '#fff';
    ctx.font = `${uiScale*0.35}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Liftoff', w*0.97 - uiScale * 1, w*0.02+uiScale * 0.4);
  }
}
export default StartButton;
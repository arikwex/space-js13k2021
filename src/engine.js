import * as canvas from './canvas.js';

export default function Engine() {
  // The sequence and channel of obstacles
  var obstacles = [];

  var totalTicks = 100;
  var currentTick = 0;
  var tickAnim = 0;

  this.update = (dT) => {
    tickAnim += dT * 2;
    if (tickAnim > 1) {
      tickAnim--;
      currentTick++;
      console.log(currentTick);
    }
  };

  this.render = (ctx) => {
    const w = canvas.width();
    const h = canvas.height();
    const pw = w / 50;
    const ph = h / 5;
    const th = h * 0.1;
    const mh = th + ph;
    const bh = mh + ph;
    ctx.fillStyle = '#f33'; ctx.fillRect(15, th, pw, ph);
    ctx.fillStyle = '#3f3'; ctx.fillRect(15, mh, pw, ph);
    ctx.fillStyle = '#33f'; ctx.fillRect(15, bh, pw, ph);
    ctx.fillStyle = '#311'; ctx.fillRect(w-15, th, -pw, ph);
    ctx.fillStyle = '#131'; ctx.fillRect(w-15, mh, -pw, ph);
    ctx.fillStyle = '#113'; ctx.fillRect(w-15, bh, -pw, ph);
    ctx.fillStyle = '#222';
    ctx.fillRect(15, th, w-30, 1);
    ctx.fillRect(15, mh, w-30, 1);
    ctx.fillRect(15, bh, w-30, 1);
    ctx.fillRect(15, bh+ph, w-30, 1);
  };
};
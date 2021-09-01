import * as canvas from './canvas.js';

export function drawStars(ctx, x, y, vx, vy) {
  const w = canvas.width();
  const h = canvas.height();
  const N = Math.sqrt(w * h) / 10;
  ctx.beginPath();
  ctx.strokeStyle = '#aaa';
  ctx.fillStyle = '#ddd';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < N; i++) {
    let s = 1 + (Math.sin(i * i * 1217 + i * i * i * 983) * 0.5 + 0.5) * 5;
    let ax = (1234918 * i * i + i * i * i * i * 2291722 + x * s) % w;
    let ay = (3000182 * i * i * i * i + i * i * i * i * i * 500291 + y * s) % h;
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax+vx*s, ay+vy*s);
    ctx.fillRect(ax-1, ay-1, 2, 2);
  }
  ctx.stroke();
}

export function drawCard(ctx, x, y, cs, card) {
  ctx.save();

  // dimensions
  var csw = cs / 2;
  var csh = csw * 1.5;

  // position
  ctx.translate(x, y);

  // background
  ctx.fillStyle = 'rgb(50,50,50,0.7)';
  ctx.fillRect(-csw,-csh,csw*2,csh*2);

  // light sheen
  ctx.save();
  ctx.beginPath();
  ctx.rect(-csw,-csh,csw*2,csh*2);
  ctx.clip();
  ctx.fillStyle = 'rgba(220,230,250,0.3)';
  ctx.rotate(-0.3);
  ctx.translate(cs/2, (Date.now() % 2000) / 1000 * (cs * 5) - cs*1.2);
  ctx.fillRect(-cs*2,0,cs*4,cs*0.2);
  ctx.fillRect(-cs*2,-cs*0.2,cs*4,cs*0.05);
  ctx.restore();

  // outline
  ctx.beginPath();
  ctx.lineWidth = cs / 20;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#0f0';
  ctx.moveTo(-csw, -csh);
  ctx.lineTo(csw, -csh);
  ctx.lineTo(csw, csh);
  ctx.lineTo(-csw, csh);
  ctx.closePath();
  ctx.stroke();

  // glyph
  ctx.save();
  ctx.translate(0, -cs * 0.15);
  card.glyph(ctx, cs);

  // cost
  ctx.translate(0, -cs * 0.52);
  ctx.fillStyle = '#ff3';
  var es = cs * 0.12;
  for (let i = 0; i < card.cost; i++) {
    ctx.fillRect((i - (card.cost - 1) / 2) * es - es * 0.45, 0, es * 0.9, es * 0.9);
  }
  ctx.restore();

  // text
  ctx.fillStyle = '#0f0';
  ctx.textBaseline = 'middle';
  ctx.font = `${cs/6}px monospace`;
  ctx.textAlign = 'center';
  var str = 'Gamma Sector';
  var lines = str.split(' ');
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 0, csh * 0.65 + (i - (lines.length - 1) / 2) * csh * 0.2);
  }
  ctx.restore();
}
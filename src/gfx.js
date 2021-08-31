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
import bus from './bus.js';

const cards = [
{
  color: [255, 51, 51],
  title: ['Rho', 'Channel'],
  cost: 1,
  price: 5,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.lineWidth = cs * 0.05;
    ctx.beginPath();
    ctx.arc(0, -cs/6, cs / 7, 0, 6.29);
    ctx.stroke();
    ctx.strokeRect(-cs/6, cs/10, cs/3, 0);
    ctx.strokeRect(-cs/6, cs/4, cs/3, 0);
    ctx.restore();
  },
  use: () => { bus.emit('lane', 0) }
},
{
  color: [51, 255, 51],
  title: ['Gamma', 'Sector'],
  cost: 1,
  price: 5,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.lineWidth = cs * 0.05;
    ctx.beginPath();
    ctx.arc(0, 0, cs / 7, 0, 6.29);
    ctx.stroke();
    ctx.strokeRect(-cs/6, -cs/4, cs/3, 0);
    ctx.strokeRect(-cs/6, cs/4, cs/3, 0);
    ctx.restore();
  },
  use: () => { bus.emit('lane', 1) }
},
{
  color: [51, 51, 255],
  title: ['Beta', 'Stream'],
  cost: 1,
  price: 5,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.lineWidth = cs * 0.05;
    ctx.beginPath();
    ctx.arc(0, cs/6, cs / 7, 0, 6.29);
    ctx.stroke();
    ctx.strokeRect(-cs/6, -cs/10, cs/3, 0);
    ctx.strokeRect(-cs/6, -cs/4, cs/3, 0);
    ctx.restore();
  },
  use: () => { bus.emit('lane', 2) }
},
{
  color: [255, 160, 30],
  title: ['Kepler', 'Missile'],
  cost: 2,
  price: 10,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.translate(cs/20, 0);
    ctx.rotate(0.6);
    ctx.lineWidth = cs * 0.05;
    ctx.beginPath();
    ctx.moveTo(-cs/18, -cs/6);
    ctx.lineTo(0, -cs/4);
    ctx.lineTo(cs/18, -cs/6);
    ctx.lineTo(cs/18, cs/4);
    ctx.lineTo(-cs/18, cs/4);
    ctx.closePath();
    ctx.moveTo(-cs/8, cs/4);
    ctx.lineTo(-cs/6, cs/4);
    ctx.lineTo(-cs/8, cs/10);
    ctx.closePath();
    ctx.moveTo(cs/8, cs/4);
    ctx.lineTo(cs/6, cs/4);
    ctx.lineTo(cs/8, cs/10);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },
  use: () => { bus.emit('lane', 2) }
},
{
  color: [255, 160, 30],
  title: ['Sigma', 'Cannon'],
  cost: 3,
  price: 20,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.translate(cs/12, cs/15);
    ctx.rotate(0.6);
    ctx.lineWidth = cs * 0.05;
    ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(-cs/4, -cs/4);
    ctx.lineTo(-cs/14, -cs/4);
    ctx.lineTo(-cs/14, -cs/10);
    ctx.lineTo(cs/10, -cs/10);
    ctx.lineTo(cs/10, cs/4);
    ctx.lineTo(-cs/4, cs/4);
    ctx.closePath();
    ctx.moveTo(-cs/6, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-cs/12, cs/12);
    ctx.lineTo(0, cs/6);
    ctx.lineTo(-cs/6, cs/6);
    ctx.stroke();
    ctx.restore();
  },
  use: () => { bus.emit('lane', 2) }
},
{
  color: [255, 160, 30],
  title: ['Pulse', 'Breaker'],
  cost: 3,
  price: 20,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.translate(cs/12, cs/15);
    ctx.rotate(0.6);
    ctx.lineWidth = cs * 0.05;
    ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(-cs/4, -cs/4);
    ctx.lineTo(-cs/14, -cs/4);
    ctx.lineTo(-cs/14, -cs/10);
    ctx.lineTo(cs/10, -cs/10);
    ctx.lineTo(cs/10, cs/4);
    ctx.lineTo(-cs/4, cs/4);
    ctx.closePath();
    ctx.moveTo(-cs/6, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-cs/12, cs/12);
    ctx.lineTo(0, cs/6);
    ctx.lineTo(-cs/6, cs/6);
    ctx.stroke();
    ctx.restore();
  },
  use: () => { bus.emit('lane', 2) }
},
];
export default cards;
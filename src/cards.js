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
    ctx.arc(0, 0, cs / 4, 0, 6.29);
    ctx.stroke();
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
    ctx.arc(0, 0, cs / 4, 0, 6.29);
    ctx.stroke();
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
    ctx.arc(0, 0, cs / 4, 0, 6.29);
    ctx.stroke();
    ctx.restore();
  },
  use: () => { bus.emit('lane', 2) }
},
];
export default cards;
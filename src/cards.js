import bus from './bus.js';

const cards = [
{
  color: '#f33',
  title: ['Rho', 'Channel'],
  cost: 1,
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
  color: '#3f3',
  title: ['Gamma', 'Sector'],
  cost: 1,
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
  color: '#33f',
  title: ['Beta', 'Stream'],
  cost: 1,
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
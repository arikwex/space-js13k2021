const cards = [{
  color: '#0f0',
  title: ['Ruby', 'Axis'],
  cost: 1,
  glyph: function (ctx, cs) {
    ctx.save();
    ctx.lineWidth = cs * 0.05;
    ctx.beginPath();
    ctx.arc(0, 0, cs / 4, 0, 6.29);
    ctx.stroke();
    ctx.restore();
  },
  use: function() { console.log('Used: ' + this.title); }
}];
export default cards;
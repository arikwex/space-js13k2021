function Text(str, x, y, color = '#fff', size='2', align='left') {
  this.str = str;
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;

  this.render = (ctx) => {
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}em monospace`;
    ctx.fillText(this.str, this.x, this.y);
  }
}
export default Text;
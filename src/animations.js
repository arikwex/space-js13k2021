export function pulse(fn, min, max, period) {
  var anim = 0;
  return (dT) => {
    anim += dT;
    fn((Math.sin(anim / period * 6.3) + 1) / 2 * (max - min) + min);
  }
};

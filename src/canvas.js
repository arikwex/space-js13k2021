
export const canvas = document.getElementsByTagName('canvas')[0];
export const ctx = canvas.getContext('2d');

var w, h;
export function width() { return w; }
export function height() { return h; }

export function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  w = canvas.width;
  h = canvas.height;
};
resize();
window.addEventListener('resize', resize)
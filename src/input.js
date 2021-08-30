import bus from './bus.js';
bus.on('tap', console.log);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  window.addEventListener('touchstart', (evt) => bus.emit('tap', { x: evt.touches[0].clientX, y: evt.touches[0].clientY }));
} else {
  window.addEventListener('mousedown', (evt) => bus.emit('tap', { x: evt.x, y: evt.y }));
}


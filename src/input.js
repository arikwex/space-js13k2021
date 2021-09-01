import bus from './bus.js';
bus.on('tap', console.log);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.body.addEventListener('touchstart', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    bus.emit('tap', { x: evt.touches[0].clientX, y: evt.touches[0].clientY });
  });
  document.body.addEventListener('touchend', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    bus.emit('move', { x: -1, y: -1});
  });
} else {
  document.body.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    bus.emit('tap', { x: evt.x, y: evt.y });
  });
}
document.body.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  bus.emit('move', { x: evt.x, y: evt.y });
});


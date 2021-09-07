import bus from './bus.js'

function Audio() {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var sampleRate = audioCtx.sampleRate;

  var generate = (duration, fn) => {
    var audioBuffer = audioCtx.createBuffer(1, sampleRate * duration, sampleRate);
    var buffer = audioBuffer.getChannelData(0);
    var N = audioBuffer.length;
    var anim = 0;
    for (var i = 0; i < N; i++) {
      var p = i / N;
      buffer[i] = fn(i*44100/sampleRate) * (1-p);
    }
    return audioBuffer;//source;
  }

  var sin = (i) => Math.min(Math.max(Math.sin(i), -1), 1)
  var saw = (i) => ((i % 6.28)-3.14)/6.28;
  var sqr = (i) => Math.min(Math.max(Math.sin(i) * 1000, -1), 1)
  var win = (i, ts, te) => {
    if (i<ts*44100 || i>te*44100) {return 0;}
    return 1 - ((i/44100) - ts)/(te - ts);
  }

  // Transition animation - Gate whirring close
  var gateCloseSound = generate(0.6, (i) => {
    return 0.05 * sqr(i/250) * (sin(i/300)+0);
  });

  // Transition animation -  Gate whirring open + noise of steam
  var gateOpenSound = generate(1, (i) => {
    return 0.05 * sqr(i/250) * (sin(i/300)+0) + 0.1 * Math.random() * win(i, 0, 1);
  });

  // Buy an item (ding + ding)
  var buySound = generate(0.7, (i) => {
    return 0.1 * (saw(i/19) * win(i, 0, 0.15) + saw(i/11) * win(i, 0.1, 0.7));
  });

  // Gain mineral blip
  var mineralSound = generate(0.15, (i) => {
    return 0.04 * sin(i/(15 - i / 2000));
  });

  // Collision / take damage
  var collisionSound = generate(0.8, (i) => {
    return 0.1 * Math.random() * win(i, 0, 0.8) * (sqr(i/200)+1);
  });

  // Swap lane
  var laneSound = generate(0.4, (i) => {
    return 0.04 * (1+Math.random()/3) * win(i, 0, 0.4) * sin(i/50);
  });

  // Kepler missile + Crazy Rockets + Nuke
  var missileSound = generate(0.7, (i) => {
    return 0.04 * Math.random() * win(i, 0, 0.7) * (sqr(i/100) + 1);
  });

  // Sigma cannon / laser
  var laserSound = generate(1.5, (i) => {
    return 0.08 * (sin(i/(30-i/400)) * win(i, 0, 0.15) * 3 + saw(i/60)*(sqr(i/400)+1)/2*win(i,0.1,1.5))
  });

  // Pulse breaker
  var pulseBreakerSound = generate(1, (i) => {
    return 0.04 * sin(i/50)*(sqr(i/800+1)+1);
  });

  // Hop sound
  var hopSound = generate(0.7, (i) => {
    return 0.1 * (
      saw(i/30) * win(i, 0, 0.1) +
      saw(i/50) * win(i, 0.1, 0.2) +
      saw(i/40) * win(i, 0.2, 0.3) +
      saw(i/20) * win(i, 0.3, 0.4) +
      saw(i/10) * win(i, 0.4, 0.5)
    );
  });

  var play = (audioBuffer) => {
    var source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  };

  this.setup = () => {
    bus.on('txn', () => { play(gateCloseSound); });
    bus.on('txn-done', () => { play(gateOpenSound); });
    bus.on('buy', () => { play(buySound); });
    bus.on('mineral', () => { play(mineralSound); });
    bus.on('hit', () => { play(collisionSound); });
    bus.on('boom', () => { play(collisionSound); });
    bus.on('lane', () => { play(laneSound); });
    bus.on('hop', () => { play(hopSound); });
    bus.on('projectile', (t) => {
      if (t==1 || t==4 || t==5) {play(missileSound);}
      if (t==2) {play(laserSound);}
      if (t==3) {play(pulseBreakerSound);}
    });
  };
}

export default new Audio();
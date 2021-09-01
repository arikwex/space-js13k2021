import * as canvas from './canvas.js';
import * as gfx from './gfx.js';
import bus from './bus.js';
import cards from './cards.js';

export default function Engine() {
  // The sequence and channel of obstacles
  var obstacles = [];

  // The cards in the deck
  var deck = [
  ];

  // The cards in hand
  var handSize = 3;
  var hand = [
    cards[0],
    cards[1],
    cards[2],
  ];
  var hovering = -1;

  // Ship position
  var currentLane = 1;
  var laneAnim = 1;
  var shipAngle = 0;

  // Shields = HP, Energy = MP
  var maxShield = 3;
  var shield = 2;//maxShield;
  var maxEnergy = 6;
  var energy = 3;//maxEnergy;

  var totalTicks = 100;
  var currentTick = 0;
  var tickAnim = 0;
  var anim = 0;

  // events handlers
  const getHoverIndex = (evt) => {
    const w = canvas.width();
    const h = canvas.height();
    const mx = evt.x, my = evt.y;

    var hov = -1;
    var cardsInHand = hand.length;
    var cs = Math.min(w * (0.95 / (1 + cardsInHand)), h * 0.185);

    for (let q = 0; q < cardsInHand; q++) {
      var x = w * 0.5 + (q - (cardsInHand - 1) / 2) * cs * 1.17;
      var y = h * 0.735;
      if (mx > x - cs/2 && mx < x + cs/2 && my > y - cs*3/4 && my < y + cs*3/4) {
        hov = q;
      }
    }
    return hov;
  };

  bus.on('tap', (evt) => {
    var h = getHoverIndex(evt);
    if (h>=0) {
      hand[h].use();
    }
  });

  bus.on('move', (evt) => {
    hovering = getHoverIndex(evt);
  });

  bus.on('lane', (lane) => {
    currentLane = lane;
  });

  this.update = (dT) => {
    anim += dT;
    tickAnim += dT * 2;
    if (tickAnim > 1) {
      tickAnim--;
      currentTick++;
      // TODO: handle round over
    }

    // Animate tween
    shipAngle += ((currentLane - laneAnim) * 0.5 - shipAngle) * 7.0 * dT;
    laneAnim += (currentLane - laneAnim) * 5.0 * dT;
  };

  this.render = (ctx) => {
    // Screen dimensions
    const w = canvas.width();
    const h = canvas.height();

    // Lane placements (PillWidth, PillHeight, Top, Mid, Bottom)
    const pw = w / 40;
    const ph = h * 0.16;
    const th = h * 0.1;
    const mh = th + ph;
    const bh = mh + ph;

    // Scale of the art
    const s = Math.min(ph, w/8) * 0.3;

    // Starmap
    gfx.drawStars(ctx, -anim*20, 0, 3, 0);

    // Minimap
    // Progress path
    var pr=th/2*0.7;
    ctx.fillStyle = '#446';
    ctx.fillRect(15 + pw, th/2, w - 30 - 2*pw, 1);
    // Source planet
    ctx.fillStyle = '#446';
    ctx.beginPath();
    ctx.arc(15 + pr, th/2, pr, 0, 6.28);
    ctx.fill();
    // Dest planet
    ctx.fillStyle = '#446';
    ctx.beginPath();
    ctx.arc(w - 15 - pr, th/2, pr, 0, 6.28);
    ctx.fill();
    // Progress ship
    ctx.fillStyle = '#fff';
    var px = 15 + pw + (w - 30 - 2*pw) * ((currentTick + tickAnim)/totalTicks);
    ctx.beginPath();
    ctx.moveTo(px+pw/3, th/2);
    ctx.lineTo(px-pw/3, th/2-pw/3);
    ctx.lineTo(px-pw/3, th/2+pw/3);
    ctx.closePath();
    ctx.fill();

    // Draw the lanes
    ctx.fillStyle = '#f33'; ctx.fillRect(15, th, pw, ph);
    ctx.fillStyle = '#3f3'; ctx.fillRect(15, mh, pw, ph);
    ctx.fillStyle = '#33f'; ctx.fillRect(15, bh, pw, ph);
    ctx.fillStyle = '#311'; ctx.fillRect(w-15, th, -pw, ph);
    ctx.fillStyle = '#131'; ctx.fillRect(w-15, mh, -pw, ph);
    ctx.fillStyle = '#113'; ctx.fillRect(w-15, bh, -pw, ph);
    ctx.fillStyle = '#222';
    ctx.fillRect(15, th, w-30, 1);
    ctx.fillRect(15, mh, w-30, 1);
    ctx.fillRect(15, bh, w-30, 1);
    ctx.fillRect(15, bh+ph, w-30, 1);

    // Draw the main ship
    ctx.save();

    // base ship position
    ctx.translate(50 + pw + s, th + ph/2 + laneAnim * ph );
    ctx.rotate(shipAngle);

    // ship flames
    for (let i = 5; i >= 0; i--) {
      if (i < 1) {
        ctx.fillStyle = '#fd6';
      } else if (i < 3) {
        ctx.fillStyle = '#fa1';
      } else {
        ctx.fillStyle = '#a41';
      }
      ctx.beginPath();
      var spot = (Math.sin(anim*(i+1)*20) * 0.2 + 0.5);
      ctx.arc(-s - s * i * 0.1, Math.sin(-anim*40+i)*i*s/30, (s * spot) / (1.5 + i*0.3), 0, 6.29);
      ctx.fill();
    }

    // ship body + shaking
    ctx.translate(Math.sin(anim*30) * s/60, Math.sin(anim*35) * s/40);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(s, 0);
    ctx.lineTo(-s*0.65,-s*0.8);
    ctx.lineTo(-s*0.65,-s*0.3);
    ctx.lineTo(-s,-s*0.5);
    ctx.lineTo(-s,s*0.5);
    ctx.lineTo(-s*0.65,s*0.3);
    ctx.lineTo(-s*0.65,s*0.8);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-s*0.4,s*0.4,s,s*0.15);
    ctx.fillRect(-s*0.4,-s*0.4,s,-s*0.15);
    ctx.restore();

    // Draw energy
    var uiScale = Math.max(h * 0.025, 20);
    var shieldTextLevel = h - 20;
    ctx.textBaseline = 'bottom';
    ctx.font = `${uiScale}px monospace`;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ff3';
    ctx.fillText('Energy', w - pw, shieldTextLevel);
    ctx.textAlign = 'right';
    ctx.fillText(energy, w - (pw + uiScale * 6), shieldTextLevel);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = `${uiScale*0.8}px monospace`;
    ctx.fillText(`/ ${maxEnergy}`, w - (pw + uiScale * 5.7), shieldTextLevel);
    var cellWidth = uiScale * 1.2;
    for (let i = 0; i < maxEnergy; i++) {
      ctx.fillStyle = '#333';
      ctx.fillRect(w - (pw + i * (cellWidth + 4) + cellWidth), shieldTextLevel - cellWidth*2.4, cellWidth, cellWidth);
      if (i < energy) {
        ctx.fillStyle = '#ff3';
        ctx.fillRect(w - (pw + i * (cellWidth + 4) + cellWidth) + 4, shieldTextLevel -  cellWidth*2.4+ 4, cellWidth - 8, cellWidth - 8);
      }
    }

    // Draw shield
    var cellRadius = uiScale * 0.6;
    var energyTextLevel = h - 20;
    ctx.textBaseline = 'bottom';
    ctx.font = `${uiScale}px monospace`;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3ff';
    ctx.fillText('Shield', pw, energyTextLevel);
    ctx.textAlign = 'right';
    ctx.fillText(shield, pw + uiScale * 5.3, energyTextLevel);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = `${uiScale*0.8}px monospace`;
    ctx.fillText(`/ ${maxShield}`, pw + uiScale * 5.6, energyTextLevel);
    for (let i = 0; i < maxShield; i++) {
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(pw + i * (cellRadius*2.5 + 4) + cellRadius, energyTextLevel - cellRadius*4, cellRadius, cellRadius, 0, 0, 6.28);
      ctx.fill();
      if (i < shield) {
        ctx.fillStyle = '#3ff';
        ctx.beginPath();
        ctx.ellipse(pw + i * (cellRadius*2.5 + 4) + cellRadius, energyTextLevel - cellRadius*4, cellRadius-5, cellRadius-5, 0, 0, 6.28);
        ctx.fill();
      }
    }

    // Draw cards
    var cardsInHand = hand.length;
    for (let q = 0; q < cardsInHand; q++) {
      var cs = Math.min(w * (0.95 / (1 + cardsInHand)), h * 0.185);
      var x = w * 0.5 + (q - (cardsInHand - 1) / 2) * cs * 1.17;
      var y = h * 0.735;
      gfx.drawCard(ctx, x, y, cs, hand[q], hovering == q);
    }
  };
};






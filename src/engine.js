import * as canvas from './canvas.js';
import * as gfx from './gfx.js';

export default function Engine() {
  // The sequence and channel of obstacles
  var obstacles = [];

  // The cards in the deck
  var deck = [];

  // The cards in hand
  var handSize = 3;
  var hand = [];

  // Shields = HP, Energy = MP
  var maxShield = 3;
  var shield = maxShield;
  var maxEnergy = 6;
  var energy = maxEnergy;

  var totalTicks = 100;
  var currentTick = 0;
  var tickAnim = 0;
  var anim = 0;

  this.update = (dT) => {
    anim += dT;
    tickAnim += dT * 2;
    if (tickAnim > 1) {
      tickAnim--;
      currentTick++;
      // TODO: handle round over
    }
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
    ctx.translate(50 + pw + s, mh + ph/2);

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
    var shieldTextLevel = bh + ph + h * 0.1;
    ctx.textBaseline = 'bottom';
    ctx.font = '1.8em monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ff3';
    ctx.fillText('Energy', pw, shieldTextLevel);
    ctx.textAlign = 'right';
    ctx.fillText(energy, pw + w * 0.15, shieldTextLevel);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '1.3em monospace';
    ctx.fillText(`/ ${maxEnergy}`, pw + w * 0.158, shieldTextLevel);
    var cellWidth = w * 0.03;
    var cellHeight = h * 0.05;
    for (let i = 0; i < maxEnergy; i++) {
      ctx.fillStyle = '#555';
      ctx.fillRect(pw + i * (cellWidth + 4), shieldTextLevel + cellHeight*0.4, cellWidth, cellHeight);
      ctx.fillStyle = '#ff3';
      ctx.fillRect(pw + i * (cellWidth + 4) + 4, shieldTextLevel + cellHeight*0.4 + 4, cellWidth - 8, cellHeight - 8);
    }

    // Draw shield
    var energyTextLevel = bh + ph + h * 0.27;
    ctx.textBaseline = 'bottom';
    ctx.font = '1.8em monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3ff';
    ctx.fillText('Shield', pw, energyTextLevel);
    ctx.textAlign = 'right';
    ctx.fillText(shield, pw + w * 0.15, energyTextLevel);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '1.3em monospace';
    ctx.fillText(`/ ${maxShield}`, pw + w * 0.158, energyTextLevel);
    var cellRadius = w * 0.02;
    for (let i = 0; i < maxShield; i++) {
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.ellipse(pw + i * (cellRadius*2.5 + 4) + cellRadius, energyTextLevel + cellRadius*1.5, cellRadius, cellRadius, 0, 0, 6.28);
      ctx.fill();
      ctx.fillStyle = '#3ff';
      ctx.beginPath();
      ctx.ellipse(pw + i * (cellRadius*2.5 + 4) + cellRadius, energyTextLevel + cellRadius*1.5, cellRadius-5, cellRadius-5, 0, 0, 6.28);
      ctx.fill();
    }

    // Draw cards
    ctx.save();
    // position
    ctx.translate(w*0.5, h*0.75);

    // dimensions
    var cs = w * 0.12;
    var csw = cs / 2;
    var csh = csw * 1.5;

    // background
    ctx.fillStyle = 'rgb(50,50,50,0.7)';
    ctx.fillRect(-csw,-csh,csw*2,csh*2);

    // light sheen
    ctx.save();
    ctx.beginPath();
    ctx.rect(-csw,-csh,csw*2,csh*2);
    ctx.clip();
    ctx.fillStyle = 'rgba(220,230,250,0.3)';
    ctx.rotate(-0.3);
    ctx.translate(cs/2, (Date.now() % 2000) / 1000 * (cs * 5) - cs*1.2);
    ctx.fillRect(-cs*2,0,cs*4,cs*0.2);
    ctx.fillRect(-cs*2,-cs*0.2,cs*4,cs*0.05);
    ctx.restore();

    // outline
    ctx.beginPath();
    ctx.lineWidth = cs / 20;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f0';
    ctx.moveTo(-csw, -csh);
    ctx.lineTo(csw, -csh);
    ctx.lineTo(csw, csh);
    ctx.lineTo(-csw, csh);
    ctx.closePath();
    ctx.stroke();

    // text
    ctx.fillStyle = '#0f0';
    ctx.textBaseline = 'middle';
    ctx.font = '1.4em monospace';
    ctx.textAlign = 'center';
    var str = 'Gamma Sector';
    var lines = str.split(' ');
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 0, csh * 0.65 + (i - (lines.length - 1) / 2) * csh * 0.2);
    }

    ctx.restore();
  };
};






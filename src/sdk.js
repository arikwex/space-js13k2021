
import bus from './bus.js';

const crazysdk = window.CrazyGames.CrazySDK.getInstance();

function init() {
    crazysdk.init();
}

function requestAd() {
    bus.emit('ad-start');
    setTimeout(() => { crazysdk.requestAd('rewarded'); }, 200);
}

crazysdk.addEventListener('adStarted', () => bus.emit('ad-start'));
crazysdk.addEventListener('adFinished', () => bus.emit('ad-end'));
crazysdk.addEventListener('adError', () => bus.emit('ad-end'));

export {
    init,
    requestAd,
}
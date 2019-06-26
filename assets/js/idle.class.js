export default class Idle {
  constructor(
    timeout = 10,
    idleCallback = null,
    backToActiveCallback = null,
    autoStart = true,
    backToActiveOnXHR = false
  ) {
    this.timeout = timeout;
    this.idleCallback = idleCallback;
    this.backToActiveCallback = backToActiveCallback;
    this.autoStart = autoStart; // only F5
    this.backToActiveOnXHR = backToActiveOnXHR;
    this.idle = false;
    this.timer = null;
    this.events = [
      'scroll',
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart'
    ];
    this.init();
  }

  init() {
    if (this.backToActiveOnXHR) {
      this.events.push('load');
    }
    this.events.forEach(name => {
      window.addEventListener(name, this.backToActive, true);
    });
    if (this.autoStart) {
      this.backToActive();
    }
  }

  goIdle = () => {
    this.idle = true;
    if (this.idleCallback) {
      this.idleCallback(this.timeout);
    }
  };

  backToActive = () => {
    if (this.idle) {
      this.backToActiveCallback();
    }
    this.idle = false;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.goIdle, this.timeout * 1000);
  };
}

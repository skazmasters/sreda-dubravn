class Ymap extends Widget {
  constructor(node) {
    super(node, 'js-ymap');

    this.closeButton = null;
    this.overlay = null;
    this.container = null;
    this.body = document.documentElement;
    this.map = null;
    this.isInited = false;

    setTimeout(() => this.events(), 2500);
  }

  events() {
    if (!this.isInited) this.initPopup();
  }

  initPopup() {
    this.createOverlay();
    this.createPopupHTML();
    this.$node.addEventListener('click', this.handler.bind(this));
    this.overlay.addEventListener('click', this.closePopup.bind(this));
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
    this.isInited = true;
  }

  handler() {
    this.revealPopup();
  }

  revealPopup() {
    hideScrollbar();
    this.showElement(this.map);
    this.showElement(this.overlay);
  }

  createPopupHTML() {
    this.map = document.createElement('div');
    this.map.classList.add('ymap');

    this.closeButton = document.createElement('button');
    this.closeButton.setAttribute('type', 'button');
    this.closeButton.classList.add('ymap__close');

    this.container = document.createElement('div');
    this.container.classList.add('ymap__container');
    this.container.insertAdjacentHTML('beforeend',
      `<div style="position:relative;overflow:hidden;">
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5919581e3488632f9b78b78b8dc306fdca48c56c28b51ec83eb2a6c00b0137ef&amp;source=constructor" width="100%" height="400" frameborder="0" allowfullscreen="true" style="position:relative;"></iframe>
            </div>`);

    this.map.appendChild(this.closeButton);
    this.map.appendChild(this.container);
    this.body.appendChild(this.map);
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.body.appendChild(this.overlay);
  }

  closePopup(e) {
    let target = e.target;
    if (target === this.overlay || target === this.closeButton) {
      this.hideElement(this.overlay);
      this.hideElement(this.map);
    }
    showScrollbar();
  }

  showElement(element) {
    element.classList.add('visible');
  }

  hideElement(element) {
    element.classList.remove('visible');
  }

  static init(el) {
    el && new Ymap(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-ymap').forEach(item => Ymap.init(item));
});

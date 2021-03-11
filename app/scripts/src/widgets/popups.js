class Popup {
  constructor(nodeElement) {
    this.eventHandlers = {};

    this.nodeElement = nodeElement;
    this.id = nodeElement.dataset.popupId;

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);

    this.$popupContent = this.nodeElement.querySelector('.popup__content');

    this.init();
  }

  on(event, callback) {
    if (!(event in this.eventHandlers)) this.eventHandlers[event] = [];

    for (let i = 0; i < this.eventHandlers[event]; i++) {
      if (this.eventHandlers[event][i] === callback) return;
    }

    this.eventHandlers[event].push(callback);
  }

  trigger(event, eventParams = {}) {
    if (!(event in this.eventHandlers)) return;

    this.eventHandlers[event].forEach(handler => handler(eventParams));
  }

  getId() {
    return this.id;
  }

  onCloseClick(e) {
    e.preventDefault();
    this.close();
  }

  init() {
    this.nodeElement.querySelectorAll('.js-popup-close').forEach(element =>
      element.addEventListener('click', this.onCloseClick),
    );
  }

  close() {
    this.nodeElement.querySelector('.popup__inner').classList.remove('opened');

    setTimeout(() => this.nodeElement.classList.remove('opened'), 300);
    setTimeout(() => this.trigger('closed'), 0);

    this.nodeElement.querySelectorAll('.js-popup-close').forEach(element =>
      element.removeEventListener('click', this.onCloseClick),
    );

    this.nodeElement.removeEventListener('click', this.onOverlayClick);
  }

  open() {
    this.nodeElement.classList.add('opened');
    setTimeout(() => this.nodeElement.querySelector('.popup__inner').classList.add('opened'));

    this.nodeElement.addEventListener('click', this.onOverlayClick);
  }

  onOverlayClick(e) {
    let target = e.target;
    do {
      if (target === this.$popupContent) return;
      target = target.parentNode;
    } while (target);

    this.close();
  }
}


class PopupManager {
  constructor() {
    this.popups = {};

    this.visiblePopup = null;
  }

  add(nodeElement) {
    const popup = new Popup(nodeElement);

    this.popups[popup.getId()] = popup;

    document.querySelectorAll('.js-popup-open[data-popup]').forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const popupOpen = e.target.closest('.js-popup-open[data-popup]')
        this.open(popupOpen.dataset.popup);
      }, true);
    });
  }

  open(popupId) {
    if (!(popupId in this.popups)) throw new Error('popup not found');

    this.createOverlay();

    const popup = this.popups[popupId];
    popup.open();

    this.visiblePopup = popup;

    popup.on('closed', () => this.hideOverlay());
  }

  createOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('not-visible');
      return;
    }

    hideScrollbar();

    this.overlay = document.createElement('div');
    this.overlay.classList.add('popup-overlay');
    document.body.appendChild(this.overlay);

    this.overlay.addEventListener('click', () => {
      if (this.visiblePopup) this.visiblePopup.close();
    });
  }

  hideOverlay() {
    if (this.overlay) {
      const overlay = this.overlay;
      this.overlay.classList.add('not-visible');

      this.overlay.addEventListener('transitionend', () => {
        overlay.remove();
        showScrollbar();
      });

      this.overlay = null;
    }
  }

  init() {
    document.querySelectorAll('.js-popup').forEach(popup => manager.add(popup));
  }
}

const manager = new PopupManager();
manager.init();
window.PopupManager = manager;

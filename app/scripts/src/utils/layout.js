const LayoutConfig = {
  mobile_width: 767,
  tablet_width: 1023,
  laptop_width: 1279,
  listeners: [],
  documentClickListeners: [],
  is_mobile: 0,
  is_tablet: 0,
  is_laptop: 0,
}

class Layout {
  constructor() {
    this.resizeEvents = this.resizeEvents.bind(this);

    this.events();
  }

  events() {
    LayoutConfig.is_mobile = Layout.isMobileLayout();

    onResize(this.resizeEvents);

    let documentClick = false;

    document.addEventListener('touchstart', () => documentClick = true);
    document.addEventListener('touchmove', () => documentClick = false);
    document.addEventListener('click touchend', e => {
      if (e.type === 'click') documentClick = true;
      if (documentClick) Layout.fireDocumentClick(e);
    });
  }

  resizeEvents() {
    const isMobile = Layout.isMobileLayout();
    const isTablet = Layout.isTabletLayout();
    const isLaptop = Layout.isLaptopLayout();

    if (isMobile !== LayoutConfig.is_mobile) {
      LayoutConfig.is_mobile = isMobile;
      Layout.fireChangeMode();
    } else if (isTablet !== LayoutConfig.is_tablet) {
      LayoutConfig.is_tablet = isTablet;
      Layout.fireChangeMode();
    } else if (isLaptop !== LayoutConfig.is_laptop) {
      LayoutConfig.is_laptop = isLaptop;
      Layout.fireChangeMode();
    }
  }

  static addListener(func) {
    LayoutConfig.listeners.push(func);
  }

  static fireChangeMode() {
    setTimeout(() => {
      for (let i = 0; i < LayoutConfig.listeners.length; i++) {
        LayoutConfig.listeners[i](LayoutConfig.is_mobile);
      }
    }, 0);
  }

  static addDocumentClickHandler(handler) {
    LayoutConfig.documentClickListeners.push(handler);
  }

  static fireDocumentClick(e) {
    LayoutConfig.documentClickListeners.forEach(handler => handler(e));
  }

  static isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  static isMobileLayout() {
    return window.innerWidth <= LayoutConfig.mobile_width;
  }

  static isTabletLayout() {
    return window.innerWidth <= LayoutConfig.tablet_width;
  }

  static isBigTabletLayout() {
    return window.innerWidth > LayoutConfig.tablet_width && window.innerWidth <= LayoutConfig.laptop_width;
  }

  static isLaptopLayout() {
    return window.innerWidth <= LayoutConfig.laptop_width;
  }

  static isDesktopLayout() {
    return !Layout.isMobileLayout() && !Layout.isTabletLayout() && !Layout.isLaptopLayout();
  }

  static init() {
    return new Layout();
  }
}

Layout.init();

window.Layout = Layout;

window.isMobileLayout = () => Layout.isMobileLayout();
window.isTabletLayout = () => Layout.isTabletLayout();
window.isBigTabletLayout = () => Layout.isBigTabletLayout();
window.isLaptopLayout = () => Layout.isLaptopLayout();
window.isDesktopLayout = () => Layout.isDesktopLayout();

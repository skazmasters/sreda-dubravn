class BaseSlider extends Widget {
  constructor(node) {
    super(node, 'js-base-slider');

    this.slider = this.queryElement('.slider');
    this.pagination = this.queryElement('.pagination');
    this.swiper = null;

    this.events();
  }

  events() {
    this.initSwiper();
  }
  
  initSwiper() {
    this.swiper = new Swiper(this.slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: this.pagination,
        clickable: true,
      },
    });
  }

  static init(el) {
    el && new BaseSlider(el);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-base-slider')
    ? document.querySelectorAll('.js-base-slider').forEach(item => BaseSlider.init(item))
    : null;
})

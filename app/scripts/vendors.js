import "regenerator-runtime/runtime";
import './polyfills';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/native-loading/ls.native-loading';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import swiper from 'swiper/swiper-bundle';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';
import IMask from 'imask';

window.Swiper = swiper;

window.PhotoSwipe = PhotoSwipe;
window.PhotoSwipeUI = PhotoSwipeUI;
window.IMask = IMask;


lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.srcAttr = 'data-original';
lazySizes.cfg.loadMode = 1;
lazySizes.cfg.nativeLoading = {
  setLoadingAttribute: true,
  disableListeners: {
    scroll: true,
  },
};

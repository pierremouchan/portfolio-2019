<template>
  <div class="project-slider-wrapper">
    <div class="white-banner-top">
      <img src="~static/images/icons/white-banner.svg" alt="" />
    </div>
    <div class="white-banner-bottom">
      <img src="~static/images/icons/white-banner.svg" alt="" />
    </div>
    <slide></slide>
  </div>
</template>

<script>
import { TweenMax, Expo } from 'gsap';
import slide from '~/components/blocks/slide';
export default {
  components: {
    slide
  },
  data() {
    return {
      swipedNumber: '0'
    };
  },
  mounted() {
    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      alreadyLoaded => {
        if (alreadyLoaded) {
          this.enterProjectSlider();
        }
      }
    );
  },
  methods: {
    enterProjectSlider() {
      TweenMax.fromTo(
        '.project-name p',
        1.5,
        { x: '100%' },
        { x: '0%', ease: Expo.easeInOut }
      );
      TweenMax.fromTo(
        '.project-name-duplicated p',
        1.5,
        { x: '-100%' },
        { x: '0%', ease: Expo.easeInOut }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.project-slider-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  .white-banner-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25vh;
    transform-origin: center center;
    z-index: $beforebg;
    img {
      transform: rotate(180deg) translate(0px, 20px);
      height: 100%;
      width: unset;
      max-width: unset;
    }
  }
  .white-banner-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25vh;
    transform-origin: center center;
    z-index: $beforebg;
    img {
      transform: translate(0px, 20px);
      height: 100%;
      width: unset;
      max-width: unset;
    }
  }
}
</style>

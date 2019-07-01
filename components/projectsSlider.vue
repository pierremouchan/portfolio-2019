<template>
  <div class="project-slider-wrapper">
    <div class="white-banner-top">
      <img src="~static/images/icons/white-banner.svg" alt="" />
    </div>
    <div class="white-banner-bottom">
      <img src="~static/images/icons/white-banner.svg" alt="" />
    </div>

    <div class="project-slider-container"></div>
    <div class="project-name">
      <p><strong>CLISHARE PROJECT</strong></p>
    </div>
    <div class="project-name-duplicated">
      <p><strong>CLISHARE PROJECT</strong></p>
    </div>
  </div>
</template>

<script>
import { TweenMax, Expo } from 'gsap';
export default {
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
  .project-slider-container {
    position: relative;
  }
  .project-name,
  .project-name-duplicated {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform: translate(-25%, -175%) rotate(-45deg);
    z-index: $background;
    opacity: 0.05;
    overflow: hidden;

    @include mq($from: tablet) {
      transform: translate(-25%, -250%) rotate(-30deg);
    }
    p {
      font-family: $font-title;
      white-space: nowrap;
      font-size: $project-slider-title-mobile;
      line-height: 110px;
      @include mq($from: desktop_plus) {
        font-size: $project-slider-title-desktop;
        line-height: 280px;
      }
    }
  }
  .project-name-duplicated {
    transform: translate(-75%, 75%) rotate(-45deg);
    @include mq($from: tablet) {
      transform: translate(-75%, 125%) rotate(-30deg);
    }
    @include mq($from: desktop_plus) {
    }
  }
}
</style>

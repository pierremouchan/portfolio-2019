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
import { TimelineMax, TweenMax, Expo } from 'gsap';
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
    this.enterSetState();
    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      alreadyLoaded => {
        if (alreadyLoaded) {
          this.enterSetState();
          this.enterProjectSlider();
        }
      }
    );
  },
  created() {},
  methods: {
    enterProjectSlider() {
      const toIndexTimeline = new TimelineMax({});
      toIndexTimeline
        .addLabel('startTo')
        .addLabel('startAction2', '+=0.5')
        .fromTo(
          '.project-name p',
          1.5,
          { x: '100%' },
          { x: '0%', ease: Expo.easeInOut },
          'startTo'
        )
        .fromTo(
          '.project-name-duplicated p',
          1.5,
          { x: '-100%' },
          { x: '0%', ease: Expo.easeInOut },
          'startTo'
        )
        .to(
          '.title-container',
          1,
          { transformOrigin: 'top left', scaleY: 1, ease: Expo.easeOut },
          'startAction2'
        )
        .to(
          '.slider__frame-container img',
          2,
          {
            x: '0%',
            ease: Expo.easeOut
          },
          'startAction2'
        )
        .to('h2', 0.5, { y: '0%', ease: Expo.easeOut }, 'startAction2+=0.5')
        .to(
          '.slider__divider-bottom',
          1,
          { width: '100%', ease: Expo.easeOut },
          'startAction2+=0.25'
        )
        .to(
          'h3',
          0.5,
          { transformOrigin: 'top left', scaleY: 1, ease: Expo.easeOut },
          'startAction2+=0.5'
        )
        .to(
          '.title__separator',
          0.5,
          {
            transformOrigin: 'left bottom',
            scaleX: 1,
            ease: Expo.easeOut
          },
          'startAction2+=0.75'
        )
        .to(
          '.frame__info__desc',
          0.5,
          {
            y: '0%',
            ease: Expo.easeOut
          },
          'startAction2+=0.25'
        )
        .to(
          '.slider__numero',
          1,
          {
            transformOrigin: 'left bottom',
            scaleX: 1,
            ease: Expo.easeOut
          },
          'startAction2+=0.25'
        )
        .to(
          '.button-right',
          0.25,
          { transformOrigin: 'bottom left', scaleY: 1, ease: Expo.easeOut },
          'startAction2+=0.25'
        )
        .to(
          '.button-left',
          0.25,
          { transformOrigin: 'bottom left', scaleY: 1, ease: Expo.easeOut },
          'startAction2+=0.5'
        );
    },
    enterSetState() {
      TweenMax.set('.slider__divider-bottom', { width: '0%' });
      TweenMax.set('h2', { y: '-100%' });
      TweenMax.set('.title-container', {
        transformOrigin: 'top left',
        scaleY: 0
      });
      TweenMax.set('.slider__numero', {
        transformOrigin: 'left bottom',
        scaleX: 0
      });
      TweenMax.set('.slider__frame-container img', {
        x: '-110%'
      });
      TweenMax.set('h3', { transformOrigin: 'top left', scaleY: 0 });
      TweenMax.set('.title__separator', {
        transformOrigin: 'left bottom',
        scaleX: 0
      });
      TweenMax.set('.frame__info__desc', {
        y: '150%'
      });
      TweenMax.set('.button-right', {
        transformOrigin: 'bottom left',
        scaleY: 0
      });
      TweenMax.set('.button-left', {
        transformOrigin: 'bottom left',
        scaleY: 0
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.project-slider-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  .white-banner-top {
    position: relative;
    width: 100%;
    height: 25vh;
    z-index: $beforebg;
    img {
      transform: rotate(180deg) translate(0px, 20px);
      height: 100%;
      width: unset;
      max-width: unset;
    }
  }
  .white-banner-bottom {
    position: relative;
    margin-top: 50vh;
    width: 100%;
    height: 25vh;
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

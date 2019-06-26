<template lang="html">
  <transition>
    <div v-if="!alreadyLoaded" class="loader">
      <div class="loader-container">
        <p class="percentage-number">{{ loadingProgress }}</p>
        <image-preloader
          :srcs="imageArray"
          @loaded-all="loadedAll"
          @loaded="loadedOne"
        />
      </div>
      <div class="loader-mask"></div>
    </div>
  </transition>
</template>

<script>
import { imagePreloader } from 'vue-image-preloader';
import { TimelineMax, TweenMax, Expo } from 'gsap';

export default {
  components: {
    imagePreloader
  },
  data: function() {
    return {
      // imageArray: this.$nuxt.$cacheImages.imageArray,
    };
  },
  computed: {
    imageArray() {
      return this.$store.state.loader.imageArray;
    },
    loadingProgress() {
      return this.$store.state.loader.loadingProgress;
    },
    alreadyLoaded() {
      return this.$store.state.loader.alreadyLoaded;
    }
  },

  created() {
    this.$store.commit(
      'loader/setImageArray',
      this.$nuxt.$cacheImages.imageArray
    );
    // COOKIE FOR THE CURRENT SESSION
    sessionStorage.getItem('loaderCookie') === 'true'
      ? this.endLoading()
      : this.startLoading();
    // this.startLoading();
  },
  methods: {
    startLoading() {
      // SET COOKIE FOR THE NEXT LOADING
      sessionStorage.setItem('loaderCookie', 'true');

      // CHECK IF IMAGEARRAY IS NOT EMPTY
      if (this.imageArray.length === 0) {
        this.endLoading();
      }
    },
    endLoading() {
      // WHEN COOKIE IS TRUE OR ALL IMAGE LOADED
      // SET LOADING PROGRESS TO 101 BECAUSE OF THE STRICT OPERTATOR (< 101)
      const that = this;
      this.setLoadingProgress(101);
      const endLoadingTmeline = new TimelineMax({
        onComplete() {
          that.$store.commit('loader/setLoadingStatus', true);
        }
      });
      endLoadingTmeline
        .addLabel('first-anim', 0.5)
        .addLabel('second-anim', 1)
        .add(
          TweenMax.to('.percentage-number', 1, {
            y: '-150%',
            ease: Expo.easeIn
          }),
          'first-anim'
        )
        .add(
          TweenMax.fromTo(
            '.loader-mask',
            0.5,
            { transformOrigin: 'bottom left', scaleY: 0 },
            { scaleY: 1, ease: Expo.easeInOut }
          ),
          'second-anim'
        );
    },

    loadedOne(e) {
      // SET PROGRESSION OF LOADING WHEN AN IMAGE IS LOADED
      this.setLoadingProgress(e.progress);
    },

    loadedAll(e) {
      // END LOADING FUNCTION
      window.onload = this.endLoading();
    },

    setLoadingProgress(progress) {
      // SET PROGRESSION ( VANILLA COUNT UP)
      for (
        let index = this.loadingProgress;
        index < Math.floor(progress);
        index++
      ) {
        // progress -1 to stay at 99% if window.onload is not finish
        this.$store.commit(
          'loader/setLoadingProgress',
          Math.floor(progress - 1)
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  z-index: $foreground;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $black;
  overflow: hidden;

  &-container {
    z-index: $normal;
    position: absolute;
    width: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .percentage-number {
      position: relative;
      font-family: $font-title;
      font-size: 50vh;
      line-height: 75vh;
      color: $white;
      transform: rotate(90deg);
      transform-origin: center center;

      &:before {
        content: '%';
        opacity: 0.1;
        color: $white;
        font-size: 75vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      @include mq($from: tablet) {
        transform: rotate(0);
      }
    }
  }
  &-mask {
    width: 100%;
    height: 100%;
    background-color: $white;
    z-index: $up;
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleY(0);
  }
}
</style>

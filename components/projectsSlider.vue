<template>
  <div class="project-slider-wrapper">
    <div class="title-container">
      <div class="title">
        <h2>{{ activeProject.title }}</h2>
      </div>
      <div class="title-outline">
        <div>{{ activeProject.title }}</div>
      </div>
    </div>
    <Sun id="sun"></Sun>
    <Fog id="fog"></Fog>
  </div>
</template>

<script>
// import { TimelineMax, TweenMax, Expo } from 'gsap';
import Sun from '~/static/images/icons/sun.svg?inline';
import Fog from '~/static/images/white-fog.svg?inline';
export default {
  components: {
    Sun,
    Fog
  },
  data() {
    return {
      projects: this.$store.state.projects.list
    };
  },
  computed: {
    activeProject() {
      return this.projects[this.$store.state.currentProject.number];
    }
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
      // const toIndexTimeline = new TimelineMax({});
    },
    enterSetState() {}
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
  #sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 750px;
    z-index: $down;
    @include mq($from: tablet) {
      width: 80%;
    }
    @include mq($from: desktop) {
      width: 60%;
    }
  }
  #fog {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: $down + 1;
  }
  .title-container {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    @include mq($from: tablet) {
      top: 20%;
    }
    .title {
      line-height: 30px;
      @include mq($from: tablet) {
        line-height: 80px;
      }
      @include mq($from: desktop_plus) {
        line-height: 100px;
      }
      h2 {
        font-family: $font-title;
        font-weight: 900;
        font-size: 35px;
        color: $black;
        @include mq($from: tablet) {
          font-size: 75px;
        }
        @include mq($from: desktop_plus) {
          font-size: 100px;
        }
        @include mq($from: xlarge) {
          font-size: 120px;
        }
      }
    }
    .title-outline {
      font-family: $font-title;
      font-weight: 900;
      font-size: 35px;
      color: rgba(0, 0, 0, 0);
      -webkit-text-stroke: 2px $black;
      overflow: hidden;
      height: 30px;
      @include mq($from: tablet) {
        font-size: 75px;
        height: 40px;
      }
      @include mq($from: desktop_plus) {
        font-size: 100px;
        height: 50px;
      }
      @include mq($from: xlarge) {
        font-size: 120px;
        height: 60px;
      }
    }
  }
}
</style>

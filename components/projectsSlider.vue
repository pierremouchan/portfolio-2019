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
  </div>
</template>

<script>
// import { TimelineMax, TweenMax, Expo } from 'gsap';
import Sun from '~/static/images/icons/sun.svg?inline';
export default {
  components: {
    Sun
  },
  data() {
    return {
      projects: this.$store.state.projects.list,
      projectNumber: 0
    };
  },
  computed: {
    activeProject() {
      return this.projects[this.projectNumber];
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
  .title-container {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .title {
      h2 {
        font-family: $font-title;
        font-weight: 900;
        font-size: 120px;
        color: $black;
      }
      line-height: 100px;
    }
    .title-outline {
      font-family: $font-title;
      font-weight: 900;
      font-size: 120px;
      color: rgba(0, 0, 0, 0);
      -webkit-text-stroke: 2px $black;
      overflow: hidden;
      height: 60px;
    }
  }
}
</style>

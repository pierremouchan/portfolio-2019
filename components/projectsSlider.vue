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
    <button class="previous" @click="previousProject">
      previous
    </button>
    <button class="next" @click="nextProject">
      next
    </button>
    <Fog id="fog"></Fog>
  </div>
</template>

<script>
import { TimelineMax, Expo } from 'gsap';
import { mapMutations } from 'vuex';
import Fog from '~/static/images/white-fog.svg?inline';
export default {
  components: {
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
  mounted() {},
  created() {},
  methods: {
    // eslint-disable-next-line standard/computed-property-even-spacing
    ...mapMutations({
      decreaseProject: 'currentProject/previousProject',
      increaseProject: 'currentProject/nextProject'
    }),
    nextProject() {
      const nextProjectTimeline = new TimelineMax({
        onComplete: () => {
          this.increaseProject();
          nextProjectTimeline2.play();
        }
      });
      const nextProjectTimeline2 = new TimelineMax({
        paused: true
      });

      // FIRST TIMELINE RETRACT TEXT
      nextProjectTimeline
        .addLabel('f1')
        .fromTo(
          '.title h2',
          1,
          {
            y: '0%',
            rotation: 0,
            transformOrigin: 'top right'
          },
          {
            y: '-120%',
            rotation: 5,
            ease: Expo.easeIn
          },
          'f1'
        )
        .fromTo(
          '.title-outline div',
          1,
          {
            y: '0%',
            rotation: 0,
            transformOrigin: 'top right'
          },
          {
            y: '-120%',
            rotation: 5,
            transformOrigin: 'top right',
            ease: Expo.easeIn
          },
          'f1'
        );
      // SECOND TIMELINE, APPEAR NEW PROJECT
      nextProjectTimeline2
        .addLabel('f1')
        .fromTo(
          '.title h2',
          1,
          {
            y: '120%',
            rotation: 5,
            transformOrigin: 'bottom left'
          },
          { y: '0%', rotation: 0, ease: Expo.easeOut },
          'f1'
        )
        .fromTo(
          '.title-outline div',
          1,
          {
            y: '120%',
            rotation: 5,
            transformOrigin: 'bottom left'
          },
          { y: '0%', rotation: 0, ease: Expo.easeOut },
          'f1'
        );
    },
    previousProject() {
      const previousProjectTimeline = new TimelineMax({
        onComplete: () => {
          this.decreaseProject();
          previousProjectTimeline2.play();
        }
      });
      const previousProjectTimeline2 = new TimelineMax({
        paused: true
      });

      // FIRST TIMELINE RETRACT TEXT
      previousProjectTimeline
        .addLabel('f1')
        .fromTo(
          '.title h2',
          1,
          {
            y: '0%',
            rotation: 0,
            transformOrigin: 'bottom left'
          },
          {
            y: '120%',
            rotation: 5,
            ease: Expo.easeIn
          },
          'f1'
        )
        .fromTo(
          '.title-outline div',
          1,
          {
            y: '0%',
            rotation: 0,
            transformOrigin: 'bottom left'
          },
          {
            y: '120%',
            rotation: 5,
            ease: Expo.easeIn
          },
          'f1'
        );
      // SECOND TIMELINE, APPEAR NEW PROJECT
      previousProjectTimeline2
        .addLabel('f1')
        .fromTo(
          '.title h2',
          1,
          {
            y: '-120%',
            rotation: 5,
            transformOrigin: 'top right'
          },
          { y: '0%', rotation: 0, ease: Expo.easeOut },
          'f1'
        )
        .fromTo(
          '.title-outline div',
          1,
          {
            y: '-120%',
            rotation: 5,
            transformOrigin: 'top right'
          },
          { y: '0%', rotation: 0, ease: Expo.easeOut },
          'f1'
        );
    },
    enterProjectSlider() {
      // const toIndexTimeline = new TimelineMax({});
    }
  }
};
</script>

<style lang="scss" scoped>
.previous {
  position: absolute;
  z-index: $beforefg;
  top: 50%;
  left: 0;
}
.next {
  position: absolute;
  z-index: $beforefg;
  top: 50%;
  left: 10%;
}
.project-slider-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  #fog {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: $normal;
    pointer-events: none;
  }
  .title-container {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: $up;
    pointer-events: none;

    .title {
      overflow: hidden;
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
      div {
        height: 30px;
        @include mq($from: tablet) {
          height: 40px;
        }
        @include mq($from: desktop_plus) {
          height: 50px;
        }
        @include mq($from: xlarge) {
          height: 60px;
        }
      }
    }
  }
}
</style>

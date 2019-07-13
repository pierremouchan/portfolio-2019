<template>
  <div class="project-slider-wrapper">
    <div class="title-container">
      <div class="title">
        <h2>{{ activeProject.title }}</h2>
      </div>
      <div class="title-outline">
        <div>{{ activeProject.title }}</div>
      </div>
      <div class="title-number">
        <div>0{{ this.$store.state.currentProject.number + 1 }}</div>
      </div>
    </div>
    <div class="button-mobile">
      <button class="previous" @click="previousProject">
        PREV
      </button>
      <button class="next" @click="nextProject">
        NEXT
      </button>
    </div>
    <div class="project-year">
      <div class="project-year__fixed">20</div>
      <div class="project-year__realised">
        <div>{{ activeProject.date.replace('20', '') }}</div>
      </div>
    </div>

    <div class="project-role">
      <div>{{ activeProject.role }}</div>
    </div>
    <div class="project-progressbar">
      <div class="project-progressbar__total">0{{ projects.length }}</div>
      <div class="project-progressbar__bar">
        <div class="bar-full"></div>
        <div
          class="bar-progress"
          :style="{ height: ((this.$store.state.currentProject.number + 1) / projects.length) * 100 + '%' }"
        ></div>
      </div>
      <div class="project-progressbar__current">0{{ this.$store.state.currentProject.number + 1 }}</div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, Expo, TweenMax, Back } from 'gsap';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      projects: this.$store.state.projects.list,
      nextProjectClicked: false,
      previousProjectClicked: false
    };
  },

  computed: {
    activeProject() {
      return this.projects[this.$store.state.currentProject.number];
    }
  },
  mounted() {
    this.listenNextProject();
    this.listenPreviousProject();
  },
  beforeDestroy() {
    this.resetCursorStatus();
    this.removeListener();
  },
  created() {},
  methods: {
    ...mapMutations({
      decreaseProject: 'currentProject/previousProject',
      increaseProject: 'currentProject/nextProject'
    }),
    listenPreviousProject() {
      // LISTEN TO CLICK == PREVIOUS
      const prevSide = document.querySelector('.sun-leftside');
      prevSide.addEventListener('click', () => {
        this.previousProject();
      });
      prevSide.addEventListener('mouseenter', () => {
        this.changeCursorStatus('PREV PREV PREV PREV');
      });
      prevSide.addEventListener('mouseleave', () => {
        this.resetCursorStatus();
      });
    },
    listenNextProject() {
      // LISTEN TO CLICK == NEXT
      const nextSide = document.querySelector('.sun-rightside');
      nextSide.addEventListener('click', () => {
        this.nextProject();
      });
      nextSide.addEventListener('mouseenter', () => {
        this.changeCursorStatus('NEXT NEXT NEXT NEXT');
      });
      nextSide.addEventListener('mouseleave', () => {
        this.resetCursorStatus();
      });
    },
    changeCursorStatus(prevOrNext) {
      document.querySelector('.cursor').classList.add('prev-next-active');
      document.querySelector('.cursor-torus textPath').textContent = prevOrNext;
      TweenMax.to('.cursor-torus', 0.5, {
        width: '300px',
        height: '300px',
        ease: Back.easeOut.config(5)
      });
      TweenMax.to('.cursor', 0.5, {
        width: '100px',
        height: '100px',
        opacity: 0.5,
        ease: Back.easeOut.config(2.5)
      });
    },
    removeListener() {
      let el = document.querySelector('.sun-leftside');
      let elClone = el.cloneNode(true);
      el.parentNode.replaceChild(elClone, el);

      el = document.querySelector('.sun-rightside');
      elClone = el.cloneNode(true);
      el.parentNode.replaceChild(elClone, el);
    },
    resetCursorStatus() {
      document.querySelector('.cursor').classList.remove('prev-next-active');
      document.querySelector('.cursor-torus textPath').textContent = '';
      TweenMax.to('.cursor-torus', 0.5, {
        width: '100px',
        height: '100px',
        ease: Back.easeOut.config(5)
      });
      TweenMax.to('.cursor', 0.5, {
        width: '5px',
        height: '5px',
        opacity: 1,
        ease: Expo.easeOut
      });
    },
    nextProject() {
      if (!this.nextProjectClicked) {
        this.nextProjectClicked = true;
        const nextProjectTimeline = new TimelineMax({
          onComplete: () => {
            this.increaseProject();
            nextProjectTimeline2.play();
            this.nextProjectClicked = false;
          }
        });
        const nextProjectTimeline2 = new TimelineMax({
          paused: true,
          onComplete: () => {}
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
              y: '-150%',
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
              y: '-150%',
              rotation: 5,
              transformOrigin: 'top right',
              ease: Expo.easeIn
            },
            'f1'
          )
          .fromTo(
            '.title-number div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'top right'
            },
            {
              y: '-150%',
              rotation: 5,
              transformOrigin: 'top right',
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .fromTo(
            '.project-role div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'top right'
            },
            {
              y: '150%',
              rotation: 5,
              transformOrigin: 'top right',
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .fromTo(
            '.project-year__realised div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'top right'
            },
            {
              y: '150%',
              rotation: 10,
              transformOrigin: 'top right',
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .to('.background-project', 0.5, { width: '90%', height: '90%', ease: Back.easeIn.config(1) }, 'f1+=0.25');
        // SECOND TIMELINE, APPEAR NEW PROJECT
        nextProjectTimeline2
          .addLabel('f1')
          .fromTo(
            '.title h2',
            1,
            {
              y: '150%',
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
              y: '150%',
              rotation: 5,
              transformOrigin: 'bottom left'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1'
          )
          .fromTo(
            '.title-number div',
            1,
            {
              y: '150%',
              rotation: 5,
              transformOrigin: 'bottom left'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1+=0.25'
          )
          .fromTo(
            '.project-role div',
            1,
            {
              y: '150%',
              rotation: 5,
              transformOrigin: 'bottom left'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1+=0.25'
          )
          .fromTo(
            '.project-year__realised div',
            1,
            {
              y: '150%',
              rotation: 10,
              transformOrigin: 'bottom left'
            },
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'bottom left',
              ease: Expo.easeOut
            },
            'f1+=0.25'
          )
          .to('.background-project', 0.5, { width: '110%', height: '110%', ease: Back.easeOut.config(1) }, 'f1+=0.25');
      }
    },
    previousProject() {
      if (!this.previousProjectClicked) {
        this.previousProjectClicked = true;
        const previousProjectTimeline = new TimelineMax({
          onComplete: () => {
            this.decreaseProject();
            previousProjectTimeline2.play();
            this.previousProjectClicked = false;
          }
        });
        const previousProjectTimeline2 = new TimelineMax({
          paused: true,
          onComplete: () => {}
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
              y: '150%',
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
              y: '150%',
              rotation: 5,
              ease: Expo.easeIn
            },
            'f1'
          )
          .fromTo(
            '.title-number div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'bottom left'
            },
            {
              y: '150%',
              rotation: 5,
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .fromTo(
            '.project-role div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'bottom left'
            },
            {
              y: '150%',
              rotation: 5,
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .fromTo(
            '.project-year__realised div',
            1,
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'bottom left'
            },
            {
              y: '150%',
              rotation: 10,
              transformOrigin: 'bottom left',
              ease: Expo.easeIn
            },
            'f1+=0.25'
          )
          .to('.background-project', 0.5, { width: '90%', height: '90%', ease: Back.easeIn.config(1) }, 'f1+=0.25');
        // SECOND TIMELINE, APPEAR NEW PROJECT
        previousProjectTimeline2
          .addLabel('f1')
          .fromTo(
            '.title h2',
            1,
            {
              y: '-150%',
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
              y: '-150%',
              rotation: 5,
              transformOrigin: 'top right'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1'
          )
          .fromTo(
            '.title-number div',
            1,
            {
              y: '-150%',
              rotation: 5,
              transformOrigin: 'top right'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1+=0.25'
          )
          .fromTo(
            '.project-role div',
            1,
            {
              y: '150%',
              rotation: 5,
              transformOrigin: 'top right'
            },
            { y: '0%', rotation: 0, ease: Expo.easeOut },
            'f1+=0.25'
          )
          .fromTo(
            '.project-year__realised div',
            1,
            {
              y: '150%',
              rotation: 10,
              transformOrigin: 'top right'
            },
            {
              y: '0%',
              rotation: 0,
              transformOrigin: 'top right',
              ease: Expo.easeOut
            },
            'f1+=0.25'
          )
          .to('.background-project', 0.5, { width: '110%', height: '110%', ease: Back.easeOut.config(1) }, 'f1+=0.25');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button-mobile {
  display: block;
  position: absolute;
  z-index: $beforefg;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  @include mq($from: tablet) {
    bottom: 5%;
  }
  @include mq($from: desktop_plus) {
    display: none;
  }
}
.previous {
  position: relative;
  border: none;
  background: none;
  color: $black;
  font-weight: bold;
  font-size: 32px;
  font-family: $font-title;
  margin: 0 15px;
  &:before {
    z-index: $down;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: $red;
    opacity: 0.5;
    transition: opacity 0.5s;
  }
  &:active {
    &:before {
      opacity: 1;
    }
  }
}
.next {
  position: relative;
  border: none;
  background: none;
  color: $black;
  font-weight: bold;
  font-size: 32px;
  font-family: $font-title;
  margin: 0 15px;
  &:before {
    z-index: $down;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: $red;
    opacity: 0.5;
    transition: opacity 0.5s;
  }
  &:active {
    &:before {
      opacity: 1;
    }
  }
}
.project-slider-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  .title-container {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
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
        transform: translateY(150%);
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
      -webkit-text-stroke: 1px $black;
      overflow: hidden;
      height: 30px;
      @include mq($from: tablet) {
        -webkit-text-stroke: 2px $black;
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
    .title-number {
      position: absolute;
      top: -35%;
      right: -15px;
      font-family: $font-title;
      font-weight: 900;
      color: $transparent;
      -webkit-text-stroke: 1px $black;
      font-size: 35px;
      overflow: hidden;
      height: fit-content;
      @include mq($from: tablet) {
        -webkit-text-stroke: 2px $black;

        right: -35px;
      }
      @include mq($from: desktop_plus) {
        right: -70px;
        top: -40%;
      }
      div {
        line-height: normal;
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
  }
  .project-year {
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: $font-title;
    font-weight: 900;
    font-size: 50px;
    line-height: normal;
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
    &__fixed {
      color: $transparent;
      -webkit-text-stroke: 1px $black;
      @include mq($from: tablet) {
        -webkit-text-stroke: 2px $black;
      }
    }
    &__realised {
      position: absolute;
      top: 30%;
      left: 50%;
      overflow: hidden;
    }
  }
  .project-role {
    position: absolute;
    bottom: 0;
    right: 0;
    font-family: $font-title;
    font-weight: 900;
    font-size: 20px;
    line-height: 25px;
    margin: 10px;
    overflow: hidden;
    color: $black;
    @include mq($from: tablet) {
      font-size: 30px;
    }
    @include mq($from: desktop_plus) {
      font-size: 35px;
    }
    @include mq($from: xlarge) {
    }
  }
  .project-progressbar {
    position: absolute;
    top: 80%;
    left: 32px;
    font-weight: 900;
    font-family: $font-title;
    font-size: 16px;
    display: flex;
    flex-direction: column;

    @include mq($from: tablet) {
      top: 50%;
      transform: translateY(-50%);
    }

    &__total {
      color: $transparent;
      line-height: normal;
      margin: 10px auto;
      -webkit-text-stroke: 1px $black;
    }
    &__bar {
      position: relative;
      height: 5vh;
      transform: rotate(180deg);
      @include mq($from: tablet) {
        height: 20vh;
      }
      .bar-full {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
        background-color: $black;
        opacity: 50%;
      }
      .bar-progress {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        width: 3px;
        background-color: $black;
        transition: height 0.5s;
      }
    }
    &__current {
      color: $black;
      line-height: normal;
      margin: 10px auto;
    }
  }
}
</style>

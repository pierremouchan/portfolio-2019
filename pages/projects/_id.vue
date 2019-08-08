<template>
  <div class="project-container">
    <div class="project-hero">
      <div class="hscroll-wrapper">
        <h1 class="hscroll">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </h1>
        <div class="hscroll">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </div>
      </div>
      <div class="hscroll-wrapper">
        <div class="hscroll-reverse">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </div>
        <div class="hscroll-reverse">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </div>
      </div>
      <div class="hscroll-wrapper">
        <div class="hscroll">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </div>
        <div class="hscroll">
          {{ activeProject.title }} - {{ activeProject.title }} - {{ activeProject.title }} -&nbsp;
        </div>
      </div>
    </div>
    <article>
      <div class="project-intro">
        <div class="main-quote">
          <blockquote v-html="activeProject.mainQuote"></blockquote>
        </div>
        <p class="tech-year">{{ activeProject.mainTech }} - {{ activeProject.date }}</p>
        <p class="main-desc">{{ activeProject.mainDesc }}</p>
        <p class="techs">
          <span v-for="tech in activeProject.othersTech" :key="tech">{{ tech }}</span>
        </p>
      </div>
      <div class="main-img">
        <div class="main-img__mask"></div>
        <img :src="activeProject.othersImg[0]" :alt="'Mockup for ' + activeProject.title" />
      </div>
      <div class="project-history">
        <div class="project-history__text">
          <blockquote class="second-quote" v-html="activeProject.secondQuote"></blockquote>
          <p>{{ activeProject.secondDesc }}</p>
        </div>
        <div class="project-history__title" :data-title="activeProject.title">{{ activeProject.title }}</div>
      </div>
      <div class="others-img">
        <div class="vertical-img">
          <div class="vertical-img__mask"></div>
          <img :src="activeProject.othersImg[1]" :alt="'Mockup for ' + activeProject.title" />
        </div>
        <div class="square-img">
          <div class="square-img__mask"></div>
          <img :src="activeProject.othersImg[2]" :alt="'Mockup for ' + activeProject.title" />
        </div>
      </div>
      <div class="back-gallery">
        <nuxt-link to="/">
          BACK TO
          <br />GALLERY
        </nuxt-link>
      </div>
    </article>
  </div>
</template>
<script>
import Bound from 'bounds.js';
import { Expo, TimelineMax } from 'gsap';
import { fromProject, toProject } from '~/assets/js/transitions/fromToProject';

export default {
  data() {
    return {
      id: this.$route.params.id,
      projects: this.$store.state.projects.list
    };
  },
  computed: {
    activeProject() {
      return this.projects.find(project => project.id === this.id);
    }
  },
  created() {
    this.check404();
  },
  mounted() {
    if (this.$store.state.loader.alreadyLoaded) {
      toProject();
    }
    this.revealEl();
  },
  beforeRouteLeave(to, from, next) {
    fromProject(next);
  },
  head() {
    return {
      title: `Pierre Mouchan | `,
      titleTemplate: `%s${this.activeProject.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Project - Pierre Mouchan, ${this.activeProject.title}. (${this.activeProject.mainTech})`
        }
      ]
    };
  },
  methods: {
    revealEl() {
      const boundary = Bound({
        root: this.window,
        threshold: 0.1
      });
      const projectFullImg = document.querySelector('.main-img__mask');
      const projectVerticalImg = document.querySelector('.vertical-img__mask');
      const projectSquareImg = document.querySelector('.square-img__mask');

      // FULL IMG
      const whenFullImgEnters = () => {
        const revealFullImg = new TimelineMax();
        revealFullImg
          .addLabel('f1')
          .to(projectFullImg, 0.5, { transformOrigin: 'right bottom', scaleX: 0, ease: Expo.easeInOut }, 'f1')
          .fromTo(
            '.main-img img',
            0.5,
            { scale: 1.3, rotation: 2, transformOrigin: 'center center' },
            { scale: 1.0, rotation: 0 },
            'f1+=0.25'
          );
        boundary.unWatch(projectFullImg);
      };
      boundary.watch(projectFullImg, whenFullImgEnters);

      const whenVerticalImgEnters = () => {
        const revealVerticalImg = new TimelineMax();
        revealVerticalImg
          .addLabel('f1')
          .to(projectVerticalImg, 0.5, { transformOrigin: 'right bottom', scaleX: 0, ease: Expo.easeInOut }, 'f1')
          .fromTo(
            '.vertical-img img',
            0.5,
            { scale: 1.3, rotation: 2, transformOrigin: 'center center' },
            { scale: 1.0, rotation: 0 },
            'f1+=0.25'
          );
        boundary.unWatch(projectVerticalImg);
      };
      boundary.watch(projectVerticalImg, whenVerticalImgEnters);

      const whenSquareImgEnters = () => {
        const revealSquareImg = new TimelineMax();
        revealSquareImg
          .addLabel('f1')
          .to(projectSquareImg, 0.5, { transformOrigin: 'right bottom', scaleX: 0, ease: Expo.easeInOut }, 'f1')
          .fromTo(
            '.square-img img',
            0.5,
            { scale: 1.3, rotation: 2, transformOrigin: 'center center' },
            { scale: 1.0, rotation: 0 },
            'f1+=0.25'
          );
        boundary.unWatch(projectSquareImg);
      };
      boundary.watch(projectSquareImg, whenSquareImgEnters);
    },

    check404() {
      if (this.projects.find(project => project.id === this.id) === undefined) {
        return this.$nuxt.$router.push('/error');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.project-container {
  position: relative;
  z-index: $up;
  max-width: 100vw;
  overflow: hidden;
  .project-hero {
    height: 80vh;
    .hscroll-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .hscroll,
      .hscroll-reverse {
        display: inline-block;
        font-family: $font-title;
        font-weight: 900;
        font-size: 20vh;
        line-height: normal;
      }
      .hscroll {
        color: $black;
        animation: hscrollTranslate 15s linear infinite;
      }
      .hscroll-reverse {
        color: $transparent;
        -webkit-text-stroke: 2px $black;
        transform: translateX(-100%);
        animation: hscrollReverseTranslate 15s linear infinite;
      }
    }
    @keyframes hscrollTranslate {
      100% {
        transform: translateX(-100%);
      }
    }
    @keyframes hscrollReverseTranslate {
      100% {
        transform: translateX(0%);
      }
    }
  }
  article {
    width: 100%;
    height: fit-content;
    background-color: $white;
    .project-intro {
      position: relative;
      display: block;
      width: 90vw;
      margin: 0 auto;
      padding: 0 0 5vh 0;
      @include mq($from: tablet) {
        padding: 5vh 0;
      }
      @include mq($from: desktop_plus) {
        width: 40vw;
      }
      .main-quote {
        overflow: hidden;
        position: relative;
        font-family: $font-title;
        font-size: 32px;
        line-height: normal;
        font-weight: 900;
        text-align: center;
        margin-bottom: 40px;
      }
      .tech-year {
        position: relative;
        font-family: $font-title;
        font-size: 24px;
        line-height: normal;
        font-weight: 900;
        text-align: center;
        margin-bottom: 15px;
        &:before {
          content: '';
          position: absolute;
          top: -75%;
          left: 50%;
          transform: translateX(-50%);
          background-color: $black;
          width: 40%;
          height: 2px;
        }
      }
      .main-desc {
        text-align: left;
        margin-bottom: 15px;
      }
      .techs {
        font-family: $font-title;
        line-height: normal;
        font-weight: 900;
        font-size: 24px;
        text-align: center;
        color: $transparent;
        -webkit-text-stroke: 1px $black;
        span {
          &:not(:last-child):after {
            content: ' - ';
          }
        }
      }
    }
    .main-img {
      overflow: hidden;
      position: relative;
      &__mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $black;
        z-index: $up;
      }
    }
    .project-history {
      display: flex;
      flex-direction: column;
      margin: 10vh auto;
      @include mq($from: desktop_plus) {
        flex-direction: row;
        align-items: center;
        width: 80%;
      }
      &__title {
        width: fit-content;
        height: fit-content;
        position: relative;
        font-family: $font-title;
        color: $black;
        font-weight: 900;
        font-size: 32px;
        line-height: normal;
        text-align: center;
        margin: 10vh auto;
        @include mq($from: tablet) {
          font-size: 48px;
        }
        @include mq($from: desktop_plus) {
          margin: 0 0 0 5vw;
        }
        @include mq($from: wide) {
          font-size: 80px;
        }

        &:before {
          content: attr(data-title);
          font-family: $font-title;
          color: $transparent;
          -webkit-text-stroke: 2px $black;
          font-weight: 900;
          position: absolute;
          top: -50%;
          left: -10px;
          @include mq($from: desktop_plus) {
            left: -30px;
          }
        }
        &:after {
          content: attr(data-title);
          font-family: $font-title;
          color: $transparent;
          -webkit-text-stroke: 2px $black;
          font-weight: 900;
          position: absolute;
          bottom: -50%;
          right: -10px;
          @include mq($from: desktop_plus) {
            right: -30px;
          }
        }
      }
      &__text {
        margin: 0 auto;
        width: 90vw;
        @include mq($from: desktop_plus) {
          width: 40vw;
        }
        .second-quote {
          position: relative;
          font-family: $font-title;
          font-size: 32px;
          line-height: normal;
          font-weight: 900;
          text-align: center;
          margin-bottom: 40px;
        }
        p {
        }
      }
    }
    .others-img {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 5vh;
      @include mq($from: desktop) {
        flex-direction: row;
        height: 75vh;
        width: 90%;
        margin: 0 auto;
      }
      .vertical-img {
        position: relative;
        margin-bottom: 5vh;
        @include mq($from: desktop) {
          margin-bottom: 0;
          overflow: hidden;
          margin-right: 2.5vh;
          img {
            height: 100%;
            object-fit: cover;
          }
        }
        &__mask {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: $black;
          z-index: $up;
        }
      }
      .square-img {
        position: relative;
        @include mq($from: desktop) {
          overflow: hidden;
          margin-left: 2.5vh;
          img {
            height: 100%;
            object-fit: cover;
          }
        }
        &__mask {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: $black;
          z-index: $up;
        }
      }
    }
    .back-gallery {
      margin: 10vh 0;
      a {
        font-family: $font-title;
        font-weight: 900;
        font-size: 50px;
        @include mq($from: tablet) {
          font-size: 100px;
        }
        @include mq($from: wide) {
          font-size: 150px;
        }
        line-height: normal;
        display: block;
        width: fit-content;
        margin: 0 auto;
        color: $transparent;
        transition: color 0.5s;
        -webkit-text-stroke: 2px $black;
        &:hover {
          color: $black;
        }
      }
    }
  }
}
</style>

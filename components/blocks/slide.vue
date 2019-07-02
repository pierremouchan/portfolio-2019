<template>
  <div class="slide-container">
    <div class="project-slider-container">
      <div class="slider__frame">
        <nuxt-link
          class="slider__frame-container"
          :to="'/projects/' + projects[currentProject].id"
        >
          <img :src="projects[currentProject].mainImg" alt="" />
          <svg>
            <defs>
              <filter id="filter-gooey">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.01 0.003"
                  numOctaves="5"
                  seed="2"
                  stitchTiles="noStitch"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  result="noise"
                ></feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="0"
                  xChannelSelector="R"
                  yChannelSelector="B"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  filterUnits="userSpaceOnUse"
                ></feDisplacementMap>
              </filter>
            </defs>
          </svg>
        </nuxt-link>
        <div class="slider__frame__info">
          <div class="frame__info__title">
            <h3>{{ projects[currentProject].mainTech }}</h3>
            <span class="title__separator"></span>
          </div>
          <p class="frame__info__desc">
            {{ projects[currentProject].mainDesc }}
          </p>
        </div>
      </div>
      <p class="slider__numero">{{ currentProject + 1 }}.</p>
      <div class="title-container">
        <h2>{{ projects[currentProject].title }}</h2>
      </div>
      <div class="slider__divider-bottom"></div>
    </div>
    <div class="button-container">
      <div class="button-left">
        <arrowSlider></arrowSlider>
      </div>
      <div class="button-right">
        <arrowSlider></arrowSlider>
      </div>
    </div>

    <div class="project-name">
      <p>
        <strong>{{ projects[currentProject].sliderTitle[0] }}</strong>
      </p>
    </div>
    <div class="project-name-duplicated">
      <p>
        <strong>{{ projects[currentProject].sliderTitle[1] }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import arrowSlider from '~/static/images/icons/arrow-slider.svg?inline';
export default {
  components: {
    arrowSlider
  },
  data() {
    return {
      projects: this.$store.state.projects.list,
      currentProject: 0
    };
  },
  created() {
    console.log(this.projects);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.slide-container {
  z-index: $normal;
  .project-slider-container {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 10vh;
    width: 90vw;
    height: 80vh;
    @include mq($from: tablet) {
      top: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 80vh;
    }

    .slider__frame {
      height: 100%;
      overflow: hidden;
      &-container {
        position: relative;
        overflow: hidden;
        height: 50%;
        display: block;
        @include mq($from: tablet) {
          height: 75%;
        }
        img {
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: url('#filter-gooey');
        }
        &:hover {
          img {
          }
        }
        svg {
          height: 0;
          position: absolute;
        }
      }

      &__info {
        overflow: hidden;
        .frame__info__title {
          position: relative;
          display: flex;
          flex-direction: row;
          height: max-content;
          align-items: center;

          h3 {
            padding-right: 15px;
            @include mq($from: tablet) {
              font-size: $h5-size-desktop;
            }
          }
          .title__separator {
            flex-grow: 1;
            height: 1px;
            background-color: $black;
          }
        }

        .frame__info__desc {
        }
      }
    }
    p.slider__numero {
      position: absolute;
      top: 0;
      left: 0;
      font-size: $h1-size-desktop;
      font-family: $font-title;
      color: $red;
    }
    .title-container {
      position: absolute;
      top: 2.5%;
      right: 0;
      max-width: 60%;
      overflow: hidden;
      background-color: $black;
      transform: translateX(-25%);
      @include mq($from: tablet) {
        transform: translateX(25%);
        max-width: unset;
      }
      h2 {
        color: $white;
        position: relative;
        line-height: normal;
        text-align: right;
      }
    }
    .slider__divider-bottom {
      height: 4px;
      width: 80%;
      position: absolute;
      top: 47.5%;
      left: -10%;
      background-color: $red;
      pointer-events: none;
      @include mq($from: tablet) {
        top: 70%;
      }
    }
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 10vh;
    width: 100%;

    @include mq($from: tablet) {
      display: none;
    }

    .button-left {
      position: relative;
      width: 49%;
      display: flex;
      justify-content: center;
      background-color: $red;

      svg {
        width: 30px;
        transform: rotate(180deg);
        fill: $white;
      }
      &:hover {
        background-color: darken($red, 10%);
      }
    }
    .button-right {
      position: relative;
      width: 49%;
      display: flex;
      justify-content: center;
      background-color: $red;
      svg {
        width: 30px;
        fill: $white;
      }
      &:hover {
        background-color: darken($red, 10%);
      }
    }
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
      font-weight: 900;
      line-height: 110px;
      @include mq($from: tablet) {
        line-height: 150px;
      }
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

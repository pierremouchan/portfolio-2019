<template>
  <div class="sun-background-wrapper">
    <div class="sun-leftside"></div>
    <div class="sun-background">
      <nuxt-link id="sun" :to="'/projects/' + projects[this.$store.state.currentProject.number].id">
        <Sun></Sun>
      </nuxt-link>
      <div class="background-project">
        <div class="repeated" :style="{ backgroundImage: `url('${activeProjectBackground}')` }"></div>
      </div>
    </div>
    <div class="sun-rightside"></div>
  </div>
</template>
<script>
import { TweenMax, Expo } from 'gsap';
import Sun from '~/static/images/icons/sun.svg?inline';

export default {
  components: {
    Sun
  },
  data() {
    return {
      projects: this.$store.state.projects.list
    };
  },
  computed: {
    activeProjectBackground() {
      return this.projects[this.$store.state.currentProject.number].mainImg;
    }
  }
};
</script>
<style lang="scss" scoped>
.sun-background-wrapper {
  margin: 4px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100vw;
  height: 85vh;
  max-width: 100vw;
  max-height: 85vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @include mq($from: desktop_plus) {
  }
  .sun-leftside {
    visibility: hidden;
    @include mq($from: desktop_plus) {
      flex-grow: 1;
      visibility: visible;
      height: 100%;
    }
  }
  .sun-rightside {
    visibility: hidden;
    @include mq($from: desktop_plus) {
      flex-grow: 1;
      visibility: visible;
      height: 100%;
    }
  }
  .sun-background {
    position: relative;
    transform: scale(0);
    width: 80%;
    max-width: 700px;
    @include mq($from: tablet) {
      width: 60%;
    }
    @include mq($from: desktop) {
      position: relative;
      top: unset;
      left: unset;
      width: 45%;
    }
    @include mq($from: small) {
      width: 45%;
    }
    @include mq($from: hd) {
      width: 55%;
    }
    #sun {
      z-index: $normal;
    }
    .background-project {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: $down;
      border-radius: 100%;
      width: 110%;
      height: 110%;
      overflow: hidden;
      .repeated {
        width: inherit;
        height: inherit;
        background-size: 250px 250px;
        background-repeat: repeat;
        background-position: 0 0;
        animation: bgPosition 10s infinite linear;
        transition: background-image 2s;
      }
      @keyframes bgPosition {
        100% {
          // BACKGROUND POSITION HAS TO BE THE SAME WIDTH AS THE BACKGROUND
          background-position: 250px 250px;
        }
      }
    }
    .distorst {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
  }
}
</style>

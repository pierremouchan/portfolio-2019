<template>
  <div class="sun-background-wrapper">
    <div class="sun-leftside"></div>
    <div class="sun-background">
      <nuxt-link id="sun" :to="'/projects/' + projects[this.$store.state.currentProject.number].id">
        <Sun></Sun>
      </nuxt-link>
      <div class="background-project">
        <div class="repeated" :style="{ backgroundImage: `url('${activeProjectBackground}')` }"></div>
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="free-lag-bgimage"
          :style="{ backgroundImage: `url('${project.mainImg}')` }"
        ></div>
      </div>
      <Distorst class="distorst"></Distorst>
    </div>
    <div class="sun-rightside"></div>
  </div>
</template>
<script>
import Sun from '~/static/images/icons/sun.svg?inline';
import Distorst from '~/static/images/distorst.svg?inline';

export default {
  components: {
    Sun,
    Distorst
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
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
      height: 85%;
    }
  }
  .sun-rightside {
    visibility: hidden;
    @include mq($from: desktop_plus) {
      flex-grow: 1;
      visibility: visible;
      height: 85%;
    }
  }
  .sun-background {
    position: relative;
    width: 80vw;
    max-width: 750px;
    @include mq($from: tablet) {
      width: 70vw;
    }
    @include mq($from: desktop_plus) {
      position: relative;
      top: unset;
      left: unset;
      transform: unset;
      width: 55vw;
    }
    @include mq($from: small) {
      width: 45vw;
    }
    @include mq($from: hd) {
      width: 60vw;
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
      .repeated,
      .free-lag-bgimage {
        filter: url('#distortionFilter');
        width: inherit;
        height: inherit;
        background-size: 250px 250px;
        background-repeat: repeat;
        background-position: 0 0;
        animation: bgPosition 10s infinite linear;
        transition: background-image 2s;
      }
      .free-lag-bgimage {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $background;
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

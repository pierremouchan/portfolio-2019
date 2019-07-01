<template>
  <div class="slide-container">
    <div class="project-slider-container"></div>
    <div class="project-name">
      <p><strong>CLISHARE PROJECT</strong></p>
    </div>
    <div class="project-name-duplicated">
      <p><strong>CLISHARE PROJECT</strong></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.slide-container {
  .project-slider-container {
    position: relative;
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
      line-height: 110px;
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

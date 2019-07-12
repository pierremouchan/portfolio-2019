<template>
  <div class="container-404">
    <h1 v-if="error.statusCode === 404">404</h1>
    <h1 v-else>ERROR</h1>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['error']
};
</script>

<style lang="scss" scoped>
.container-404 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $up;
  h1 {
    font-weight: 900;
    font-family: $font-title;
    font-size: 100px;
    color: $red;
    -webkit-text-stroke: 2px $transparent;
    line-height: normal;
    animation: errorBlink 0.5s linear infinite alternate;
    @include mq($from: desktop_plus) {
      font-size: 150px;
    }
    @include mq($from: xlarge) {
      font-size: 250px;
    }

    @keyframes errorBlink {
      to {
        color: $transparent;
        -webkit-text-stroke: 2px $red;
      }
    }
  }
  a {
    width: fit-content;
    display: block;
    margin: 0 auto;
    font-weight: 900;
    font-size: 24px;
    color: $red;
    text-decoration: underline;
  }
}
</style>

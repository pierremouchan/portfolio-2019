<template>
  <div class="index-container">
    <projects-slider></projects-slider>
  </div>
</template>

<script>
import projectsSlider from '~/components/projectsSlider';
// eslint-disable-next-line no-unused-vars
import { toIndex, fromIndex } from '~/assets/js/transitions/fromToIndex';
export default {
  components: {
    projectsSlider
  },
  data() {
    return {};
  },
  created() {
    console.log('created');
  },
  mounted() {
    toIndex();
    console.log('mounted');
  },
  methods: {},
  // transition: {
  //   mode: 'out-in',
  //   leave(el, done) {
  //     console.log('leave');
  //     fromIndex(done);
  //   },
  //   enter(el, done) {
  //     console.log('enter');
  //     toIndex(done);
  //   }
  // },
  beforeRouteLeave(to, from, next) {
    fromIndex(next);
  },
  head() {
    return {
      titleTemplate: '%s Portfolio'
    };
  }
};
</script>

<style lang="scss" scoped></style>

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
  beforeRouteLeave(to, from, next) {
    fromIndex(next);
  },
  head() {
    return {
      titleTemplate: '%s Creative Developer'
    };
  }
};
</script>

<style lang="scss" scoped></style>

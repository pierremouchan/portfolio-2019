<template>
  <div class="index-container">
    <projects-slider></projects-slider>
  </div>
</template>

<script>
import projectsSlider from '~/components/projectsSlider';
import { toIndex, fromIndex } from '~/assets/js/transitions/fromToIndex';
export default {
  components: {
    projectsSlider
  },
  data() {
    return {};
  },
  mounted() {
    toIndex();
    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      alreadyLoaded => {
        if (alreadyLoaded) {
          toIndex();
        }
      }
    );
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

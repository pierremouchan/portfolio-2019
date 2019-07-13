<template>
  <main class="index-container">
    <projects-slider></projects-slider>
  </main>
</template>

<script>
import { TweenMax } from 'gsap';
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
    if (this.$store.state.loader.alreadyLoaded) {
      toIndex();
    } else {
      TweenMax.set('.title h2', {
        y: '120%'
      });
      TweenMax.set('.title-outline div', {
        y: '150%'
      });
    }

    this.$store.watch(
      () => this.$store.state.loader.alreadyLoaded,
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

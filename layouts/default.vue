<template>
  <div>
    <loading></loading>
    <header-cmp></header-cmp>
    <nuxt />
    <cursor-cmp></cursor-cmp>
    <three-js></three-js>
  </div>
</template>

<script>
import loading from '~/components/loading';
import headerCmp from '~/components/header';
import threeJs from '~/components/threejs';
import cursorCmp from '~/components/blocks/cursor';

export default {
  components: {
    loading,
    headerCmp,
    threeJs,
    cursorCmp
  },
  head() {
    return {
      title: `Pierre Mouchan | `,
      titleTemplate: `%s${this.routeCleanName()}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Portfolio - Pierre Mouchan, a passionate creative developer.'
        }
      ]
    };
  },
  methods: {
    routeCleanName() {
      const cleanName = this.$route.path.replace('/', '');
      return cleanName.charAt(0).toUpperCase() + cleanName.substr(1);
    }
  }
};
</script>

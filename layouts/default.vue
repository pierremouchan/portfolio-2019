<template>
  <div>
    <loading></loading>
    <header-cmp></header-cmp>
    <nuxt />
    <threeJS></threeJS>
  </div>
</template>

<script>
import loading from '~/components/loading';
import headerCmp from '~/components/header';
import threeJS from '~/components/threejs';

export default {
  components: {
    loading,
    headerCmp,
    threeJS
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

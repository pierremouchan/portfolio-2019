<template>
  <div class="container">
    <h1 class="title">Boilerplate NuxtJS{{ progress }}</h1>
    <nuxt-link to="/about">About</nuxt-link>
    <nuxt-link to="/">Index</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: ''
    };
  },
  mounted() {},
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Description content'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>

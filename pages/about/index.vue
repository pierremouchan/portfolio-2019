<template>
  <div class="container">
    <h1 class="title">Boilerplate NuxtJS</h1>
    <nuxt-link to="/about">About</nuxt-link>
    <nuxt-link to="/">Index</nuxt-link>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Portfolio - Who is Pierre Mouchan ? (a creative developer 🤙)'
        }
      ]
    };
  }
};
</script>

<style scoped></style>

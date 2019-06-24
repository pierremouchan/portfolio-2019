<template>
  <div>
    <nuxt />
    <loading></loading>
  </div>
</template>

<script>
import loading from '~/components/loading';
export default {
  components: {
    loading
  }
};
</script>

<template lang="html">
  <transition>
    <div v-if="!isLoaded" class="loading-page">
      <p>{{ loadingStatus }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false,
      loadingStatus: 0,
      loadingTimeLimit: this.$nuxt.$settings.maxLoadingTime,
      loadingInterval: 4
    };
  },
  created() {
    // COOKIE FOR THE CURRENT SESSION
    sessionStorage.getItem('loaderCookie') === 'true'
      ? this.finishLoading()
      : this.startLoading();
    this.startLoading();
  },

  methods: {
    // START LOADING
    startLoading() {
      sessionStorage.setItem('loaderCookie', 'true');
      const increaseLoading = setInterval(() => {
        if (this.loadingStatus === 100) {
          clearInterval(increaseLoading);
        } else {
          this.loadingStatus++;
        }
      }, this.loadingTimeLimit / this.$nuxt.$settings.loadingSpeed);
      setTimeout(() => {
        this.finishLoading();
      }, this.loadingTimeLimit);
    },
    // FINISH LOADING
    finishLoading() {
      this.isLoaded = true;
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(69, 69, 69, 1);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
.loading-page p {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

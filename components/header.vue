<template>
  <header>
    <nuxt-link id="logo" to="/" @click.native="onRouteChange">
      <pm-logo></pm-logo>
    </nuxt-link>

    <nav>
      <ul>
        <li>
          <nuxt-link to="/" @click.native="onRouteChange">HOME</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/messages" @click.native="onRouteChange"
            >MESSAGES</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/about" @click.native="onRouteChange">ABOUT</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { TweenMax, Expo, TimelineMax } from 'gsap';
import pmLogo from '~/static/images/icons/logo.svg?inline';
export default {
  components: {
    pmLogo
  },
  data() {
    return {};
  },
  created() {
    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      isalreadyLoaded => {
        switch (isalreadyLoaded) {
          case true:
            TweenMax.fromTo(
              '#logo svg',
              1,
              { y: '-100%' },
              { y: '0%', ease: Expo.easeOut }
            );
            TweenMax.staggerFromTo(
              'nav ul li',
              2,
              { y: '-100%' },
              { y: '0%', ease: Expo.easeOut },
              0.25
            );
            break;
        }
      }
    );
  },
  methods: {
    onRouteChange() {
      document
        .querySelector('.nuxt-link-exact-active')
        .classList.remove('nuxt-link-exact-active');
      const onRouteChangeTimeline = new TimelineMax({});
      onRouteChangeTimeline
        .staggerFromTo(
          'nav ul li',
          0.75,
          { y: '0%' },
          { y: '-100%', ease: Expo.easeIn },
          0.1
        )
        .staggerFromTo(
          'nav ul li',
          0.75,
          { y: '100%' },
          {
            y: '0%',
            ease: Expo.easeOut
          },
          0.1
        );
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 48px;
  z-index: $beforefg;
  #logo {
    position: absolute;
    width: 56px;
    height: 32px;
    left: 16px;
    bottom: 0;
    overflow: hidden;
    svg {
    }

    @include mq($from: tablet) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  nav {
    position: absolute;
    bottom: 0;
    right: 16px;
    width: 75%;
    @include mq($from: tablet) {
      width: 40%;
    }
    @include mq($from: wide) {
      width: 20%;
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      overflow: hidden;
      li {
        overflow: hidden;
        a {
          position: relative;
          letter-spacing: 4px;
          z-index: $normal;

          @include mq($until: 375px) {
            letter-spacing: 0;
          }
          &.nuxt-link-exact-active {
            font-weight: bold;

            &:before {
              content: '';
              background-color: $red;
              opacity: 0.8;
              width: 100%;
              height: 8px;
              z-index: $beforebg;

              position: absolute;
              bottom: -25%;
              transform: translateY(-50%);
              left: 0;
              transition: left 1s cubic-bezier(0.1, 0.86, 0.2, 1.23);
            }

            &:hover {
              &:before {
                left: 25%;
              }
            }
          }
          &:not(.nuxt-link-exact-active) {
            &:before {
              content: '';
              background-color: $red;
              opacity: 0.8;
              width: 100%;
              height: 8px;
              z-index: $beforebg;

              position: absolute;
              bottom: -25%;
              transform: translateY(-50%);
              left: -100%;
              transition: left 1s cubic-bezier(0.1, 0.86, 0.2, 1.23);
            }

            &:hover {
              &:before {
                left: 25%;
              }
            }
          }
        }
      }
    }
  }
}
</style>

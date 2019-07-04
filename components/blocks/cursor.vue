<template>
  <div class="cursor-container">
    <div class="cursor"></div>
    <div class="cursor-torus"></div>
  </div>
</template>

<script>
import { TweenMax, Back, Expo } from 'gsap';

export default {
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      const that = this;
      setTimeout(() => {
        that.getAllLinks();
      }, 500);
    }
  },
  mounted() {
    this.setCursorPosition();
    this.getAllLinks();
  },
  methods: {
    setCursorPosition() {
      // ON MOUSE MOVE
      window.onmousemove = mouse => {
        document.querySelector('.cursor').style.top = `${mouse.clientY}px`;
        document.querySelector('.cursor').style.left = `${mouse.clientX}px`;
        TweenMax.to('.cursor-torus', 0.4, {
          top: `${mouse.clientY}px`,
          left: `${mouse.clientX}px`
        });
      };
      // ON CLICK
      window.onmousedown = () => {
        TweenMax.to('.cursor-torus', 0.5, {
          width: '30px',
          height: '30px',
          ease: Expo.easeOut
        });
        TweenMax.to('.cursor', 0.5, {
          width: '25px',
          height: '25px',
          opacity: 0.5,
          ease: Back.easeOut.config(2.5)
        });
      };
      // ON CLICK RELEASE
      window.onmouseup = () => {
        TweenMax.to('.cursor-torus', 0.5, {
          width: '50px',
          height: '50px',
          ease: Back.easeOut.config(5)
        });
        TweenMax.to('.cursor', 0.5, {
          width: '5px',
          height: '5px',
          opacity: 1,
          ease: Expo.easeOut
        });
      };
    },
    getAllLinks() {
      const listLinks = document.querySelectorAll('a');
      function mouseEnterLink() {
        TweenMax.to('.cursor-torus', 0.5, {
          width: '0px',
          height: '0px',
          ease: Expo.easeOut
        });
        TweenMax.to('.cursor', 0.5, {
          width: '25px',
          height: '25px',
          opacity: 0.5,
          ease: Back.easeOut.config(2.5)
        });
      }

      function mouseLeaveLink() {
        TweenMax.to('.cursor-torus', 0.5, {
          width: '50px',
          height: '50px',
          ease: Back.easeOut.config(5)
        });
        TweenMax.to('.cursor', 0.5, {
          width: '5px',
          height: '5px',
          opacity: 1,
          ease: Expo.easeOut
        });
      }

      listLinks.forEach(el => {
        console.log('el -> ', el);
        el.addEventListener('mouseenter', mouseEnterLink);
        el.addEventListener('mouseleave', mouseLeaveLink);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cursor-container {
  position: absolute;
  display: none;
  z-index: $beforefg;
  @include mq($from: desktop_plus) {
    display: block;
  }
  .cursor {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: $black;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .cursor-torus {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid $black;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
}
</style>

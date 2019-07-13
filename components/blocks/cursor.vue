<template>
  <div class="cursor-container">
    <div class="cursor"></div>
    <div class="cursor-torus">
      <cursor-torus></cursor-torus>
    </div>
  </div>
</template>

<script>
import { TweenMax, Back, Expo } from 'gsap';
import cursorTorus from '~/static/images/icons/cursor-torus.svg?inline';

export default {
  components: {
    cursorTorus
  },
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      const that = this;
      setTimeout(() => {
        that.getAllLinks();
      }, 500);
      if (to.name === 'experiments') {
        setTimeout(() => {
          that.getAllLinks();
        }, 1000);
      }
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
        if (!document.querySelector('.prev-next-active')) {
          TweenMax.to('.cursor-torus', 0.5, {
            width: '125px',
            height: '125px',
            ease: Expo.easeOut
          });
          TweenMax.to('.cursor', 0.5, {
            width: '25px',
            height: '25px',
            opacity: 0.5,
            ease: Back.easeOut.config(2.5)
          });
        }
      };
      // ON CLICK RELEASE
      window.onmouseup = () => {
        if (!document.querySelector('.prev-next-active')) {
          TweenMax.to('.cursor-torus', 0.5, {
            width: '100px',
            height: '100px',
            ease: Back.easeOut.config(5)
          });
          TweenMax.to('.cursor', 0.5, {
            width: '5px',
            height: '5px',
            opacity: 1,
            ease: Expo.easeOut
          });
        }
      };
    },
    getAllLinks() {
      const that = this;
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
          width: '100px',
          height: '100px',
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
    width: 100px;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    svg {
      font-weight: 900;
      font-family: $font-title;
      animation: rotateTextPath 5s infinite linear;

      @keyframes rotateTextPath {
        from {
          transform: rotate(-360deg);
        }
        to {
          transform: rotate(0);
        }
      }
    }
  }
}
</style>

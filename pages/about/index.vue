<template>
  <main class="about-container">
    <div class="brief-container">
      <div class="h1-wrapper">
        <h1>PIERRE MOUCHAN</h1>
      </div>

      <div class="desc-wrapper">
        <p class="description">
          <strong class="strong-red">Creative developer</strong>
          <br />
        </p>
      </div>
    </div>
    <div class="glad-container">
      <div class="glad-wrapper">
        <p>New portfolio coming soon 2020</p>
      </div>

      <div class="invit-scroll"></div>
    </div>
    <div class="myself-container">
      <div class="myself-description">
        <div class="myself-description__mask"></div>
        <div class="description">
          I’m a <strong class="strong-red">freelance developer</strong> based in France. As an Autodidact Developer with
          a Designer's Heart,
          <strong class="strong-red"
            >i'm aiming to work with artists, creative agencies, startups and individuals.</strong
          >
        </div>
        <address class="reseaux">
          <a href="https://github.com/PierreMouchan/" target="_blank" rel="noopener noreferrer"
            ><githubIcon></githubIcon
          ></a>
          <a href="https://www.instagram.com/pierremouchan/" target="_blank" rel="noopener noreferrer"
            ><instaIcon></instaIcon
          ></a>
          <a href="https://www.facebook.com/mouchanpierre" target="_blank" rel="noopener noreferrer"
            ><facebookIcon></facebookIcon
          ></a>
        </address>
      </div>
      <div class="myself-picture">
        <div class="myself-picture__mask"></div>
        <img src="~/static/images/about/pierre_mouchan.jpg" alt="Picture of Pierre Mouchan (coolest man ever LOL)" />
      </div>
    </div>
    <div class="get-in-touch">
      <a
        class="get-in-touch__link"
        href="mailto:pierre.mouchan@gmail.com?subject=Let's work together !"
        target="_blank"
        rel="noopener noreferrer"
        >GET IN TOUCH</a
      >
      <p>Let’s discuss around a ☕ and a 🥖 !</p>
    </div>
  </main>
</template>

<script>
import Bound from 'bounds.js';
import { TweenMax, Expo, TimelineMax } from 'gsap';
import { mapMutations } from 'vuex';
import githubIcon from '~/static/images/icons/github.svg?inline';
import instaIcon from '~/static/images/icons/instagram.svg?inline';
import facebookIcon from '~/static/images/icons/facebook.svg?inline';
import resumeIcon from '~/static/images/icons/resume.svg?inline';
import { toAbout, fromAbout } from '~/assets/js/transitions/fromToAbout';

export default {
  components: {
    githubIcon,
    instaIcon,
    facebookIcon,
    resumeIcon,
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Portfolio - Who is Pierre Mouchan ? (a creative developer 🤙)',
        },
      ],
    };
  },
  mounted() {
    this.revealEl();
    toAbout();
  },
  beforeRouteLeave(to, from, next) {
    fromAbout(next);
  },
  methods: {
    ...mapMutations({
      isContactSectionVisible: 'updateWebGL/isContactSectionVisible',
    }),
    revealEl() {
      const boundary = Bound({
        root: this.window,
        threshold: 0.1,
      });
      const myselfDesc = document.querySelector('.myself-description__mask');
      const myselfPic = document.querySelector('.myself-picture__mask');
      const getInTouch = document.querySelector('.get-in-touch');
      const whenMyselfDescEnters = () => {
        TweenMax.to(myselfDesc, 0.5, {
          transformOrigin: 'right bottom',
          scaleX: 0,
          ease: Expo.easeInOut,
        });
        boundary.unWatch(myselfDesc);
      };
      const whenMyselfPicEnters = () => {
        const revealPic = new TimelineMax();
        revealPic
          .addLabel('f1')
          .to(
            myselfPic,
            0.5,
            {
              transformOrigin: 'right bottom',
              scaleX: 0,
              ease: Expo.easeInOut,
            },
            'f1'
          )
          .fromTo(
            '.myself-picture img',
            0.5,
            { scale: 1.3, rotation: 2, transformOrigin: 'center center' },
            { scale: 1.1, rotation: 0 },
            'f1+=0.25'
          );
        boundary.unWatch(myselfPic);
      };
      const whenGetInTouchEnters = () => {
        this.isContactSectionVisible(true);
        const revealGetInTouch = new TimelineMax();
        revealGetInTouch.fromTo(
          '.get-in-touch__link',
          2,
          {
            y: '120%',
            rotation: 5,
            transformOrigin: 'bottom left',
          },
          { y: '0%', rotation: 0, ease: Expo.easeOut }
        );
      };
      const whenGetInTouchLeaves = () => {
        this.isContactSectionVisible(false);
      };
      boundary.watch(myselfDesc, whenMyselfDescEnters);
      boundary.watch(myselfPic, whenMyselfPicEnters);
      const boundary2 = Bound({
        root: this.window,
        threshold: 0,
      });
      boundary2.watch(getInTouch, whenGetInTouchEnters, whenGetInTouchLeaves);
    },
  },
};
</script>

<style lang="scss" scoped>
.about-container {
  position: relative;
  padding-top: 25vh;
  z-index: $beforefg - 1;
  margin: 0 auto;
  .brief-container {
    text-align: center;
    .h1-wrapper {
      margin: 0 auto 60px auto;
      overflow: hidden;
      h1 {
        font-family: $font-title;
        line-height: normal;
        font-size: 50px;
        white-space: pre-wrap;
        font-weight: 900;

        @include mq($from: tablet) {
          font-size: 70px;
          white-space: nowrap;
        }
        @include mq($from: desktop_plus) {
          font-size: 100px;
        }
        @include mq($from: wide) {
          font-size: 120px;
        }
      }
    }
    .desc-wrapper {
      overflow: hidden;

      .description {
        font-size: 35px;
        line-height: 40px;
        @include mq($from: tablet) {
          font-size: 40px;
          line-height: 40px;
        }
        @include mq($from: desktop_plus) {
          font-size: 50px;
        }

        span {
          font-size: 18px;
        }
      }
    }
  }
  .glad-container {
    margin: 15vh auto 0 auto;
    text-align: center;
    .glad-wrapper {
      overflow: hidden;
      p {
        font-family: $font-title;
        font-weight: 900;
        font-size: 25px;
        line-height: normal;
        white-space: nowrap;
        @include mq($from: tablet) {
          font-size: 35px;
        }
        @include mq($from: wide) {
          font-size: 50px;
        }
      }
    }
    .invit-scroll {
      background-color: $black;
      height: 10vh;
      width: 1px;
      margin: 5vh auto 0 auto;
      @include mq($from: tablet) {
      }
    }
  }
  .myself-container {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    padding: 0 5vh;
    @include mq($from: desktop) {
      flex-direction: row;
      padding: 0 10vh;
      align-items: center;
    }
    .myself-description {
      position: relative;
      font-size: 25px;
      line-height: 30px;
      order: 2;
      @include mq($from: desktop) {
        order: 1;
        max-width: 50%;
        margin-right: 5vw;
      }
      &__mask {
        position: absolute;
        top: 0;
        background-color: $white;
        width: 100%;
        height: 100%;
        z-index: $up;
      }
      .link-pixies {
        position: relative;
        &:before {
          content: '';
          background-color: $red;
          opacity: 0.5;
          width: 100%;
          height: 50%;
          position: absolute;
          left: 0;
          top: 25%;
          transform: translateY(50%);
          z-index: $down;
          transition: 0.5s;
        }
        &:hover {
          &:before {
            left: 10%;
          }
        }
      }
    }
    .myself-picture {
      overflow: hidden;
      position: relative;
      order: 1;
      margin-bottom: 5vh;
      @include mq($from: desktop) {
        order: 2;
        max-width: 50%;
        max-height: 750px;
        margin-bottom: 0;
      }
      &__mask {
        position: absolute;
        top: 0;
        z-index: $up;
        background-color: $black;
        width: 100%;
        height: 100%;
      }
    }
  }
  .reseaux {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5vh auto;
    a {
      position: relative;
      width: 48px;
      max-height: 48px;
      svg {
        max-height: 48px;
      }
    }
  }
  .get-in-touch {
    overflow: hidden;
    margin: 15vh auto;
    text-align: center;
    p {
      font-size: 18px;
    }
    &__link {
      position: relative;
      -webkit-text-stroke: 2px $black;
      color: $transparent;
      font-family: $font-title;
      font-weight: 900;
      font-size: 35px;
      line-height: normal;
      transition: color 1s;

      &:hover {
        color: $black;
      }
      @include mq($from: tablet) {
        font-size: 75px;
      }
      @include mq($from: desktop_plus) {
        font-size: 100px;
      }
    }
    @include mq($from: tablet) {
      margin: 25vh auto;
    }
    @include mq($from: desktop_plus) {
      margin: 35vh auto;
    }
  }
}
</style>

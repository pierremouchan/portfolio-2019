<template>
  <div class="about-container">
    <div class="brief-container">
      <div class="h1-wrapper">
        <h1>PIERRE MOUCHAN</h1>
      </div>

      <div class="desc-wrapper">
        <p class="description">
          <strong class="strong-red">Creative developer</strong>, and Apple
          lover
          <br />
          <span>(The fruit of course 😌)</span>
        </p>
      </div>
    </div>
    <div class="glad-container">
      <div class="glad-wrapper">
        <p>Glad to meet you 🤙</p>
      </div>

      <div class="invit-scroll"></div>
    </div>
    <div class="myself-container">
      <div class="myself-description">
        <div class="description">
          I’m still studying in France 🥖 and i’m currently working as a
          front-end developer at
          <a
            class="link-pixies"
            target="_blank"
            href="https://www.pixies-agency.fr/"
            >Pixies</a
          >
          ( Go check them out ! ).
          <br /><br />
          I’m the guy who always try to
          <strong class="strong-red">be original and creative</strong> in my
          projects : trying new things, new librairies, new tech and dev
          environments… <br /><br />
          To summary, i’m a developer with
          <strong class="strong-red"
            >taste for design, animation and 3D.</strong
          >
          I would like to offer my expertise to creative teams and agencies, so
          don’t hesitate to contact me ! .. I’m looking forward to work
          <strong class="strong-red">with you !</strong>
          👌
        </div>
        <div class="reseaux">
          <a href="https://github.com/PierreMouchan/" target="_blank"
            ><githubIcon></githubIcon
          ></a>
          <a href="https://www.instagram.com/pierre_mouchan/" target="_blank"
            ><instaIcon></instaIcon
          ></a>
          <a
            href="https://www.facebook.com/profile.php?id=100009602180064"
            target="_blank"
            ><facebookIcon></facebookIcon
          ></a>
          <a href="" target="_blank"><resumeIcon></resumeIcon></a>
        </div>
      </div>
      <div class="myself-picture">
        <img
          src="~/static/images/about/pierre_mouchan.jpg"
          alt="Picture of Pierre Mouchan (coolest man ever LOL)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import githubIcon from '~/static/images/icons/github.svg?inline';
import instaIcon from '~/static/images/icons/instagram.svg?inline';
import facebookIcon from '~/static/images/icons/facebook.svg?inline';
import resumeIcon from '~/static/images/icons/resume.svg?inline';
// eslint-disable-next-line no-unused-vars
import { toAbout } from '~/assets/js/transitions/fromToAbout';

export default {
  components: {
    githubIcon,
    instaIcon,
    facebookIcon,
    resumeIcon
  },
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
  },
  mounted() {
    toAbout();
  }
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
      font-size: 25px;
      line-height: 30px;
      order: 2;
      @include mq($from: desktop) {
        order: 1;
        max-width: 50%;
        margin-right: 5vw;
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
      order: 1;
      margin-bottom: 5vh;
      @include mq($from: desktop) {
        order: 2;
        max-width: 50%;
        margin-bottom: 0;
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
}
</style>

<template>
  <div class="webGL-wrapper">
    <div class="webGL-container"></div>
    <nuxt-link id="sun" :to="'/projects/' + projects[oldProjectNumber].id">
      <Sun></Sun>
    </nuxt-link>
  </div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  Color,
  WebGLRenderer
} from 'three';
import { TweenMax, Expo } from 'gsap';
import Sun from '~/static/images/icons/sun.svg?inline';
// import { Interaction } from 'three.interaction';
import Blob from '~/assets/js/webGL/blob.class';

// eslint-disable-next-line no-unused-vars
let mainBlob, activeBlob;
const projectsBlob = [];
let iteration = 0;

export default {
  components: {
    Sun
  },
  data() {
    return {
      projects: this.$store.state.projects.list,
      textureList: [],
      oldProjectNumber: 0
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.name === 'about') {
        TweenMax.to(mainBlob.mesh.position, 2, { z: 0, ease: Expo.easeOut });
      } else {
        TweenMax.to(mainBlob.mesh.position, 2, { z: -500, ease: Expo.easeOut });
      }
    }
  },
  created() {
    this.projects.forEach(project => {
      this.textureList.push(project.mainImg);
    });
  },

  mounted() {
    this.setupWebGL();
    this.checkHoverSun();
    this.$store.watch(
      () => this.$store.state.updateWebGL.mainBlobContact,
      status => {
        switch (status) {
          case true:
            TweenMax.to(mainBlob.mesh.material.color, 1, {
              r: new Color(0xf25d61).r,
              g: new Color(0xf25d61).g,
              b: new Color(0xf25d61).b
            });
            TweenMax.to(mainBlob.mesh.position, 1, { y: -50, z: 100 });
            break;
          case false:
            TweenMax.to(mainBlob.mesh.material.color, 1, {
              r: new Color(0xf9f1ec).r,
              g: new Color(0xf9f1ec).g,
              b: new Color(0xf9f1ec).b
            });
            TweenMax.to(mainBlob.mesh.position, 1, { y: 0, z: 0 });
            break;
        }
      }
    );

    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      isalreadyLoaded => {
        switch (isalreadyLoaded) {
          case true:
            if (this.$route.name === 'about') {
              mainBlob.mesh.position.z = 0;
            }
            break;
        }
      }
    );
    this.$store.watch(
      () => this.$store.state.currentProject.number,
      newProjectNumber => {
        if (
          this.oldProjectNumber === 0 &&
          newProjectNumber === this.projects.length - 1
        ) {
          for (let i = 0; i < projectsBlob.length; i++) {
            TweenMax.to(projectsBlob[i].mesh.position, 1, {
              x: '-=1500',
              ease: Expo.easeOut
            });
          }
        } else if (
          this.oldProjectNumber === this.projects.length - 1 &&
          newProjectNumber === 0
        ) {
          for (let i = 0; i < projectsBlob.length; i++) {
            TweenMax.to(projectsBlob[i].mesh.position, 1, {
              x: '+=1500',
              ease: Expo.easeOut
            });
          }
        } else if (newProjectNumber === this.oldProjectNumber + 1) {
          for (let i = 0; i < projectsBlob.length; i++) {
            TweenMax.to(projectsBlob[i].mesh.position, 1, {
              x: '-=500',
              ease: Expo.easeOut
            });
          }
        } else {
          for (let i = 0; i < projectsBlob.length; i++) {
            TweenMax.to(projectsBlob[i].mesh.position, 1, {
              x: '+=500',
              ease: Expo.easeOut
            });
          }
        }
        // switch (newProjectNumber > this.oldProjectNumber) {
        //   case true:
        //     for (let i = 0; i < projectsBlob.length; i++) {
        //       TweenMax.to(projectsBlob[i].mesh.position, 1, {
        //         x: '-=500',
        //         ease: Expo.easeOut
        //       });
        //     }
        //
        //     this.setActiveBlob(newProjectNumber);
        //     this.oldProjectNumber = newProjectNumber;
        //     break;
        //   case false:
        //     for (let i = 0; i < projectsBlob.length; i++) {
        //       TweenMax.to(projectsBlob[i].mesh.position, 1, {
        //         x: '+=500',
        //         ease: Expo.easeOut
        //       });
        //     }
        this.setActiveBlob(newProjectNumber);
        this.oldProjectNumber = newProjectNumber;
      }
    );
  },
  methods: {
    checkHoverSun() {
      document.querySelector('#sun').addEventListener('mouseenter', () => {
        console.log('enter');
        iteration = 0;
        TweenMax.to(activeBlob, 0.5, { perlinNoise: 0 });
      });
      document.querySelector('#sun').addEventListener('mouseleave', () => {
        console.log('enter');
        iteration = 0;
        TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });
      });
    },
    setActiveBlob(number) {
      activeBlob = projectsBlob[number];
      //   activeBlob.mesh.on('mouseover', event => {
      //     console.log('on -> ');
      //     TweenMax.to(activeBlob, 0.5, { perlinNoise: 0 });
      //   });
      //   activeBlob.mesh.on('mouseout', event => {
      //     console.log('leave -> ');
      //     iteration = 0;
      //     TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });
      //   });
      //
      //   activeBlob.mesh.on('click', event => {
      //     console.log('click -> ');
      //     this.$router.push(
      //       `/projects/${
      //         // eslint-disable-next-line standard/computed-property-even-spacing
      //         this.$store.state.projects.list[
      //           this.$store.state.currentProject.number
      //         ].id
      //       }`
      //     );
      //   });
    },
    setupWebGL() {
      const container = document.querySelector('.webGL-container');
      const scene = new Scene();
      const aspect = container.clientWidth / container.clientHeight;

      const camera = new PerspectiveCamera(75, aspect, 0.1, 500);

      // const hemisphereLight = new HemisphereLight(0xffffff, 0xf9f7f0, 0.6);
      // const directionalLight = new DirectionalLight(0xf9f9f9, 0.5);
      // const directionalLight2 = directionalLight.clone();
      // directionalLight.position.set(-200, 300, 400);
      // directionalLight2.position.set(200, 300, 400);
      // scene.add(hemisphereLight, directionalLight, directionalLight2);

      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(100, 200, 150);
      scene.add(directionalLight);
      // eslint-disable-next-line no-unused-vars
      mainBlob = new Blob();
      scene.add(mainBlob.mesh);
      mainBlob.mesh.position.set(0, 0, -500);

      // eslint-disable-next-line no-unused-vars

      const that = this;
      for (let i = 0; i < this.textureList.length; i++) {
        const projectBlob = new Blob(that.textureList[i]);
        projectsBlob.push(projectBlob);
        projectBlob.mesh.position.set(500 * i, 0, 0);
        scene.add(projectBlob.mesh);
      }
      // redefining variable that need to be a real "variable"
      // CAMERA POSITION
      camera.position.set(0, 0, 200);

      const renderer = new WebGLRenderer({
        alpha: true
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      function update() {
        mainBlob.updateVertices(iteration);
        if (projectsBlob) {
          for (let i = 0; i < projectsBlob.length; i++) {
            projectsBlob[i].updateVertices(iteration);
            projectsBlob[i].mesh.rotation.x += 0.005;
            projectsBlob[i].mesh.rotation.y += 0.005;
          }
        }
        iteration += 30;
      }

      function render() {
        renderer.render(scene, camera);
      }

      renderer.setAnimationLoop(function() {
        update();
        render();

        // Extension threejs inspector CHROME
        window.scene = scene;
      });
      function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        if (camera.aspect < 1.2 && camera.aspect > 0.8) {
          mainBlob.mesh.scale.set(camera.aspect, camera.aspect, camera.aspect);
          for (let i = 0; i < projectsBlob.length; i++) {
            projectsBlob[i].mesh.scale.set(
              camera.aspect / 1.25,
              camera.aspect / 1.25,
              camera.aspect / 1.25
            );
          }
        }

        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
      onWindowResize();

      window.addEventListener('resize', onWindowResize);

      // DOMEVENTS
      // eslint-disable-next-line no-unused-vars
      // const interaction = new Interaction(renderer, scene, camera);
      activeBlob = projectsBlob[0];
      // activeBlob.mesh.on('mouseover', event => {
      //   console.log('on -> ');
      //   TweenMax.to(activeBlob, 0.5, { perlinNoise: 0 });
      // });
      // activeBlob.mesh.on('mouseout', event => {
      //   console.log('leave -> ');
      //   iteration = 0;
      //   TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });
      // });
      //
      // activeBlob.mesh.on('click', event => {
      //   console.log('click -> ');
      //   this.$router.push(
      //     `/projects/${
      //       // eslint-disable-next-line standard/computed-property-even-spacing
      //       this.$store.state.projects.list[
      //         this.$store.state.currentProject.number
      //       ].id
      //     }`
      //   );
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.webGL-wrapper {
  .webGL-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $up - 1;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
  #sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 750px;
    @include mq($from: tablet) {
      width: 80%;
    }
    @include mq($from: desktop) {
      width: 60%;
    }
  }
}
</style>

<template>
  <div class="webGL-container"></div>
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
import { Interaction } from 'three.interaction';
import Blob from '~/assets/js/webGL/blob.class';

let mainBlob;

export default {
  data() {
    return {
      projects: this.$store.state.projects.list,
      textureList: []
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
  },
  methods: {
    setupWebGL() {
      const othersBlob = [];
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

      setTimeout(() => {}, 2500);

      // eslint-disable-next-line no-unused-vars

      // const that = this;
      // for (let i = 0; i < this.textureList.length; i++) {
      //   const otherBlob = new Blob(that.textureList[i]);
      //   othersBlob.push(otherBlob);
      //   scene.add(otherBlob.mesh);
      // }
      // redefining variable that need to be a real "variable"
      // CAMERA POSITION
      camera.position.set(0, 0, 200);

      const renderer = new WebGLRenderer({
        alpha: true
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // DOMEVENTS
      // eslint-disable-next-line no-unused-vars
      const interaction = new Interaction(renderer, scene, camera);

      mainBlob.mesh.on('mouseover', event => {
        console.log('on -> ');
        TweenMax.to(mainBlob, 0.5, { perlinNoise: 0 });
      });
      mainBlob.mesh.on('mouseout', event => {
        console.log('leave -> ');
        iteration = 0;
        TweenMax.to(mainBlob, 0.5, { perlinNoise: 0.006 });
      });

      mainBlob.mesh.on('click', event => {
        console.log('click -> ');
        const targetColor = new Color(0xafe2f3);
        TweenMax.to(mainBlob.mesh.material.color, 1, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b
        });
      });

      let iteration = 0;
      function update() {
        mainBlob.updateVertices(iteration);
        if (othersBlob) {
          for (let i = 0; i < othersBlob.length; i++) {
            othersBlob[i].updateVertices(iteration * (i + 1));
          }
        }
        iteration += 10;
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
        if (camera.aspect < 1.2) {
          mainBlob.mesh.scale.set(camera.aspect, camera.aspect, camera.aspect);
        }

        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
      onWindowResize();

      window.addEventListener('resize', onWindowResize);
    }
  }
};
</script>

<style lang="scss" scoped>
.webGL-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $up;
  width: 100vw;
  height: 100vh;
}
</style>

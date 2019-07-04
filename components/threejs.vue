<template>
  <div class="webGL-container"></div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  HemisphereLight,
  Color,
  WebGLRenderer
} from 'three';
import { TweenMax } from 'gsap';
import { Interaction } from 'three.interaction';
import Blob from '~/assets/js/webGL/blob.class';
export default {
  data() {
    return {
      webGL: {
        container: undefined,
        scene: undefined,
        camera: undefined,
        renderer: undefined,
        options: {
          fov: 75,
          near: 0.1,
          far: 1000,
          aspect: undefined
        },
        lights: [],
        mainBlob: {},
        othersBlob: []
      }
    };
  },
  mounted() {
    this.setupWebGL();
    this.setupLightWebGL();
    this.generateBlobWebGL();
    this.runWebGL();

    this.$store.watch(
      () => this.$store.getters['loader/alreadyLoaded'],
      isalreadyLoaded => {
        switch (isalreadyLoaded) {
          case true:
            break;
        }
      }
    );
  },
  methods: {
    setupWebGL() {
      this.webGL.container = document.querySelector('.webGL-container');
      this.webGL.scene = new Scene();
      this.webGL.options.aspect =
        this.webGL.container.clientWidth / this.webGL.container.clientHeight;

      const camera = new PerspectiveCamera(
        this.webGL.options.fov,
        this.webGL.options.aspect,
        this.webGL.options.near,
        this.webGL.options.far
      );

      this.webGL.camera = camera;
    },
    setupLightWebGL() {
      const hemisphereLight = new HemisphereLight(0xffffff, 0xf9f7f0, 0.6);
      const directionalLight = new DirectionalLight(0xf9f9f9, 0.5);
      const directionalLight2 = directionalLight.clone();
      directionalLight.position.set(-200, 300, 400);
      directionalLight2.position.set(200, 300, 400);
      this.webGL.lights.push(
        hemisphereLight,
        directionalLight,
        directionalLight2
      );
      this.webGL.scene.add(...this.webGL.lights);
    },
    generateBlobWebGL() {
      const that = this;
      const mainBlob = new Blob();
      this.webGL.mainBlob = mainBlob;
      this.webGL.scene.add(mainBlob.mesh);

      const imageTexture = [
        require('~/static/images/projects/portfolios/portfolios-main.jpg'),
        require('~/static/images/projects/fsif/fsif-main.jpg'),
        require('~/static/images/projects/socialforgood/social-main.jpg'),
        require('~/static/images/projects/design3d/design3d-main.jpg')
      ];
      for (let i = 0; i < 4; i++) {
        const otherBlob = new Blob(imageTexture[i]);
        that.webGL.othersBlob.push(otherBlob);
        that.webGL.scene.add(otherBlob.mesh);
      }
    },
    runWebGL() {
      const that = this;
      // redefining variable that need to be a real "variable"
      const scene = this.webGL.scene;
      const camera = this.webGL.camera;
      const container = this.webGL.container;
      // CAMERA POSITION
      this.webGL.camera.position.set(0, 0, 200);

      const renderer = new WebGLRenderer({
        alpha: true
      });
      renderer.setSize(
        this.webGL.container.clientWidth,
        this.webGL.container.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      this.webGL.renderer = renderer;
      this.webGL.container.appendChild(renderer.domElement);

      // DOMEVENTS
      // eslint-disable-next-line no-unused-vars
      const interaction = new Interaction(renderer, scene, camera);
      this.webGL.mainBlob.mesh.on('mouseover', event => {
        console.log('on -> ');
        TweenMax.to(this.webGL.mainBlob, 0.5, { perlinNoise: 0 });
      });
      this.webGL.mainBlob.mesh.on('mouseout', event => {
        console.log('leave -> ');
        iteration = 0;
        TweenMax.to(this.webGL.mainBlob, 0.5, { perlinNoise: 0.006 });
      });
      this.webGL.mainBlob.mesh.on('click', event => {
        console.log('click -> ');
        const targetColor = new Color(0xafe2f3);
        TweenMax.to(this.webGL.mainBlob.mesh.material.color, 1, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b
        });
      });

      let iteration = 0;
      function update() {
        that.webGL.mainBlob.updateVertices(iteration);
        for (let i = 0; i < 4; i++) {
          that.webGL.othersBlob[i].updateVertices(iteration * (i + 1));
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
      const mainBlob = this.webGL.mainBlob.mesh;
      function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        if (camera.aspect < 1.2) {
          mainBlob.scale.set(camera.aspect, camera.aspect, camera.aspect);
        }

        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }

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

<template>
  <div class="webGL-container"></div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  HemisphereLight,
  IcosahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  WebGLRenderer
} from 'three';
import { TweenMax } from 'gsap';
import { Interaction } from 'three.interaction';
import { noise } from '~/plugins/external/perlin';
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
          far: 10000,
          aspect: undefined
        },
        lights: [],
        perlinNoiseValue: 0.006,
        mainBlob: {
          geometry: undefined,
          material: undefined,
          texture: undefined,
          mesh: undefined
        },
        othersBlob: {},
        blobScale: 0.7
      }
    };
  },
  mounted() {
    this.setupWebGL();
    this.setupLightWebGL();
    this.generalShapeWebGL();
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
    generalShapeWebGL() {
      // MAIN BLOB
      const geometryBlob = new IcosahedronGeometry(100, 3);
      this.webGL.mainBlob.geometry = geometryBlob;
      for (let i = 0; i < geometryBlob.vertices.length; i++) {
        const vector = this.webGL.mainBlob.geometry.vertices[i];
        vector._o = vector.clone();
      }
      const texture = new TextureLoader().load(
        '/images/projects/portfolios/portfolios-main.jpg'
      );
      texture.anisotropy = 4;
      this.webGL.mainBlob.texture = texture;

      const materialBlob = new MeshStandardMaterial({
        // color: 0xC01A1A,
        // emissive: 0xFF2323,
        // emissiveMap: texture,
        map: texture,
        color: 0xf9f5f2,
        //  emissive: 0xF9F9F9,
        // emissiveIntensity: 0.05,
        metalness: 0.2,
        roughness: 0.1
      });
      this.webGL.mainBlob.material = materialBlob;

      const mainBlob = new Mesh(
        this.webGL.mainBlob.geometry,
        this.webGL.mainBlob.material
      );
      this.webGL.mainBlob.mesh = mainBlob;
      this.webGL.mainBlob.mesh.scale.set(
        this.webGL.blobScale,
        this.webGL.blobScale,
        this.webGL.blobScale
      );

      this.webGL.scene.add(this.webGL.mainBlob.mesh);
    },
    runWebGL() {
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
        TweenMax.to(this.webGL, 0.5, { perlinNoiseValue: 0 });
      });
      this.webGL.mainBlob.mesh.on('mouseout', event => {
        console.log('leave -> ');
        iteration = 0;
        TweenMax.to(this.webGL, 0.5, { perlinNoiseValue: 0.006 });
      });

      // eslint-disable-next-line no-unused-vars
      const geometryMainBlob = this.webGL.mainBlob.geometry;
      const that = this;
      function updateVertices(a) {
        if (that.webGL.perlinNoiseValue !== 0) {
          for (let i = 0; i < geometryMainBlob.vertices.length; i++) {
            const vector = geometryMainBlob.vertices[i];
            vector.copy(vector._o);
            // eslint-disable-next-line no-undef
            const perlin = noise.simplex3(
              vector.x * that.webGL.perlinNoiseValue +
                a * (that.webGL.perlinNoiseValue / 30),
              vector.y * that.webGL.perlinNoiseValue +
                a * (that.webGL.perlinNoiseValue / 20),
              vector.z * that.webGL.perlinNoiseValue
            );
            const ratio = perlin * 0.4 * 0.5 + 0.8;
            vector.multiplyScalar(ratio);
          }
        }

        geometryMainBlob.verticesNeedUpdate = true;
      }

      function update() {}

      let iteration = 0;
      function render() {
        renderer.render(scene, camera);
        updateVertices(iteration);
        iteration = iteration + 10;
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

        mainBlob.scale.set(camera.aspect, camera.aspect, camera.aspect);

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

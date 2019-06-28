<template>
  <div class="webgl-handler">
    <div id="particles-js"></div>

    <div class="webGL-container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { TweenMax, Expo } from 'gsap';
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
          far: 5000,
          aspect: undefined,
          isocasPositionsDesktop: [
            { x: -400, y: 200, z: -500 },
            { x: 500, y: 100, z: -500 },
            { x: -600, y: -250, z: -500 }
          ],
          isocasPositionsMobile: [
            { x: -200, y: 200, z: -500 },
            { x: 250, y: 100, z: -500 },
            { x: -150, y: -250, z: -500 }
          ]
        },
        lights: {
          directionalLight: undefined
        },
        meshes: {
          isocahedron: {
            geometry: undefined,
            material: undefined,
            mesh: []
          }
        }
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
            console.log('loading threejs');
            for (
              let i = 0;
              i < this.webGL.meshes.isocahedron.mesh.length;
              i++
            ) {
              TweenMax.fromTo(
                this.webGL.meshes.isocahedron.mesh[i].position,
                3,
                { z: -1500 },
                { z: -500, ease: Expo.easeOut }
              );
            }
            break;
        }
      }
    );
  },
  methods: {
    setupWebGL() {
      this.webGL.container = document.querySelector('.webGL-container');
      this.webGL.scene = new THREE.Scene();
      this.webGL.scene.fog = new THREE.Fog(
        this.$nuxt.$settings.colorWhite,
        500,
        1000
      );
      this.webGL.options.aspect =
        this.webGL.container.clientWidth / this.webGL.container.clientHeight;

      const camera = new THREE.PerspectiveCamera(
        this.webGL.options.fov,
        this.webGL.options.aspect,
        this.webGL.options.near,
        this.webGL.options.far
      );

      this.webGL.camera = camera;
    },
    setupLightWebGL() {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(100, 500, 100);
      this.webGL.lights.directionalLight = directionalLight;
      this.webGL.scene.add(this.webGL.lights.directionalLight);
    },
    generalShapeWebGL() {
      const isocaGeometry = new THREE.IcosahedronBufferGeometry(200, 0);
      const isocaMaterial = new THREE.MeshToonMaterial({
        color: 0xfaf1e6,
        specular: 0xfaead6,
        shininess: 0.3,
        reflectivity: 0.3,
        wireframe: false,
        opacity: 0.2,
        transparent: true
      });

      this.webGL.meshes.isocahedron.geometry = isocaGeometry;
      this.webGL.meshes.isocahedron.material = isocaMaterial;

      for (let i = 0; i < 3; i++) {
        const isocaMesh = new THREE.Mesh(isocaGeometry, isocaMaterial);
        if (window.innerWidth > 728) {
          isocaMesh.position.set(
            this.webGL.options.isocasPositionsDesktop[i].x,
            this.webGL.options.isocasPositionsDesktop[i].y,
            this.webGL.options.isocasPositionsDesktop[i].z
          );
        } else {
          isocaMesh.position.set(
            this.webGL.options.isocasPositionsMobile[i].x,
            this.webGL.options.isocasPositionsMobile[i].y,
            this.webGL.options.isocasPositionsMobile[i].z
          );
        }

        this.webGL.meshes.isocahedron.mesh.push(isocaMesh);
        this.webGL.scene.add(this.webGL.meshes.isocahedron.mesh[i]);
      }
    },
    runWebGL() {
      // redefining variable that need to be a real "variable"
      const scene = this.webGL.scene;
      const camera = this.webGL.camera;
      const container = this.webGL.container;
      // CAMERA POSITION
      this.webGL.camera.position.set(0, 0, 200);

      const renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      renderer.setSize(
        this.webGL.container.clientWidth,
        this.webGL.container.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      this.webGL.renderer = renderer;
      this.webGL.container.appendChild(renderer.domElement);
      const isocaList = this.webGL.meshes.isocahedron.mesh;
      console.log(this.webGL.meshes.isocahedron.mesh);

      function update() {
        for (let i = 0; i < isocaList.length; i++) {
          isocaList[i].rotation.y += 0.005;
        }
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

      // On resize
      const isocahedronList = this.webGL.meshes.isocahedron.mesh;
      const optionsWebGL = this.webGL.options;

      function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);

        for (let i = 0; i < isocaList.length; i++) {
          if (window.innerWidth > 728) {
            isocaList[i].position.set(
              optionsWebGL.isocasPositionsDesktop[i].x,
              optionsWebGL.isocasPositionsDesktop[i].y,
              optionsWebGL.isocasPositionsDesktop[i].z
            );
          } else {
            isocahedronList[i].position.set(
              optionsWebGL.isocasPositionsMobile[i].x,
              optionsWebGL.isocasPositionsMobile[i].y,
              optionsWebGL.isocasPositionsMobile[i].z
            );
          }
        }
      }

      window.addEventListener('resize', onWindowResize);
    }
  }
};
</script>

<style lang="scss" scoped>
.webgl-handler {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $background;
  .webGL-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>

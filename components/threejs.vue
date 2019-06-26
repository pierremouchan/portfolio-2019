<template>
  <div class="webgl-handler">
    <div class="webGL-container"></div>
    <cursor-cmp></cursor-cmp>
  </div>
</template>

<script>
import { watchViewport } from 'tornis';
import { TweenMax, Back } from 'gsap';
import * as THREE from 'three';
import Idle from '../assets/js/idle.class';
import cursorCmp from './blocks/cursor';
export default {
  components: {
    cursorCmp
  },
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
            { x: -600, y: -250, z: -600 }
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
          torus: {
            geometry: undefined,
            material: undefined,
            mesh: undefined
          },
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
    this.updateTorusVelocityWebGL();
    this.checkMobileWebGL();
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
      const torusGeometry = new THREE.TorusBufferGeometry(3, 0.1, 4, 32);
      const torusMaterial = new THREE.MeshBasicMaterial({
        color: this.$nuxt.$settings.colorRed
      });
      const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);

      // TORUS USED AS THE CURSOR
      this.webGL.meshes.torus = {
        geometry: torusGeometry,
        material: torusMaterial,
        mesh: torusMesh
      };

      this.webGL.meshes.torus.mesh.scale.set(2, 2, 2);
      this.webGL.scene.add(this.webGL.meshes.torus.mesh);

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
    updateTorusVelocityWebGL() {
      const updateMouseValues = ({ mouse }) => {
        let mouseVelocityX, mouseVelocityY;
        if (mouse.changed) {
          mouse.velocity.x < 5
            ? (mouseVelocityX = mouse.velocity.x / 10)
            : (mouseVelocityX = 0.5);
          mouse.velocity.y < 5
            ? (mouseVelocityY = mouse.velocity.y / 10)
            : (mouseVelocityY = 0.5);
          this.webGL.meshes.torus.mesh.rotation.x = mouseVelocityY;
          this.webGL.meshes.torus.mesh.rotation.y = mouseVelocityX;
          TweenMax.to(this.webGL.meshes.torus.mesh.rotation, 0.05, {
            x: mouseVelocityY,
            y: mouseVelocityX
          });
        }
      };
      watchViewport(updateMouseValues);

      let vec;
      let distance;
      let pos = { x: 0, y: 0 };
      window.onmousemove = e => {
        vec = new THREE.Vector3(); // create once and reuse
        pos = new THREE.Vector3(); // create once and reuse
        // console.log(document.querySelector(".cursor"));
        document.querySelector('.cursor').style.left = `${e.clientX}px`;
        document.querySelector('.cursor').style.top = `${e.clientY}px`;
        // document.querySelector('.cursor-outer').style.left = `${e.clientX}px`;
        // document.querySelector('.cursor-outer').style.top = `${e.clientY}px`;
        vec.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
          0
        );

        vec.unproject(this.webGL.camera);

        vec.sub(this.webGL.camera.position).normalize();

        distance = -this.webGL.camera.position.z / vec.z;

        pos.copy(this.webGL.camera.position).add(vec.multiplyScalar(distance));

        TweenMax.to(this.webGL.meshes.torus.mesh.position, 0.2, {
          x: pos.x,
          y: pos.y
        });
      };
    },
    runWebGL() {
      // redefining variable that need to be a real "variable"
      const scene = this.webGL.scene;
      const camera = this.webGL.camera;
      const container = this.webGL.container;
      // CAMERA POSITION
      this.webGL.camera.position.set(0, 0, 200);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(
        this.webGL.container.clientWidth,
        this.webGL.container.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      this.webGL.renderer = renderer;
      this.webGL.container.appendChild(renderer.domElement);

      window.addEventListener('click', e => {
        TweenMax.fromTo(
          this.webGL.meshes.torus.mesh.scale,
          0.5,
          { x: 0.5, y: 0.5, z: 0.5 },
          { x: 2, y: 2, z: 2, ease: Back.easeOut.config(5) }
        );
      });
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
      const that = this;
      function onWindowResize() {
        that.checkMobileWebGL();
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
    },
    checkMobileWebGL() {
      // IF USER IS NOT CLICKLING ON THE PAGE
      const idleCallback = () => {
        TweenMax.to(this.webGL.meshes.torus.mesh.rotation, 1, {
          y: 8
        });
        TweenMax.to(this.webGL.meshes.torus.mesh.scale, 1, {
          x: 0.05,
          y: 0.05,
          z: 0.05
        });
        TweenMax.to('.cursor', 0.5, { opacity: 0 });
      };
      const backToActiveCallback = () => {
        TweenMax.to(this.webGL.meshes.torus.mesh.rotation, 1, {
          y: 0
        });
        TweenMax.to(this.webGL.meshes.torus.mesh.scale, 1, {
          x: 2,
          y: 2,
          z: 2
        });
        TweenMax.to('.cursor', 0.5, { opacity: 1 });
      };
      const idle = new Idle(2, idleCallback, backToActiveCallback);
      idle.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.webgl-handler {
  .webGL-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>

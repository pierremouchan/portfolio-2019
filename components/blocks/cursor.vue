<template>
  <div class="webGL-cursor">
    <div class="webGL-cursor-container"></div>
    <div class="cursor"></div>
  </div>
</template>

<script>
import { watchViewport } from 'tornis';
import { TweenMax, Back, Expo } from 'gsap';
import * as THREE from 'three';
import Idle from '~/assets/js/idle.class';

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
          aspect: undefined
        },
        meshes: {
          torus: {
            geometry: undefined,
            material: undefined,
            mesh: undefined
          }
        }
      }
    };
  },
  watch: {
    $route(to, from) {
      this.getAllLinks();
    }
  },
  mounted() {
    this.setupWebGL();
    this.generalShapeWebGL();
    this.runWebGL();
    this.updateTorusVelocityWebGL();
    this.checkIdleCursor();
    this.getAllLinks();
  },
  methods: {
    setupWebGL() {
      this.webGL.container = document.querySelector('.webGL-cursor-container');
      this.webGL.scene = new THREE.Scene();
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
    },
    updateTorusVelocityWebGL() {
      const updateMouseValues = ({ mouse, scroll }) => {
        let mouseVelocityX, mouseVelocityY;
        if (scroll.changed) {
          console.log(scroll.velocity);
        }
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
      function render() {
        renderer.render(scene, camera);
      }

      // function update() {}

      renderer.setAnimationLoop(function() {
        // update();
        render();
      });

      // On resize
      function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }

      window.addEventListener('resize', onWindowResize);
    },
    checkIdleCursor() {
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
    },
    getAllLinks() {
      const that = this;
      const listLinks = document.querySelectorAll('a');
      function cursorRetract() {
        TweenMax.to(that.webGL.meshes.torus.mesh.scale, 0.5, {
          x: 0.25,
          y: 0.25,
          z: 0.25,
          ease: Expo.easeOut
        });
        TweenMax.to('.cursor', 0.5, {
          width: '25px',
          height: '25px',
          opacity: 0.5,
          ease: Back.easeOut.config(2.5)
        });
      }

      function cursorExpand() {
        TweenMax.to(that.webGL.meshes.torus.mesh.scale, 0.5, {
          x: 2,
          y: 2,
          z: 2,
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
        el.addEventListener('mouseenter', cursorRetract);
        el.addEventListener('mouseleave', cursorExpand);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.webGL-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $beforefg;
  pointer-events: none;

  .webGL-cursor-container {
    width: 100vw;
    height: 100vh;
  }
  .cursor {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: $red;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    display: none;
    @include mq($from: desktop_plus) {
      display: block;
    }
  }
}
</style>

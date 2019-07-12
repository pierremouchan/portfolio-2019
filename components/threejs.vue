<template>
  <div class="webGL-container"></div>
</template>

<script>
import { Scene, PerspectiveCamera, DirectionalLight, Color, WebGLRenderer } from 'three';
import { TweenMax, Expo } from 'gsap';

// import { Interaction } from 'three.interaction';
import Blob from '~/assets/js/webGL/blob.class';

let mainBlob, activeBlob;
const projectsBlob = [];
let iteration = 0;

export default {
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
      if (to.name === 'index' || to.name === null) {
        setTimeout(() => {
          this.checkHoverSun();
        }, 500);

        for (const i in projectsBlob) {
          TweenMax.to(projectsBlob[i].mesh.position, 2, {
            y: 0,
            ease: Expo.easeOut
          });
        }
        TweenMax.to(mainBlob.mesh.position, 2, { z: -500, ease: Expo.easeOut });
      } else {
        for (const i in projectsBlob) {
          TweenMax.to(projectsBlob[i].mesh.position, 1, {
            y: -500,
            ease: Expo.easeIn
          });
        }

        TweenMax.to(mainBlob.mesh.position, 2, { z: 0, ease: Expo.easeOut });
      }

      TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });
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
            TweenMax.to(mainBlob.mesh.position, 1, { y: -50, z: 50 });
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
            if (this.$route.name === 'about' || document.querySelector('.container-404')) {
              mainBlob.mesh.position.z = 0;
              for (const i in projectsBlob) {
                projectsBlob[i].mesh.position.y = -500;
              }
            }
            break;
        }
      }
    );
    this.$store.watch(
      () => this.$store.state.currentProject.number,
      newProjectNumber => {
        if (this.oldProjectNumber === 0 && newProjectNumber === this.projects.length - 1) {
          for (let i = 0; i < projectsBlob.length; i++) {
            TweenMax.to(projectsBlob[i].mesh.position, 1, {
              x: '-=1500',
              ease: Expo.easeOut
            });
          }
        } else if (this.oldProjectNumber === this.projects.length - 1 && newProjectNumber === 0) {
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
      if (document.querySelector('#sun')) {
        let intervalResetBlob;
        document.querySelector('#sun').addEventListener('mouseenter', () => {
          intervalResetBlob = setInterval(() => {
            if (activeBlob.perlinNoise !== 0) {
              iteration = 0;
              TweenMax.to(activeBlob, 0.5, { perlinNoise: 0 });
            }
          }, 500);
          iteration = 0;
          TweenMax.to(activeBlob, 0.5, { perlinNoise: 0 });
        });
        document.querySelector('#sun').addEventListener('mouseleave', () => {
          clearInterval(intervalResetBlob);
          iteration = 0;
          TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });
        });
      }
    },
    setActiveBlob(number) {
      activeBlob = projectsBlob[number];
      TweenMax.to(activeBlob, 0.5, { perlinNoise: 0.006 });

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
      mainBlob = new Blob();
      scene.add(mainBlob.mesh);
      mainBlob.mesh.position.set(0, 0, -500);

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
            projectsBlob[i].mesh.rotation.z += 0.005;
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
        if (camera.aspect < 1.2) {
          mainBlob.mesh.scale.set(camera.aspect, camera.aspect, camera.aspect);
          for (let i = 0; i < projectsBlob.length; i++) {
            projectsBlob[i].mesh.scale.set(camera.aspect * 0.7, camera.aspect * 0.7, camera.aspect * 0.7);
          }
        } else {
          for (let i = 0; i < projectsBlob.length; i++) {
            projectsBlob[i].mesh.scale.set(0.8, 0.8, 0.8);
          }
        }

        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
      onWindowResize();

      window.addEventListener('resize', onWindowResize);

      // DOMEVENTS
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
.webGL-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $up - 1;
  width: 100vw;
  height: 100vh;

  pointer-events: none;
}
</style>

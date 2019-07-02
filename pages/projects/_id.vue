<template>
  <div class="project-container">
    <h1>{{ activeProject.id }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      projects: this.$store.state.projects.list
    };
  },
  computed: {
    activeProject() {
      return this.projects.find(project => project.id === this.id);
    }
  },
  created() {
    this.check404();
  },
  head() {
    return {
      title: `Pierre Mouchan | `,
      titleTemplate: `%s${this.activeProject.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Project - Pierre Mouchan, ${this.activeProject.title}. (${this.activeProject.mainTech})`
        }
      ]
    };
  },
  methods: {
    check404() {
      if (this.projects.find(project => project.id === this.id) === undefined) {
        return this.$nuxt.$router.push('/error');
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

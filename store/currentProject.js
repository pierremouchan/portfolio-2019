export const state = () => ({
  number: 0
});

export const mutations = {
  nextProject(state) {
    if (state.number < this.state.projects.list.length - 1) {
      state.number++;
    } else {
      state.number = 0;
    }
  },
  previousProject(state) {
    if (state.number <= 0) {
      state.number = this.state.projects.list.length - 1;
    } else {
      state.number--;
    }
  }
};

export const state = () => ({
  number: 0
});

export const mutations = {
  nextProject(state) {
    console.log('nextProject');
    if (state.number < this.state.projects.list.length - 1) {
      state.number++;
      console.log(state.number);
    } else {
      console.log('reset');
      state.number = 0;
    }
  },
  previousProject(state) {
    if (state.number <= 0) {
      state.number = this.state.projects.list.length - 1;
      console.log(state.number);
    } else {
      state.number--;
      console.log(state.number);
    }
  }
};

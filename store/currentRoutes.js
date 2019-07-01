export const state = () => ({
  linkTo: '',
  linkFrom: ''
});

export const mutations = {
  setLinkTo(state, to) {
    state.linkTo = to;
  },
  setLinkFrom(state, from) {
    state.linkFrom = from;
  }
};

export const getters = {
  getLinkTo: state => {
    return state.linkTo;
  },
  getLinkFrom: state => {
    return state.linkFrom;
  }
};

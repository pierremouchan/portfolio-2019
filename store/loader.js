export const state = () => ({
  imageArray: [],
  loadingProgress: 0,
  alreadyLoaded: false
});

export const mutations = {
  setImageArray(state, imageArray) {
    state.imageArray = imageArray;
  },
  setLoadingProgress(state, progress) {
    state.loadingProgress = progress;
  },
  setLoadingStatus(state, boolean) {
    state.alreadyLoaded = boolean;
  }
};

export const getters = {
  alreadyLoaded: state => {
    return state.alreadyLoaded;
  }
};

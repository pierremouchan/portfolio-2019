export const state = () => ({
  mainBlobContact: false
});

export const mutations = {
  isContactSectionVisible(state, status) {
    state.mainBlobContact = status;
  }
};

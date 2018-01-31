const state = {
  storeRestored: false
}

const mutations = {
  STORE_RESTORED (state) {
    state.storeRestored = true
  }
}

export default {
  state,
  mutations
}

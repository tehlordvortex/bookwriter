const state = {
  title: 'bookwriter',
  actions: []
}

const mutations = {
  CHANGE_TITLE (state, newTitle) {
    state.title = newTitle
  },
  RESTORE_TITLE (state) {
    state.title = 'bookwriter'
  },
  REPLACE_ACTIONS (state, actions) {
    state.actions = actions
  },
  RESTORE_ACTIONS (state) {
    state.actions = []
  }
}

export default {
  state,
  mutations
}

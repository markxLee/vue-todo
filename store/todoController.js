export const state = () => ({
  storageMode: '0',
})

export const getters = {
  getStorageMode(state) {
    return state.storageMode
  },
}

export const mutations = {
  setStorageMode(state, params) {
    state.storageMode = params.storageMode
  },
}

export const actions = {
  setStorageMode({ commit }, params) {
    commit('setStorageMode', params)
  },
}

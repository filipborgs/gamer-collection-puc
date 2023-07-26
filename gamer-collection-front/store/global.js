export const state = () => ({
  loading: false
})

export const getters = {
  isLoading(state) {
    return state.loading
  }
}

export const mutations = {
  setLoadingState(state) {
    state.loading = true
  },
  removeLoadingState(state) {
    state.loading = false
  }
}


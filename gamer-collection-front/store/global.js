export const state = () => ({
  loading: false,
  messages: []
})

export const getters = {
  isLoading(state) {
    return state.loading
  },

  messagesCount(state) {
    return state.messages.length
  }
}

export const mutations = {
  setLoadingState(state) {
    state.loading = true
  },

  removeLoadingState(state) {
    state.loading = false
  },

  nextMessage(state) {
    state.messages.shift()
  },

  queueMessage(state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  getMessage({ state, commit }) {
    const message = state.messages[0]
    commit('nextMessage')
    return message
  }
}


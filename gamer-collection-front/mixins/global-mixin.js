import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'global/isLoading'
    })
  },

  methods: {
    ...mapMutations({
      nextMessage: 'global/nextMessage',
      queueMessage: 'global/queueMessage',
      setLoadingState: 'global/setLoadingState',
      removeLoadingState: 'global/removeLoadingState'
    }),

    ...mapActions({
      getMessage: 'global/getMessage'
    }),
  }
}

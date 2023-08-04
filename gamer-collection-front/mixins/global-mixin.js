import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isWaiting: 'global/isWaiting'
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

<template>
  <SearchPage :service="gameService" />
</template>

<script>
import { makeApiSearchGames } from '../app/main/factories/domain/usecases/game'
import SearchPage from '../components/layout/search-page.vue'

export default {
  components: { SearchPage },
  data: () => ({
    gameService: makeApiSearchGames()
  }),

  computed: {},

  watch: {},

  async mounted() {},

  methods: {}
}
</script>

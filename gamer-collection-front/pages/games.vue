<template>
  <SearchPage :service="gameService" path="/game"/>
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

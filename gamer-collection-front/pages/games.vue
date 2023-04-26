<template>
  <SearchPage :service="gameService" path="/game">
    <template #add-button="{ id, platforms }">
      <AddGameCollectionItem x-small :item-id="id" :platforms="platforms" />
    </template>
  </SearchPage>
</template>

<script>
import { makeApiSearchGames } from '../app/main/factories/domain/usecases/game'
import SearchPage from '../components/layout/search-page.vue'
import AddGameCollectionItem from '../components/collection/add-game-collection-item.vue'

export default {
  components: { SearchPage, AddGameCollectionItem },
  data: () => ({
    gameService: makeApiSearchGames()
  }),

  computed: {},

  watch: {},

  async mounted() {},

  methods: {}
}
</script>

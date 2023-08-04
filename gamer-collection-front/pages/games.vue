<template>
  <layout-search-page :service="gameService" path="/game">
    <template #add-button="game">
      <collection-add-game-collection-item x-small :selected-game="game" />
    </template>
  </layout-search-page>
</template>

<script>
import { makeApiSearchGames } from '~/app/main/factories/domain/usecases/game'

export default {
  data: () => ({
    gameService: makeApiSearchGames()
  })
}
</script>

<template>
  <ItemPage :service="gameService" />
</template>

<script>
import { makeApiLoadGameById } from '../../app/main/factories/domain/usecases/game/api-load-game-by-idfactory'
import ItemPage from '../../components/layout/item-page.vue'

export default {
  components: {
    ItemPage
  },
  data: () => ({
    game: {
      id: null,
      name: null,
      platforms: [],
      cover: {},
      releaseDate: null
    },
    selected: [2],
    items: [
      {
        action: '12 hr',
        headline: '2002',
        subtitle: 'PS2',
        title: 'Devil may cry 3'
      }
    ],
    gameService: makeApiLoadGameById()
  })
}
</script>

<style></style>

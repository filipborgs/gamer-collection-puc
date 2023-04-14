<template>
  <ItemPage :service="consoleService" :cover="false" />
</template>

<script>
import { makeApiLoadConsoleById } from '../../app/main/factories/domain/usecases/console'
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
    consoleService: makeApiLoadConsoleById()
  })
}
</script>

<style></style>

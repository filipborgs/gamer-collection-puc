<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title class="global-bg-card-title headline pb-1 pt-3">
        Coleções <v-spacer></v-spacer>
        <v-divider class="mr-2 ml-1" vertical></v-divider>
        <v-btn v-if="!isLoggedUser" color="primary" small
          ><v-icon left>mdi-account-plus</v-icon> Seguir</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item :to="`/colecoes/${id}/consoles`">
            <v-list-item-icon>
              <v-icon>mdi-nintendo-game-boy</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Consoles</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!collections.length" disabled>
            <v-list-item-icon>
              <v-icon>mdi-gamepad-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Games</v-list-item-title>
          </v-list-item>

          <v-list-group v-else :value="true" prepend-icon="mdi-gamepad-outline">
            <template #activator>
              <v-list-item-title>Games</v-list-item-title>
            </template>

            <v-list-item
              v-for="(col, i) in collections"
              :key="i"
              :to="`/colecoes/${$route.params.userId}/game/${col.id}`"
              link
            >
              <v-list-item-title>{{ col.name }}</v-list-item-title>

              <v-list-item-icon>
                <v-icon>mdi-gamepad-circle-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>

        <v-alert color="#2A3B4D" dismissible type="info">
          Você pode adicionar jogos na sua colecão na aba GAMES e video games na aba CONSOLES
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { makeApiLoadCollectionByUserId } from '~/app/main/factories/domain/usecases/collection'
import { getCurrentUserAdapter } from '~/app/main/adapters'

export default {
  data: () => ({
    collections: [],
    collectionService: makeApiLoadCollectionByUserId(),
    user: {},
    id: null
  }),

  computed: {
    isLoggedUser() {
      return this.id === this.user.id
    }
  },

  async mounted() {
    this.setLoadingState()
    this.user = getCurrentUserAdapter()
    this.id = this.$route.params.userId
    try {
      this.collections = await this.collectionService.loadById(this.id)
    } catch (e) {
      this.queueMessage(e.message)
    } finally {
      this.removeLoadingState()
    }
  }
}
</script>

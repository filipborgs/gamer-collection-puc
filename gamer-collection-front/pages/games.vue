<template>
  <v-container>
    <v-row align="center" justify="center" dense>
      <v-col cols="5">
        <VTextField
          v-model="search"
          autofocus
          label="Pesquisar"
          autocomplete="off"
          hide-details
          outlined
          clearable
          @keyup.enter="searchGame"
        ></VTextField>
      </v-col>
      <v-col cols="1">
        <v-btn icon :loading="loading" @click="searchGame">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="row text-center">
      <div
        v-for="item in items"
        :key="item.id"
        class="col-md-3 col-sm-6 col-xs-12"
      >
        <v-card class="mx-auto" max-width="600">
          <v-img
            class="white--text align-end"
            :aspect-ratio="16 / 9"
            height="200px"
            :src="
              item.cover
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.code}.jpg`
                : ''
            "
          >
          </v-img>
          <v-card-text>
            <v-row dense>
              <v-col>
                <v-list-item to="/game">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }} </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn small icon>
                      <v-icon color="grey lighten-1">mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="text-center mt-12">
      <v-pagination
        v-model="page"
        :disabled="loading"
        :length="pages"
        :total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { makeApiSearchGames } from '../app/main/factories/domain/usecases/game'

export default {
  data: () => ({
    page: 1,
    total: 1,
    limit: 12,
    items: [],
    searchGames: null,
    search: null,
    loading: true
  }),

  computed: {
    pages() {
      return Math.floor(this.total / this.limit)
    }
  },

  watch: {
    page() {
      this.searchGame()
    }
  },

  async mounted() {
    this.searchGames = makeApiSearchGames()
    await this.searchGame()
  },

  methods: {
    async searchGame() {
      this.loading = true
      try {
        const { items, count } = await this.searchGames.search({
          search: this.search,
          limit: this.limit,
          page: this.page
        })
        this.items = items
        this.total = count
      } catch (e) {
        alert(e.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

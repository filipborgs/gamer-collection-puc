<template>
  <v-container>
    <v-row dense>
      <v-col cols="11">
        <VTextField
          v-model="search"
          autofocus
          prepend-inner-icon="mdi-magnify"
          label="Pesquisar"
          autocomplete="off"
          hide-details
          outlined
          clearable
          dense
        ></VTextField>
      </v-col>
      <v-col cols="1">
        <v-btn id="_table_refresh" icon>
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn id="_table_refresh" icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="row text-center">
      <div
        v-for="pro in items"
        :key="pro.id"
        class="col-md-3 col-sm-6 col-xs-12"
      >
        <v-card class="mx-auto" max-width="600">
          <v-img
            class="white--text align-end"
            :aspect-ratio="16 / 9"
            height="200px"
            :src="
              pro.cover
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${pro.cover.code}.jpg`
                : ''
            "
          >
          </v-img>
          <v-card-text>
            <v-row dense>
              <v-col>
                <v-list-item to="/game">
                  <v-list-item-content>
                    <v-list-item-title>{{ pro.name }} </v-list-item-title>
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
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    range: [0, 10000],
    select: 'Popularity',
    options: [
      'Default',
      'Popularity',
      'Relevance',
      'Price: Low to High',
      'Price: High to Low'
    ],
    page: 1,
    min: 0,
    max: 10000,
    items: []
  }),
  async mounted() {
    const { data } = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5050/api/games',
      headers: {}
    })
    this.items = data.items
  }
  // methods: {
  //   toGame() {
  //     $this.
  //   }
  // }
}
</script>

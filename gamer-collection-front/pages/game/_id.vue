<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet color="grey darken-4" rounded="lg" min-height="268">
          <v-card class="mx-auto" max-width="400">
            <AddCollectionItem :selected-game="item" />
            <v-img class="rounded-lg" :src="image" height="400px" dark>
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-title> {{ item.name }} </v-card-title>
            <v-card-subtitle> {{ releaseDate }} </v-card-subtitle>
            <v-card-subtitle> {{ platforms }} </v-card-subtitle>
            <br/>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet color="grey darken-4" min-height="70vh" rounded="lg">
          <v-card class="mx-auto">
            <v-card dark flat>
              <v-card-title class="pa-2 purple lighten-3">
                <h3 class="text-h6 font-weight-light text-center grow">
                  Minhas coleções
                </h3>
              </v-card-title>
            </v-card>
            <v-card-text class="py-0">
              <v-timeline align-top dense>
                <v-timeline-item color="pink" small>
                  <v-row class="pt-1">
                    <v-col cols="3">
                      <strong>PS2</strong>
                    </v-col>
                    <v-col>
                      <strong>Valor: R$: 22,30</strong>
                      <div class="text-caption">Comprado em: 11/11/2003</div>
                    </v-col>
                  </v-row>
                </v-timeline-item>

                <v-timeline-item color="pink" small>
                  <v-row class="pt-1">
                    <v-col cols="3">
                      <strong>GC</strong>
                    </v-col>
                    <v-col>
                      <strong>Valor: R$: 50,30</strong>
                      <div class="text-caption">Comprado em: 11/11/2003</div>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="3">
        <v-sheet color="grey darken-4" rounded="lg" min-height="268">
          <v-card-title>
            <p>Outras versões</p>
          </v-card-title>

          <v-card-text>
            <v-list two-line>
              <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
              >
                <template v-for="(ex, index) in items">
                  <v-list-item :key="ex.title">
                    <v-list-item-content>
                      <v-list-item-title>{{ ex.title }}</v-list-item-title>

                      <v-list-item-subtitle class="text--primary">{{
                        ex.headline
                      }}</v-list-item-subtitle>

                      <v-list-item-subtitle>{{
                        ex.subtitle
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index < ex.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { makeApiLoadGameById } from '../../app/main/factories/domain/usecases/game'
import AddCollectionItem from '../../components/collection/add-game-collection-item.vue'

export default {
  name: 'GamePage',
  components: { AddCollectionItem },
  data: () => ({
    item: {
      id: null,
      name: null,
      cover: {},
      releaseDate: null,
      platforms: []
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
  }),

  computed: {
    releaseDate() {
      const releaseDate = this.item.releaseDate
      return releaseDate ? new Date(releaseDate).getFullYear() : ''
    },

    image() {
      const code = this.item.cover.code
      return code
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${code}.jpg`
        : ''
    },

    platforms() {
      return this.item.platforms.map(i => i.name).slice().join(' | ')
    }
  },

  async mounted() {
    const id = this.$route.params.id
    const item = await this.gameService.loadById(id)
    this.item = item
  }
}
</script>

<style></style>

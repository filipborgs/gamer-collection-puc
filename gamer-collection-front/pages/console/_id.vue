<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card shaped :loading="!item.id" class="mx-auto" max-width="400">
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-subtitle> {{ releaseDate }} </v-card-subtitle>
          <collection-add-console-collection-item v-if="item.id" :selected-console="item" />
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet color="grey darken-4" min-height="70vh" rounded="lg">
          <v-card class="mx-auto">
            <v-card dark flat>
              <v-card-title class="pa-2 secondary">
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
          <layout-related-items />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { makeApiLoadConsoleById } from '~/app/main/factories/domain/usecases/console'

export default {
  name: 'ConsolePage',
  data: () => ({
    item: {
      id: null,
      name: null,
      cover: {},
      releaseDate: null
    },
    consoleService: makeApiLoadConsoleById(),
  }),

  computed: {
    releaseDate() {
      const releaseDate = this.item.releaseDate
      return releaseDate ? new Date(releaseDate).getFullYear() : ''
    }
  },

  async mounted() {
    const id = this.$route.params.id
    this.setLoadingState()
    try {
      this.item = await this.consoleService.loadById(id)
    } catch (e) {
      this.queueMessage(e.message)
    } finally {
      this.removeLoadingState()
    }
  }
}
</script>

<style></style>

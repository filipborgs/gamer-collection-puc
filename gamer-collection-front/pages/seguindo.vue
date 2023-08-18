<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet :color="$vuetify.theme.dark ? 'grey darken-4' : ''" rounded="lg">
          <v-card class="mx-auto" max-width="540">
            <v-card-title> Seguindo </v-card-title>
            <v-virtual-scroll :items="follows" height="300" item-height="64">
              <template #default="{ item, index }">
                <v-list-item :key="item.id" @click="setId(item.id)">
                  <v-list-item-action>
                    <v-btn fab small depressed color="primary">
                      {{ ++index }}
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="9">
        <v-alert v-if="!selected" color="secondary" type="info">
          Selecione um usário para ver suas coleções
        </v-alert>

        <transition name="slide-y-transition" mode="out-in">
        <v-sheet v-show="selected" :color="$vuetify.theme.dark ? 'grey darken-4' : ''" min-height="70vh" rounded="lg">
            <collection-collections-list :id="selected" />
          </v-sheet>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { makeApiLoadFollowsById } from '~/app/main/factories/domain/usecases/follows'
import {
  getCurrentUserAdapter
} from '~/app/main/adapters'

export default {
  data: () => ({
    loadFollows: makeApiLoadFollowsById(),
    selected: null,
    follows: [],
    user: getCurrentUserAdapter()
  }),

  async mounted() {
    this.setLoadingState()
    try {
      const rs = await this.loadFollows.loadById(this.user.id)
      this.follows = rs.map(({ followed }) => followed)
    } catch (e) {
      this.queueMessage(e.message)
    }finally {
        this.removeLoadingState()
      }
  },

  methods: {
    setId(id) {
      this.selected = id
    }
  }
}
</script>

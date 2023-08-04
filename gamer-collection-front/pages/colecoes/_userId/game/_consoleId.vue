<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet color="grey darken-4" rounded="lg">
          <v-card class="mx-auto" max-width="400">
            <v-card-title> Jogos {{ platformName }}</v-card-title>
            <v-card-subtitle>
              Total de jogos: {{ items.length }}
            </v-card-subtitle>
            <v-card-subtitle>
              Total gasto: {{ totalSpend | currency }}
            </v-card-subtitle>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="9">
        <v-sheet color="grey darken-4" min-height="70vh" rounded="lg">
          <v-card class="mx-auto">
            <v-card-text class="py-0">
              <v-data-table
                :headers="headers"
                :items="items"
                :loading="isWaiting"
                item-key="id"
                show-expand
                class="elevation-1"
                :search="search"
                :custom-filter="filter"
              >
                <template #top>
                  <v-toolbar flat>
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
                  </v-toolbar>
                </template>

                <template #item.purchaseDate="{ item }">
                  {{ item.purchaseDate | formatDate }}
                </template>

                <template #item.purchasePrice="{ item }">
                  {{ item.purchasePrice | currency }}
                </template>

                <template #item.actions="{ item, index }">
                  <layout-table-actions
                    :item="item"
                    :index="index"
                    @delete="deleteItemConfirm"
                    @open="openGame"
                  >
                    <collection-edit-game-collection-item
                      :default-item="item"
                      :index="index"
                      @updated="editGame"
                    >
                    </collection-edit-game-collection-item>
                  </layout-table-actions>
                </template>

                <template #expanded-item="{ item }">
                  <td :colspan="headers.length">
                    <v-card-text>
                      <div class="font-weight-bold ml-8 mb-2">
                        {{ item.name }}
                      </div>

                      <v-timeline align-top dense>
                        <v-timeline-item small>
                          <div>
                            <div class="font-weight-normal">
                              <strong>Estado da compra</strong>
                            </div>
                            <div>{{ parseState(item.purchaseState) }}</div>
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </td>
                </template>

                <template #no-data> Não há jogos na sua coleção, mas você pode adicionar na aba GAMES </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  makeApiLoadGamesCollectionItems,
  makeApiRemoveGameCollectionItemById
} from '~/app/main/factories/domain/usecases/collection'

export default {
  data: () => ({
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Data', value: 'purchaseDate' },
      { text: 'Valor', value: 'purchasePrice' },
      { text: 'Ações', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' }
    ],
    items: [],
    collectionService: makeApiLoadGamesCollectionItems(),
    removeService: makeApiRemoveGameCollectionItemById(),
    search: null
  }),

  computed: {
    totalSpend() {
      const callback = (acc, { purchasePrice }) => {
        return purchasePrice ? Number(acc) + Number(purchasePrice) : acc
      }
      return this.items.reduce(callback, 0)
    },

    platformName() {
      const [game] = this.items
      return game?.platform.name
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  async created() {
    try {
      this.setLoadingState()
      const { userId, consoleId } = this.$route.params
      this.items = await this.collectionService.loadById(userId, consoleId)
    } catch (e) {
      this.queueMessage(e.message)
    } finally {
      this.removeLoadingState()
    }
  },

  methods: {
    editGame({ index, updated }) {
      const consoleItem = this.items[index]
      consoleItem.purchasePrice = updated.purchasePrice
      consoleItem.purchaseState = updated.purchaseState
      consoleItem.purchaseDate = updated.purchaseDate
    },

    openGame({ item }) {
      this.$router.push({
        path: `/game/${item.itemId}`
      })
    },

    filter(_, search, item) {
      return new RegExp(search, 'gi').test(item.name)
    },

    parseState(state) {
      if (state === 'USED') return 'Usado'
      else if (state === 'NEW') return 'Novo'
      else return '-'
    },

    async deleteItemConfirm({ index, item: { id } }) {
      try {
        const message = await this.removeService.removeById(id)
        this.items.splice(index, 1)
        this.queueMessage(message)
      } catch (e) {
        this.queueMessage(e.message)
      } finally {
        this.removeLoadingState()
      }
    }
  }
}
</script>

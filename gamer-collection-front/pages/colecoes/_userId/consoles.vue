<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet color="grey darken-4" rounded="lg">
          <v-card class="mx-auto" max-width="400">
            <v-card-title> Consoles </v-card-title>
            <v-card-subtitle>
              Total de consoles: {{ items.length }}
            </v-card-subtitle>
            <v-card-subtitle>
              Total gasto: R$ {{ totalSpend }}
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
                item-key="name"
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
                    <v-dialog max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Editar item</span>
                        </v-card-title>
                        <v-card-text> </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Adicionar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template #item.purchaseDate="{ item }">
                  {{ formatDate(item.purchaseDate) }}
                </template>

                <template #expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    More info about {{ item.name }}
                  </td>
                </template>

                <template #item.actions="{ item, index }">
                  <table-actions
                    :item="item"
                    :index="index"
                    @delete="deleteItemConfirm"
                    @edit="editItem"
                  >
                  </table-actions>
                </template>

                <template #no-data> Não há consoles na sua coleção </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { makeApiLoadConsoleCollectionItems } from '../../../app/main/factories/domain/usecases/collection'
import TableActions from '../../../components/layout/table-actions.vue'

export default {
  components: {
    TableActions
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Data', value: 'purchaseDate' },
      { text: 'Valor', value: 'purchasePrice' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' }
    ],
    items: [],
    collectionService: makeApiLoadConsoleCollectionItems(),
    search: null
  }),

  computed: {
    totalSpend() {
      const cb = (acc, item) => {
        return acc + item.purchasePrice
      }
      return this.items.reduce(cb, 0)
    }
  },

  async created() {
    this.items = await this.collectionService.loadById(
      this.$route.params.userId
    )
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    formatDate(stringDate) {
      if (!stringDate) return ''
      const date = new Date(stringDate)
      return `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`
    },

    filter(_, search, item) {
      return new RegExp(search, 'gi').test(item.name)
    },

    deleteItemConfirm({ index }) {
      this.items.splice(index, 1)
    }
  }
}
</script>

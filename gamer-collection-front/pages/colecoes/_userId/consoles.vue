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
              Total gasto: {{ totalSpend | currency }}
            </v-card-subtitle>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="9">
        <v-sheet color="grey darken-4" min-height="70vh" rounded="lg">
          <v-card class="mx-auto">
            <v-card-text class="py-0">
              <v-data-table :headers="headers" :items="items" :loading="isLoading" item-key="id" show-expand
                class="elevation-1" :search="search" :custom-filter="filter">
                <template #top>
                  <v-toolbar flat>
                    <VTextField v-model="search" autofocus prepend-inner-icon="mdi-magnify" label="Pesquisar"
                      autocomplete="off" hide-details outlined clearable dense></VTextField>
                  </v-toolbar>
                </template>

                <template #item.purchaseDate="{ item }">
                  {{ item.purchaseDate | formatDate }}
                </template>

                <template #item.purchasePrice="{ item }">
                  {{ item.purchasePrice | currency }}
                </template>

                <template #expanded-item="{ item }">
                  <td :colspan="headers.length">Mais sobre {{ item.name }}</td>
                </template>

                <template #item.actions="{ item, index }">
                  <layout-table-actions :item="item" :index="index" @delete="deleteItemConfirm">
                    <collection-edit-console-collection-item :default-item="item" :index="index"
                      @updated="editItem"></collection-edit-console-collection-item>
                  </layout-table-actions>
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
import {
  makeApiLoadConsoleCollectionItems,
  makeApiRemoveConsoleCollectionItemById
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
    loadService: makeApiLoadConsoleCollectionItems(),
    removeService: makeApiRemoveConsoleCollectionItemById(),
    search: null
  }),

  computed: {
    totalSpend() {
      const callback = (acc, { purchasePrice }) => {
        return purchasePrice ? Number(acc) + Number(purchasePrice) : acc
      }
      return this.items.reduce(callback, 0)
    }
  },

  async created() {
    try {
      this.setLoadingState()
      const { userId } = this.$route.params
      this.items = await this.loadService.loadById(userId)
    } catch (e) {
      this.queueMessage(e.message)
    } finally {
      this.removeLoadingState()
    }

  },

  methods: {
    editItem({ index, updated }) {
      const consoleItem = this.items[index]
      consoleItem.purchasePrice = updated.purchasePrice
      consoleItem.purchaseState = updated.purchaseState
      consoleItem.purchaseDate = updated.purchaseDate
    },

    filter(_, search, item) {
      return new RegExp(search, 'gi').test(item.name)
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

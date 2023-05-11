<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet color="grey darken-4" rounded="lg">
          <v-card class="mx-auto" max-width="400">
            <v-card-title> Consoles </v-card-title>
            <v-card-subtitle> Total de consoles: 34 </v-card-subtitle>
            <v-card-subtitle> Total gasto: R$ 22859.90 </v-card-subtitle>
            <v-card-subtitle> Total de consoles vendidos: 6 </v-card-subtitle>
            <v-card-subtitle> Total vendido: R$ 8000 </v-card-subtitle>
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
              >
                <template #top>
                  <v-toolbar flat>
                    <VTextField
                      autofocus
                      prepend-inner-icon="mdi-magnify"
                      label="Pesquisar"
                      autocomplete="off"
                      hide-details
                      outlined
                      clearable
                      dense
                    ></VTextField>
                    <v-dialog v-model="dialog" max-width="500px">
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
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          item?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template #expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    More info about {{ item.name }}
                  </td>
                </template>
                <template #item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
                <template #no-data>
                  <v-btn color="primary"> Reset </v-btn>
                </template>
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

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    editedIndex: -1,
    editedItem: {
      name: '',
      data: 0,
      valor: 0,
      vendido: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      data: 0,
      valor: 0,
      vendido: 0,
      protein: 0
    },
    collectionService: makeApiLoadConsoleCollectionItems()
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  async created() {
    this.items = await this.collectionService.loadById(this.$route.params.userId)
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

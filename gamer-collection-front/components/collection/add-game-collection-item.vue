<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn
        absolute
        bottom
        color="pink"
        :x-small="xSmall"
        right
        fab
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Adicionar a coleção</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="item.platformId"
                label="Plataforma"
                :items="platforms"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="item.purchaseDate"
                label="Data da compra"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="item.purchasePrice"
                label="Valor pago"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-radio-group v-model="item.purchaseState">
                <template #label>
                  <div>Estado do item</div>
                </template>
                <v-radio value="NEW">
                  <template #label>
                    <div>
                      <strong class="success--text">Novo</strong>
                    </div>
                  </template>
                </v-radio>
                <v-radio value="USED">
                  <template #label>
                    <div>
                      <strong class="primary--text">Usado</strong>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-expansion-panels disabled>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Mais opções
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-col cols="12" sm="6" md="6">
                    <v-checkbox
                      v-model="checkbox"
                      :label="`Digital? ${checkbox ? 'Sim' : 'Não'}`"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea counter label="Observações"></v-textarea>
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          :disabled="loading"
          @click="resetState"
        >
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text :loading="loading" @click="add">
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { makeAddGameCollectionItem } from '../../app/main/factories/domain/usecases/collection'

export default {
  name: 'AddGameCollectionItem',
  props: {
    itemId: {
      type: Number,
      required: false,
      default: null
    },
    platforms: {
      type: Array,
      required: true,
      default: () => []
    },
    xSmall: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    checkbox: false,
    loading: false,
    item: {
      purchasePrice: null,
      purchaseState: null,
      purchaseDate: null,
      platformId: null
    },
    collectionService: makeAddGameCollectionItem()
  }),
  methods: {
    async add() {
      this.loading = true
      try {
        await this.collectionService.addItem({
          ...this.item,
          itemId: Number(this.$route.params.id || this.itemId)
        })
        alert('Item adicionado com sucesso')
      } catch (e) {
        alert(e.message)
      }
      this.resetState()
    },

    resetState() {
      Object.assign(this.item, this.$options.data().item)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>

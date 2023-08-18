<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn
        absolute
        bottom
        :x-small="xSmall"
        color="primary"
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
        <span class="text-h5">Adicionar jogo a coleção</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                {{ selectedGame?.name }}
              </v-col>
              <v-col cols="12"> </v-col>
              <v-col cols="12">
                <v-select
                  v-model="game.platformId"
                  label="Plataforma"
                  outlined
                  :items="selectedGame.platforms"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="game.purchaseDate"
                  outlined
                  :rules="[rules.maxDate, rules.minDate]"
                  label="Data da compra"
                  type="date"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <layout-decimal-text-field
                  v-model="game.purchasePrice"
                  outlined
                  :rules="[rules.minNumber]"
                  label="Valor pago"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-radio-group v-model="game.purchaseState">
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
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" plain @click="resetState">
          <v-icon class="pr-1">mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-btn color="info" plain :loading="loading" @click="add">
          <v-icon class="pr-1">mdi-content-save</v-icon>
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { makeAddGameCollectionItem } from '~/app/main/factories/domain/usecases/collection'
import {
  minDateValidate,
  maxDateValidate,
  minNumberValidate,
  requiredValidate
} from '~/app/infra/validation'

export default {
  name: 'AddGameCollectionItem',
  props: {
    selectedGame: {
      type: Object,
      required: true
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
    game: {
      purchasePrice: null,
      purchaseState: null,
      purchaseDate: null,
      platformId: null
    },
    rules: {
      minDate: minDateValidate(new Date('1972-01-01')),
      maxDate: maxDateValidate(),
      minNumber: minNumberValidate(0),
      required: requiredValidate
    },
    collectionService: makeAddGameCollectionItem()
  }),

  methods: {
    async add() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      this.setLoadingState()
      this.dialog = false
      try {
        await this.collectionService.addItem({
          ...this.game,
          itemId: Number(this.$route.params.id || this.selectedGame.id)
        })
        this.queueMessage('Jogo adicionado com sucesso')
        this.resetState()
      } catch (e) {
        this.queueMessage(e.message)
      } finally {
        this.loading = false
        this.removeLoadingState()
      }
    },

    resetState() {
      Object.assign(this.game, this.$options.data().game)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>

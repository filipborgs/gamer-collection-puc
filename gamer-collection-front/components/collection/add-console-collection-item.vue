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
          <v-form ref="form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                {{ selectedConsole?.name }}
              </v-col>
              <v-col cols="12"> </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="console.purchaseDate"
                  outlined
                  :rules="[rules.maxDate, rules.minDate]"
                  label="Data da compra"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="console.purchasePrice"
                  outlined
                  :rules="[rules.minNumber]"
                  label="Valor pago"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-radio-group v-model="console.purchaseState">
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
        <v-btn color="error" plain :disabled="loading" @click="resetState">
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
import { makeAddConsoleCollectionItem } from '~/app/main/factories/domain/usecases/collection'
import {
  minDateValidate,
  maxDateValidate,
  minNumberValidate
} from '~/app/infra/validation'

export default {
  name: 'AddConsoleCollectionItem',
  props: {
    selectedConsole: {
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
    console: {
      purchasePrice: null,
      purchaseState: null,
      purchaseDate: null
    },
    rules: {
      minDate: minDateValidate(new Date('2020-01-01')),
      maxDate: maxDateValidate(),
      minNumber: minNumberValidate(0)
    },
    collectionService: makeAddConsoleCollectionItem()
  }),

  methods: {
    async add() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      this.setLoadingState()
      this.dialog = false
      try {
        await this.collectionService.addItem({
          ...this.item,
          itemId: Number(this.$route.params.id || this.selectedConsole.id)
        })
        this.queueMessage('Console adicionado com sucesso')
        this.resetState()
      } catch (e) {
        this.queueMessage(e.message)
      } finally {
        this.removeLoadingState()
      }
    },

    resetState() {
      Object.assign(this.console, this.$options.data().console)
      this.dialog = false
      this.loading = false
    }
  }
}
</script>

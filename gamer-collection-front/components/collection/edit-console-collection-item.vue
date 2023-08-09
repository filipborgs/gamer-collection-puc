<template>
  <v-dialog v-model="getModal" persistent max-width="600px">
    <template #activator="{ on, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            color="edit"
            icon
            v-bind="{ ...attrs, ...attrsTooltip }"
            small
            v-on="{ ...on, ...onTooltip }"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Editar</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar o registro</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                {{ defaultItem?.name }}
              </v-col>
              <v-col cols="12"> </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="collectionItem.purchaseDate"
                  label="Data da compra"
                  type="date"
                  outlined
                  :rules="[rules.maxDate, rules.minDate]"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <layout-decimal-text-field
                  v-model="collectionItem.purchasePrice"
                  :rules="[rules.minNumber]"
                  label="Valor pago"
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-radio-group v-model="collectionItem.purchaseState">
                  <template #label>
                    <div>Estado do Item</div>
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
                        :label="`Digital? ${defaultItem ? 'Sim' : 'Não'}`"
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
        <v-btn color="error" plain @click="getModal = false">
          <v-icon class="pr-1">mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-btn color="info" plain @click="editConsole">
          <v-icon class="pr-1">mdi-content-save</v-icon>
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { makeUpdateConsoleCollectionItem } from '~/app/main/factories/domain/usecases/collection'
import {
  minDateValidate,
  maxDateValidate,
  minNumberValidate
} from '~/app/infra/validation'

export default {
  name: 'EditConsoleCollectionItem',
  props: {
    defaultItem: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    dialog: false,
    collectionItem: {
      purchasePrice: null,
      purchaseState: null,
      purchaseDate: null
    },
    rules: {
      minDate: minDateValidate(new Date('2020-01-01')),
      maxDate: maxDateValidate(),
      minNumber: minNumberValidate(0)
    },
    collectionService: makeUpdateConsoleCollectionItem()
  }),

  computed: {
    getModal: {
      get() {
        return this.dialog
      },
      set(value) {
        if (value) {
          this.collectionItem.purchasePrice = this.defaultItem.purchasePrice
          this.collectionItem.purchaseState = this.defaultItem.purchaseState
          this.collectionItem.purchaseDate =
            this.defaultItem.purchaseDate?.split('T')[0]
        }
        this.dialog = value
      }
    }
  },

  methods: {
    async editConsole() {
      if (!this.$refs.form.validate()) return
      try {
        this.getModal = false
        this.setLoadingState()
        await this.collectionService.updateItem({
          ...this.collectionItem,
          id: this.defaultItem.id
        })
        this.$emit('updated', {
          index: this.index,
          item: this.defaultItem,
          updated: this.collectionItem
        })
        this.queueMessage('Console editado com sucesso')
        this.resetState()
      } catch (e) {
        this.queueMessage(e.message)
      } finally {
        this.removeLoadingState()
      }
    },

    resetState() {
      Object.assign(this.collectionItem, this.$options.data().collectionItem)
    }
  }
}
</script>

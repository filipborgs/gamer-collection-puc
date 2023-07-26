<template>
  <v-dialog v-model="getModal" :max-width="modalSize">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <v-spacer></v-spacer>
      </v-card-text>

      <v-card-actions>
        <v-btn small @click="close">
          <v-icon class="pr-1">mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn dark small @click="confirm">
          <v-icon class="pr-1">mdi-{{ btnIcon }}</v-icon>
          {{ btnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ConfirmModal',
  props: {
    value: {
      required: true,
      type: Boolean
    },
    item: undefined,
    index: {
      type: Number,
      required: true
    },
    btnIcon: {
      type: String,
      default: () => 'check'
    },
    btnText: {
      type: String,
      default: () => 'Confirmar'
    },
    modalSize: {
      type: String,
      default: () => '300'
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    getModal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },

  methods: {
    ...mapMutations({
      setLoadingState: 'global/setLoadingState'
    }),

    confirm() {
      this.setLoadingState()
      this.$emit('confirm', {
        item: this.item,
        index: this.index
      })
      this.getModal = false
    },

    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style></style>

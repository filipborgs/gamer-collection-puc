<template>
  <div>
    <confirm-modal
      v-if="actions.includes('remove')"
      v-model="dialogDelete"
      :item="item"
      :index="index"
      title="Tem certeza que deseja deletar o item?"
      modal-size="500"
      @confirm="deleteItemConfirm"
    >
    </confirm-modal>

    <v-tooltip v-if="actions.includes('edit')" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          color="edit"
          icon
          v-bind="attrs"
          small
          v-on="on"
          @click="editItem()"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Editar</span>
    </v-tooltip>

    <v-tooltip v-if="actions.includes('remove')" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          color="remove"
          small
          v-on="on"
          @click="dialogDelete = true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Deletar</span>
    </v-tooltip>
  </div>
</template>

<script>
import ConfirmModal from './confirm-modal.vue'

export default {
  components: {
    ConfirmModal
  },

  props: {
    item: undefined,
    index: {
      type: Number,
      required: true
    },
    actions: {
      type: Array,
      default: () => ['remove', 'edit']
    }
  },

  data: () => ({
    dialogDelete: false
  }),

  methods: {
    editItem() {
      const data = {
        item: this.item,
        index: this.index
      }
      this.$emit('edit', data)
    },

    deleteItemConfirm(event) {
      this.$emit('delete', event)
    }
  }
}
</script>

<style></style>

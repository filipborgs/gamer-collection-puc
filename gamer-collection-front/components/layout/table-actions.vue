<template>
  <div>
    <layout-confirm-modal v-if="actions.includes('remove')" v-model="dialogDelete" :item="item" :index="index"
      title="Tem certeza que deseja deletar o item?" modal-size="500" @confirm="deleteItemConfirm">
    </layout-confirm-modal>

    <slot> </slot>

    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" small v-on="on" @click="openItem()">
          <v-icon>mdi-open-in-app</v-icon>
        </v-btn>
      </template>
      <span>Abrir</span>
    </v-tooltip>

    <v-tooltip v-if="actions.includes('remove')" bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" color="error" small v-on="on" @click="dialogDelete = true">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Deletar</span>
    </v-tooltip>
  </div>
</template>

<script>

export default {
  name: 'TableActions',
  props: {
    item: undefined,
    index: {
      type: Number,
      required: true
    },
    actions: {
      type: Array,
      default: () => ['remove']
    }
  },

  data: () => ({
    dialogDelete: false
  }),

  methods: {
    openItem() {
      const data = {
        item: this.item,
        index: this.index
      }
      this.$emit('open', data)
    },

    deleteItemConfirm(event) {
      this.$emit('delete', event)
    }
  }
}
</script>

<style></style>

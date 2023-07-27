<template>
  <div class="text-center">
    <v-snackbar right top app v-model="snackbar">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon class="pr-1">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AlertMessage',

  data: () => ({
    snackbar: false,
    text: null,
  }),

  computed: {
    ...mapGetters({
      messagesCount: 'global/messagesCount'
    }),
  },

  watch: {
    async messagesCount(count) {
      if (count && !this.snackbar) {
        await this.setText()
      }
    },

    snackbar(val) {
      if (this.messagesCount && !val) {
        setTimeout(async () => {
          await this.setText()
        }, 500);
      }
    }
  },

  methods: {
    async setText() {
      this.snackbar = true
      this.text = await this.getMessage()
    },

    ...mapMutations({
      nextMessage: 'global/nextMessage',
      queueMessage: 'global/queueMessage'
    }),

    ...mapActions({
      getMessage: 'global/getMessage'
    }),
  }
}
</script>

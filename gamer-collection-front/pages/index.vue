<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col cols="12" xs="12" sm="4" md="6" lg="4">
        <v-img contain :height="height" src="/logo-crop.jpg"></v-img>
      </v-col>
      <v-col xs="12" sm="8" md="6" lg="4">
        <p class="text-h4 text-center">
          <v-icon large>mdi-library-shelves</v-icon>
          Gamer Collection
        </p>
        <v-sheet min-height="40vh" rounded="lg">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab> Login </v-tab>
            <v-tab> Sign-up </v-tab>
            <v-tab v-show="tab === 2"> Recuperar Senha </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <login-tab />
            </v-tab-item>
            <v-tab-item>
              <login-singup-tab @login-tab="login" />
            </v-tab-item>

            <v-tab-item>
              <v-card color="basil" flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="email"
                      prepend-icon="mdi-email"
                      validate-on-blur
                      clearable
                      dense
                      outlined
                      label="Email"
                      type="email"
                      required
                    />

                    <v-row align="center" justify="space-around" class="mt-2">
                      <v-btn depressed color="blue-grey darken-3" dark
                        >Enviar email</v-btn
                      >
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getCurrentUserAdapter,
  getTokenTimerAdapter
} from '~/app/main/adapters'

export default {
  layout: 'login',
  data: () => ({
    tab: null,
    email: null,
    valid: false
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
      return 500
    }
  },

  beforeCreate() {
    this.$vuetify.theme.themes.dark.background = '#292933'
    const sessionTimer = getTokenTimerAdapter()
    if (sessionTimer && sessionTimer < 3.6e6) {
      const user = getCurrentUserAdapter()
      this.$router.replace({
        path: `/colecoes/${user.id}`
      })
    } else {
      localStorage.clear()
    }
  },

  methods: {
    login() {
      this.tab = 0
    }
  }
}
</script>

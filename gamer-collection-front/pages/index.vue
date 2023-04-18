<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col cols="12" xs="12" sm="4" md="6" lg="4">
        <v-img contain :height="height" src="/logo-crop.jpg"></v-img>
      </v-col>
      <v-col xs="12" sm="8" md="6" lg="4">
        <!-- <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">mdi-account</v-icon> MyWorkspace
        </div> -->
        <p class="text-h4 text-center">
          <v-icon large>mdi-library-shelves</v-icon>
          Library-API
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
              <LoginTab />
            </v-tab-item>

            <v-tab-item>
              <v-card color="basil" flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="nome"
                      prepend-icon="mdi-account"
                      validate-on-blur
                      clearable
                      dense
                      outlined
                      label="Nome"
                      type="text"
                      required
                    />
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
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      prepend-icon="mdi-lock"
                      dense
                      outlined
                      label="Senha"
                      required
                      @click:append="show1 = !show1"
                    />
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      prepend-icon="mdi-lock"
                      dense
                      outlined
                      label="Confirmar senha"
                      required
                      @click:append="show1 = !show1"
                    />
                    <v-row align="center" justify="space-around mt-2">
                      <v-btn
                        depressed
                        color="blue-grey darken-3"
                        dark
                        :loading="snackbar"
                        @click="() => setTimeout(() => (snackbar = true), 3000)"
                        >Criar Conta</v-btn
                      >
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
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

                    <v-row align="center" justify="space-around mt-2">
                      <v-btn
                        depressed
                        color="blue-grey darken-3"
                        dark
                        @click="snackbar = true"
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
import LoginTab from '../components/login/login-tab.vue'
import { getCurrentUserAdapter } from '../app/main/adapters'

export default {
  components: { LoginTab },
  layout: 'login',
  data: () => ({
    tab: null,
    email: null,
    nome: '',
    password: null,
    snackbar: false,
    show1: false,
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
    const user = getCurrentUserAdapter()
    if (user) {
      this.$router.replace({
        path: '/colecoes'
      })
    }
  },
  methods: {
    teste() {
      setTimeout(() => (this.snackbar = true), 3000)
    }
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 5px;
  border-radius: 9px;
  background-color: #f5f5f5;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: #f5f5f5;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: #555;
  background-color: #555;
}
</style>

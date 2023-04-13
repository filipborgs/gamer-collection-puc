<template>
  <v-card color="basil" flat>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="login.email"
          prepend-icon="mdi-email"
          validate-on-blur
          clearable
          dense
          outlined
          label="Email"
          type="email"
          :rules="[rules.requiredValidate, rules.emailValidate]"
          required
        />
        <v-text-field
          v-model="login.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          counter
          prepend-icon="mdi-lock"
          dense
          outlined
          label="Senha"
          :rules="[rules.requiredValidate, rules.minValidate]"
          required
          @click:append="showPassword = !showPassword"
        />
        <v-row align="center" justify="space-around mt-2">
          <v-btn
            depressed
            color="blue-grey darken-3"
            dark
            :loading="loading"
            @click="auth"
          >
            Log in
          </v-btn>
          <!-- <a class="subtitle-2" @click="tab = 2">Esqueci minha senha</a> -->
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { makeApiAuthentication } from '../../app/main/factories/domain/usecases/user/api-authentication-factory'
import {
  requiredValidate,
  emailValidate,
  minValidate
} from '../../app/infra/validation'

export default {
  name: 'LoginTab',
  data: () => ({
    authentication: null,
    login: {
      email: 'filipborgs48@gmail.com',
      password: 'password'
    },
    tab: null,
    loading: false,
    showPassword: false,
    rules: {
      requiredValidate,
      emailValidate,
      minValidate: minValidate(6)
    }
  }),
  mounted() {
    this.$vuetify.theme.themes.dark.background = '#292933'
    this.authentication = makeApiAuthentication()
  },
  methods: {
    async auth() {
      if (!this.$refs.form.validate()) return
      this.loading = true
      try {
        await this.authentication.auth(this.login)
        this.$router.push({
          path: '/colecoes'
        })
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

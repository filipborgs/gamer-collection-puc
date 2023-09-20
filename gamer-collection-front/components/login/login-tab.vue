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
          @keyup.enter="auth"
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
          @keyup.enter="auth"
          @click:append="showPassword = !showPassword"
        />
        <v-row align="center" justify="space-around" class="mt-2">
          <v-btn
            depressed
            color="blue-grey darken-3"
            dark
            :loading="isWaiting"
            @click="auth"
          >
            Entrar
          </v-btn>
          <!-- <a class="subtitle-2" @click="tab = 2">Esqueci minha senha</a> -->
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { makeApiAuthentication } from '~/app/main/factories/domain/usecases/user'
import {
  requiredValidate,
  emailValidate,
  minValidate
} from '~/app/infra/validation'
import { setCurrentUserAdapter } from '~/app/main/adapters'

export default {
  name: 'LoginTab',
  data: () => ({
    authentication: makeApiAuthentication(),
    login: {
      email: null,
      password: null
    },
    showPassword: false,
    rules: {
      requiredValidate,
      emailValidate,
      minValidate: minValidate(6)
    }
  }),

  methods: {
    async auth() {
      if (!this.$refs.form.validate()) return
      this.setLoadingState()
      try {
        const user = await this.authentication.auth(this.login)
        this.$router.push({
          path: `/colecoes/${user.id}`
        })
        setCurrentUserAdapter(user)
      } catch (e) {
        this.queueMessage(e.message)
      }finally {
        this.removeLoadingState()
      }
    }
  }
}
</script>

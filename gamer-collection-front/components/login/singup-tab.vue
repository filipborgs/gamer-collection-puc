<template>
  <v-card color="basil" flat>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="account.name"
          prepend-icon="mdi-account"
          validate-on-blur
          :rules="[rules.requiredValidate]"
          clearable
          dense
          outlined
          label="Nome"
          type="text"
          required
        />
        <v-text-field
          v-model="account.email"
          prepend-icon="mdi-email"
          validate-on-blur
          clearable
          :rules="[rules.requiredValidate, rules.emailValidate]"
          dense
          outlined
          label="Email"
          type="email"
          required
        />
        <v-text-field
          v-model="account.password"
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
        <v-text-field
          v-model="account.passwordConfirmation"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          counter
          prepend-icon="mdi-lock"
          dense
          :rules="[rules.requiredValidate, rules.minValidate, validatePasswordConfirmation]"
          outlined
          label="Confirmar senha"
          required
          @click:append="showPassword = !showPassword"
        />
        <v-row align="center" justify="space-around mt-2">
          <v-btn
            depressed
            color="blue-grey darken-3"
            dark
            :loading="isWaiting"
            @click="singup"
          >
            Criar conta
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  emailValidate,
  minValidate,
  requiredValidate
} from '~/app/infra/validation'
import { makeApiSingup } from '~/app/main/factories/domain/usecases/user'

export default {
  name: 'SingupTab',

  data: () => ({
    apiSingup: makeApiSingup(),
    account: {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    },
    showPassword: false,
    rules: {
      requiredValidate,
      emailValidate,
      minValidate: minValidate(6)
    }
  }),

  methods: {
    async singup() {
      if (!this.$refs.form.validate()) return
      this.setLoadingState()
      try {
        await this.apiSingup.singup(this.account)
        this.queueMessage('Conta criada com sucesso')
        this.$emit('login-tab')
        this.resetState()
      } catch (error) {
        this.queueMessage(error.message)
      } finally {
        this.removeLoadingState()
      }
    },

    validatePasswordConfirmation(confirm){
      return !confirm || confirm === this.account.password || 'As senhas devem ser iguais'
    },

    resetState() {
      Object.assign(this, this.$options.data())
    }
  }
}
</script>

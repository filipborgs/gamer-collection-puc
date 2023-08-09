<template>
  <v-text-field
    :id="id"
    v-model="cmpValue"
    :label="label"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :outlined="outlined"
    :dense="dense"
    :hide-details="hideDetails"
    :error="error"
    :rules="rules"
    :clearable="clearable"
    :prefix="prefix"
    :suffix="suffix"
    :reverse="reverse"
    @keypress="keyPress"
  />
</template>

<script>
export default {
  name: 'DecimalTextField',
  model: { prop: 'value', event: 'input' },
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    value: {
      // type: String,
      type: [String, Number],
      default: '0'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    },
    rules: {
      type: [Array, String],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: false
    },
    valueWhenIsEmpty: {
      type: String,
      default: '' // "0" or "" or null
    },
    prefix: {
      type: String,
      default: 'R$ '
    },
    suffix: {
      type: String,
      default: ''
    },
    length: {
      type: [String, Number],
      default: '8'
    },
    precision: {
      type: [String, Number],
      default: '2'
    },
    type: {
      type: String,
      default: 'decimal'
    },
    locale: {
      type: String,
      default: 'pt-BR'
    }
  },
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor Ã© atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set e Ã© emitido para o componente pai.
   the-vue-mask nao funciona corretamente ao incluir valores existentes no componente pai.
  */
  computed: {
    cmpValue: {
      get: function () {
        return this.value !== null && this.value !== ''
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty
      },
      set: function (newValue) {
        this.$emit('input', this.machineFormat(newValue))
      }
    }
  },
  methods: {
    humanFormat: function (number) {
      if (isNaN(number)) {
        number = ''
      } else {
        // number = Number(number).toLocaleString(this.locale, {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
        number = Number(number).toLocaleString(this.locale, {
          maximumFractionDigits: this.precision,
          minimumFractionDigits: this.precision
        })
      }
      return number
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number)
        // Ajustar quantidade de zeros Ãesquerda
        number = number.padStart(parseInt(this.precision) + 1, '0')
        // Incluir ponto na casa correta, conforme a precisÃ£o configurada
        number =
          number.substring(0, number.length - parseInt(this.precision)) +
          '.' +
          number.substring(
            number.length - parseInt(this.precision),
            number.length
          )
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty
        }
      } else {
        number = this.valueWhenIsEmpty
      }
      if (this.precision === 0) {
        number = this.cleanNumber(number)
      }
      return number
    },
    keyPress($event) {
      // console.log($event.keyCode); //keyCodes value
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault()
      }
      if (this.targetLength()) {
        $event.preventDefault()
      }
    },
    // Retira todos os caracteres nÃ£o numÃ©ricos e zeros Ãesquerda
    cleanNumber: function (value) {
      let result = ''
      if (value) {
        let flag = false
        const arrayValue = value.toString().split('')
        for (let i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros Ãesquerda
              if (arrayValue[i] !== '0') {
                result = result + arrayValue[i]
                flag = true
              }
            } else {
              result = result + arrayValue[i]
            }
          }
        }
      }
      return result
    },
    isInteger(value) {
      let result = false
      if (Number.isInteger(parseInt(value))) {
        result = true
      }
      return result
    },
    targetLength() {
      // return false
      if (Number(this.cleanNumber(this.value).length) >= Number(this.length)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

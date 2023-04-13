export const emailValidate = (value) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value) || 'Your Email should look like user@email.com'
}

export const requiredValidate = (value) => !!value || 'Campo Obrigatório'

export const minValidate =
  (qtd = 10) =>
  (value) =>
    value.length >= qtd || `O campo deve ter pelo menos ${qtd} caracteres`

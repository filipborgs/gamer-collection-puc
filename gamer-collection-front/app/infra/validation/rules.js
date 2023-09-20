export const emailValidate = (value) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value) || 'Your Email should look like user@email.com'
}

export const requiredValidate = (value) => !!value || 'Campo Obrigatório'

export const minValidate =
  (qtd = 10) => (value) =>
    value?.length >= qtd || `O campo deve ter pelo menos ${qtd} caracteres`

export const minDateValidate =
  (minDate) => value => (!value || new Date(value) >= minDate) || `A data deve ser maior que ${formatDate(minDate)}`

export const maxDateValidate =
  (maxDate = new Date()) => value => (!value || new Date(value) <= maxDate) || `A data deve ser menor que ${formatDate(maxDate)}`

export const minNumberValidate =
  (qtd = 10) => (value) => {
    if (typeof value === 'string') {
      value = value.replace('.', '').replace(',', '.')
    }
    return (!value || Number(value) >= qtd) || `O campo deve ser maior ou igual a ${qtd}`
  }

const formatDate = (value) => {
  if (!value) return;
  const date = new Date(value)
  return date.toLocaleString(['pt-BR'], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
}

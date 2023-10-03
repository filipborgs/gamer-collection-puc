import Vue from 'vue'

Vue.filter('formatDate', (value) => {
  if (!value) return;
  const fixDate = value.split('T')[0]
  const date = new Date(fixDate.replace('-', '/'))
  return date.toLocaleString(['pt-BR'], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
})

Vue.filter('currency', (value) => {
  const parseValue = parseFloat(value);
  if (Number.isNaN(parseValue)) return value;
  return (
    'R$ ' +
    parseValue
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  );
})


// export const dateFormat = function (date) {
//   if (!date || date === '') return;
//   const [year, mounth, day] = date.split('-');
//   return day
//     ? `${day}/${mounth}/${year}`
//     : `${mounth}/${year}`
// }

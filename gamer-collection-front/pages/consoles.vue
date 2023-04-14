<template>
  <SearchPage :service="consoleService" path="/console" :images="false" :limit="24"/>
</template>

<script>
import { makeApiSearchConsoles } from '../app/main/factories/domain/usecases/console'
import SearchPage from '../components/layout/search-page.vue'

export default {
  components: { SearchPage },
  data: () => ({
    consoleService: makeApiSearchConsoles()
  }),

  computed: {},

  watch: {},

  async mounted() {},

  methods: {}
}
</script>

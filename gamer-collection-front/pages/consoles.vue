<template>
  <SearchPage
    :service="consoleService"
    path="/console"
    :images="false"
    :limit="24"
  >
    <template #add-button="{ id }">
      <AddCollectionItem x-small :item-id="id" />
    </template>
  </SearchPage>
</template>

<script>
import { makeApiSearchConsoles } from '../app/main/factories/domain/usecases/console'
import SearchPage from '../components/layout/search-page.vue'
import AddCollectionItem from '../components/collection/add-console-collection-item.vue'

export default {
  components: { SearchPage, AddCollectionItem },
  data: () => ({
    consoleService: makeApiSearchConsoles()
  }),

  computed: {},

  watch: {},

  async mounted() {},

  methods: {}
}
</script>

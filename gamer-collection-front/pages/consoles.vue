<template>
  <layout-search-page
    :service="consoleService"
    path="/console"
    :images="false"
    :limit="20"
  >
    <template #add-button="console">
      <collection-add-console-collection-item x-small :selected-console="console" />
    </template>
  </layout-search-page>
</template>

<script>
import { makeApiSearchConsoles } from '~/app/main/factories/domain/usecases/console'

export default {
  data: () => ({
    consoleService: makeApiSearchConsoles()
  })
}
</script>

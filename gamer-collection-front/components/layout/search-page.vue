<template>
  <v-container>
    <v-row align="center" justify="center" dense>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          autofocus
          label="Pesquisar"
          autocomplete="off"
          append-icon="mdi-magnify"
          hide-details
          outlined
          clearable
          @keyup.enter="searchItem"
          @click:append="searchItem"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="row text-center">
      <div
        v-for="item in items"
        :key="item.id"
        class="col-md-3 col-sm-6 col-xs-12"
      >
        <v-card class="mx-auto" max-width="600">
          <v-img
            v-if="images"
            class="white--text align-end"
            :aspect-ratio="16 / 9"
            height="300px"
            style="cursor: pointer"
            :src="
              item.cover
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.code}.jpg`
                : ''
            "
            @click="redirectImg(item.id)"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-card-title v-show="!loading" style="cursor: auto" name="name-label" @click.stop=""
              >{{ item.name }}
            </v-card-title>
          </v-img>
          <slot v-if="!loading" name="add-button" v-bind="item" />

          <v-card-text v-if="!images">
            <v-row dense>
              <v-col>
                <v-list-item :to="loading ? null: `${path}/${item.id}`">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="text-center mt-12">
      <v-pagination
        v-model="page"
        :disabled="loading"
        :length="pages"
        :total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'SearchPage',
  props: {
    service: {
      required: true,
      type: Object
    },
    path: {
      required: true,
      type: String
    },
    images: {
      required: false,
      default: true,
      type: Boolean
    },
    limit: {
      required: false,
      default: 12,
      type: Number
    }
  },

  data: () => ({
    page: 1,
    total: 1,
    items: [],
    search: null,
    loading: true
  }),

  computed: {
    pages() {
      return Math.floor(this.total / this.limit)
    }
  },

  watch: {
    page() {
      this.loadItems()
    }
  },

  async mounted() {
    await this.loadItems()
  },

  methods: {
    setLoading() {
      window.scrollTo(0, 0)
      this.loading = true
      this.setLoadingState()
      this.items =  Array(this.limit).fill({
        name: ' '
      })
    },

    async searchItem() {
      this.page = 1
      await this.loadItems()
    },

    async loadItems() {
      this.setLoading()
      try {
        const { items, count } = await this.service.search({
          search: this.search,
          limit: this.limit,
          page: this.page
        })
        this.items = items
        this.total = count
      } catch (e) {
        this.queueMessage(e.message)
      } finally {
        this.removeLoadingState()
      this.loading = false
      }
    },

    redirectImg(id) {
      if (this.loading) return
      this.$router.push({
        path: `${this.path}/${id}`
      })
    }
  }
}
</script>
<style>
div[name='name-label'] {
  background-color: rgba(38, 50, 56, 0.6);
}
</style>

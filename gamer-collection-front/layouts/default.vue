<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-tabs centered class="ml-n9" color="primary">
        <v-tab v-for="item in links" :key="item.link" :to="item.link">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template #activator="{ on }">
          <v-btn :loading="isWaiting" icon x-large v-on="on">
            <v-avatar>
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="blue">
                <span class="white--text text-h5">{{ initials }}</span>
              </v-avatar>
              <h3 class="pt-5">{{ user.name }}</h3>
              <p class="text-caption mt-1">
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text to="/seguindo"> Seguindo </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="dark"> Dark mode </v-btn>
              <v-divider class="my-3"></v-divider>
              <!-- <v-btn depressed rounded text to="/edit-account">
                Editar conta
              </v-btn> -->
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="singout"> Sair </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <layout-alert-message />
        <v-row>
          <v-col cols="12">
            <v-sheet min-height="70vh" rounded="lg">
              <transition name="slide-y-transition" mode="out-in">
                <Nuxt />
              </transition>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import global from '~/mixins/global-mixin.js'
import {
  getCurrentUserAdapter,
  setCurrentUserAdapter
} from '~/app/main/adapters'

Vue.mixin(global)

export default {
  data: () => ({
    user: getCurrentUserAdapter(),
    links: []
  }),

  computed: {
    initials(){
      const name = this.user?.name.slice(0, 2).toUpperCase()
      return name
    }
  },

  mounted() {
    this.links = [
      {
        link: `/colecoes/${this.user.id}`,
        name: 'Minhas coleções'
      },
      {
        link: '/games',
        name: 'Games'
      },
      {
        link: '/consoles',
        name: 'Consoles'
      }
    ]
  },

  methods: {
    dark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    singout() {
      setCurrentUserAdapter()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 5px;
  border-radius: 9px;
  background-color: #f5f5f5;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: #f5f5f5;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: #555;
  background-color: #555;
}
</style>

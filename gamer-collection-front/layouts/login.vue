<template>
  <v-app :style="{ background: '#292933' }">
    <v-content>
      <layout-alert-message />
      <transition name="slide-y-transition" mode="out-in">
        <Nuxt />
      </transition>
    </v-content>
    <v-footer app="app">
      <v-flex class="text-xs-center"
        >© 2023. Luiz Filipe Borges. All rights reserved. 0.1.4</v-flex
      >
    </v-footer>
  </v-app>
</template>

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

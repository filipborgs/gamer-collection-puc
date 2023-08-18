<template>
  <v-list two-line>
    <v-subheader>Mais Jogos</v-subheader>
    <template v-for="(item, index) in games">
      <v-list-item :to="`/game/${item.id}`" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle class="text--primary">{{
            item.name
          }}</v-list-item-subtitle>

          <v-list-item-subtitle>{{
            item.releaseDate
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="index < item.length - 1" :key="index"></v-divider>
    </template>

    <v-divider></v-divider>
    <v-subheader>Mais Consoles</v-subheader>
    <template v-for="(item, index) in consoles">
      <v-list-item :to="`/console/${item.id}`" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle class="text--primary">{{
            item.name
          }}</v-list-item-subtitle>

          <v-list-item-subtitle>{{
            item.releaseDate
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="index < item.length - 1" :key="index"></v-divider>
    </template>
  </v-list>
</template>


<script>
export default {
  name: 'RelatedItems',
  data: () => ({
    games: [
      {
        releaseDate: '2002',
        name: 'Devil may cry 3',
        id: 20545
      },
      {
        releaseDate: '2020',
        name: 'Call of Duty: Black Ops Cold War',
        id: 137001
      },
      {
        releaseDate: '2022',
        name: 'FIFA 23',
        id: 240456
      }
    ],
    consoles: [
      {
        releaseDate: '2000',
        name: 'PlayStation 2',
        id: 8
      },
      {
        releaseDate: '2022',
        name: 'SteamVR',
        id: 163
      },
      {
        releaseDate: '2005',
        name: 'Xbox 360',
        id: 12
      },
    ]
  })
}
</script>
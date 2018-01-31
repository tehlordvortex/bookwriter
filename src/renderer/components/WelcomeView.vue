<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 md8 class="text-xs-center centered">
      <img id="logo" class="logo" src="~@/assets/logo.png" alt="electron-vue">
    </v-flex>
    <v-flex xs10 md6 class="mt-3 centered">
      <v-btn primary router to="/create/book">Write a book</v-btn>
      <v-btn router to="/templates" class="blue--text">Check out the Templates</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'welcome',
    created () {

    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>

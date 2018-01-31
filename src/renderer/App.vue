<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
        permanent
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="miniVariant = !miniVariant"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <component
          v-for="action, index in actions" :key="index"
          :is="buttonComponent"
          v-bind="action.props"
          @click="action.clickHandler"
        >
          <v-icon v-if="action.icon">{{ action.icon }}</v-icon>
        </component>
      </v-toolbar>
      <v-content>
        <template v-if="storeRestored">
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </template>
        <v-container v-else fluid fill-height>
          <div class="sk-rotating-plane blue darken-3"></div>
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app>
        <span>&copy; 2018. {{ $route.path }} | {{ $route.params }} </span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import VBtn from 'vuetify/es5/components/VBtn'
  export default {
    name: 'bookwriter',
    created () {
    },
    data: () => ({
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'dashboard', title: 'Welcome', to: '/' },
        { icon: 'book', title: 'Books', to: '/books' }
      ],
      miniVariant: true,
      buttonComponent: VBtn
    }),
    computed: {
      storeRestored () {
        return this.$store.state.Store.storeRestored
      },
      title () {
        return this.$store.state.App.title
      },
      actions () {
        return this.$store.state.App.actions
      },
      processedActions () {
        this.actions.forEach(action => {
          if (action.fab) {
          }
        })
        return []
      }
    }
  }
</script>

<style>
  @import url('../../node_modules/typeface-roboto/index.css');
  @import url('assets/iconfont/material-icons.css');
  /* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'); */
  /* Global CSS */
</style>

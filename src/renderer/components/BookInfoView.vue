<template>
  <v-container id="wrapper">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-container grid-list-xs>
            <v-layout row>
              <v-flex xs3>
                <v-card-media
                  :src="book.cover"
                  height="12em"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs8>
                <div class="headline" v-text="book.title"></div>
                <v-layout row>
                  <v-flex>
                    <v-icon>perm_identity</v-icon> {{ book.author }}
                  </v-flex>
                  <v-flex>
                    <v-icon>label</v-icon> <span v-text="book.genres.join(', ')"></span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs1>
                <v-layout row>
                  <v-flex>
                    <v-btn
                      flat
                      icon
                      :to ="'/book/' + book._id + '/edit'"
                    >
                      <v-icon>create</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-btn
                      flat
                      icon
                      @click="deleteBook(book._id)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>    
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-container grid-list-xs>
          <v-layout row>
            <v-flex xs12 sm7>
              <v-card>
                <v-card-title><div class="title">Chapters</div></v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-tile ripple v-for="chapter in book.chapters" v-if="chapter" :key="chapter.name">
                      <v-list-tile-content>
                        <v-list-tile-title v-text="chapter.name"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-btn icon router :to="'/book/'+book._id+'/chapter/edit/'+chapter._id"><v-icon>create</v-icon></v-btn>
                      <v-btn
                        flat
                        icon
                        @click="deleteChapter(book._id, chapter._id)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    flat
                    icon
                    class="blue--text"
                    :to="'/book/' + book._id + '/chapter/add'"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm5>
              <v-card>
                <v-card-title><div class="title">Details</div></v-card-title>
                <v-card-text>
                  <div class="subheading">Editors</div>
                  <template>
                    <span v-text="book.editors.join(', ') || 'None'"></span>
                  </template>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'book-info-view',
  props: ['bookId'],
  created () {
    this.$store.commit('CHANGE_TITLE', this.book.title)
  },
  data: function () {
    return {}
  },
  methods: {
    deleteBook (bookId) {
      this.$store.commit('DELETE_BOOK', bookId)
      this.$router.push({name: 'books'})
    },
    deleteChapter (bookId, chapterId) {
      this.$store.commit('DELETE_CHAPTER', {bookId, chapterId})
    }
  },
  computed: {
    book () {
      return this.$store.state.Books.books[this.bookId]
    }
  }
}
</script>

<style>

</style>
